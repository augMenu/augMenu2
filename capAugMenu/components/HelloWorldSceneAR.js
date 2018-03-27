'use strict';

import React, { Component } from 'react';
import { RNS3 } from 'react-native-aws3';
import { StyleSheet, Image } from 'react-native';
import axios from 'axios'

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroSurface,
  ViroImage
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      showComponent: "0",
      imageURL: null
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getNewComponent = this._getNewComponent.bind(this);
  }

  // <Viro3DObject source={{uri:'http://172.16.27.67:1337/nike.obj'}}
  // resources={[{uri:'http://172.16.27.67:1337/materials.mtl'},
  // {uri:'http://172.16.27.67:1337/texture.jpg'}]}

  componentWillReceiveProps() {
    if (this.props.arSceneNavigator.viroAppProps.isButtonClicked) {
      this._onClicked();

      this.props.arSceneNavigator.viroAppProps._clickDone();
    }
  }

  // have an image tag hidden on the screen somewhere
  // then we could have the src uri point to our temp
  // could we grab that via a ref tag and then be able to stringify the actual image
  // then send it to google

  render() {
    return (
      <ViroARScene ref="arscene" onTrackingInitialized={this._onTrackInit}>
        <ViroAmbientLight color="#ffffff" />
        <ViroSpotLight
          innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
          position={[0, 3, 1]} color="#fffff" castsShadow={true} />

        {this._getNewComponent()}

      </ViroARScene>
    );
  }

  _getNewComponent() {

    if (this.state.showComponent == "1") {
      console.warn("you hit the showComponent thingy, searching this image url", this.state.imageURL)
      // return (<ViroBox position={(0, -1, -1)} scale={(.5, .5, .5)} />);
      return (
        <Viro3DObject type="VRX" position={[-3, -10, -2]} scale={[0.05, 0.05, 0.05]}
          //https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger_BaseColor.jpg
          //https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger.mtl
          // resources={[{ uri: 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger.mtl' },
          // { uri: 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger_BaseColor.jpg' }]}
          source={{ uri: this.state.imageURL }}
          shadowCastingBitMask={2} lightRecievingBitMask={3}
        />)
    } else {
      return (<ViroText onClick={() => this._onClicked()}
        text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />); // return nothing
    }
  }
  _onInitialized() {
    this.setState({
      text: "Hello World!"
    });
  }

  _onClicked = async () => {
    let result = await this.props.arSceneNavigator.takeScreenshot('newFile', true);


    // let image = require(`${result.url}`)
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: result.url,
      name: "image.png",
      type: "image/png"
    }

    const options = {
      keyPrefix: "screenshots/",
      bucket: "augmenu-foodmodels",
      region: "us-east-2",
      accessKey:process.env.AWS_ACCESS_KEY,
      secretKey:process.env.AWS_SEC_KEY,
      successActionStatus: 201
    }

    const image = await RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.warn('this is the response', response.body);

      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
      console.warn('imageLINK ?????????', response.body.postResponse.location)
      let reqObject = {
        "requests": [
          {
            "image": {
              "source": {
                "imageUri":
                  response.body.postResponse.location
              }
            },
            "features": [
              {
                "type": "TEXT_DETECTION",
                "maxResults": 1
              }
            ]
          }
        ]
      }

      axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.CLOUD_VISION}`, reqObject)
        .then(result => {
          const thing = result.data.responses[0].textAnnotations[0].description.replace(/\s/g, '')
          // axios.get(`/food:${result}`)
          console.warn('this is the thing!!!!!!', thing)
          axios.get(`http://192.168.0.23:1337/foods/food/${thing}`) //need local ip address here when running 
            .then(res => res.data)
            .then(food => {
              this.setState({ imageURL: food.image })
              this.setState({ showComponent: "1" })
            })
            .catch(err => console.warn(err))
        })
        .catch(err => console.warn(err));

    });
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  logoImage: {
    height: 200,
    width: 200
  }
});
module.exports = HelloWorldSceneAR;
