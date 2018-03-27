'use strict';

import React, { Component } from 'react';
import { RNS3 } from 'react-native-aws3';
import { StyleSheet, Image, View, ActivityIndicator, Alert } from 'react-native';
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
  ViroImage,
  ViroNode,
  ViroARPlaneSelector
} from 'react-viro';

const BASE_URL = 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels'


export default class HelloWorldSceneAR extends Component {


  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      menuItem: 'nestCake'
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getNewComponent = this._getNewComponent.bind(this);
  }


  componentWillReceiveProps() {
    if (this.props.arSceneNavigator.viroAppProps.isButtonClicked) {
      this._onClicked();
    }
  }

  // have an image tag hidden on the screen somewhere
  // then we could have the src uri point to our temp
  // could we grab that via a ref tag and then be able to stringify the actual image
  // then send it to google
  // {this.state.showComponent === true ?   component : null }

  render() {
    return (
      <ViroARScene ref="arscene" onTrackingInitialized={this._onTrackInit}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroNode position={[0, -1, -1]}
          dragType="FixedDistance" onDrag={() => { }}>

          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 0]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={.7}
          />

          {this.props.arSceneNavigator.viroAppProps.showComponent === true && this._getNewComponent()}

          <ViroSurface
            rotation={[-90, 0, 0]}
            position={[0, -.001, 0]}
            width={0.3} height={0.3}
            arShadowReceiver={true}
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  _getNewComponent() {
    // console.warn(`${BASE_URL}/${this.state.menuItem}/materials.mtl`)
    return (
      <Viro3DObject onError={()=>{
        Alert.alert(
          'Choose an object')
      }}
        source={{
          uri: `${BASE_URL}/${this.state.menuItem}/${this.state.menuItem}.obj`
        }}
        resources={[{ uri: `${BASE_URL}/${this.state.menuItem}/materials.mtl` },
        { uri: `${BASE_URL}/${this.state.menuItem}/texture.jpg` }]}
        scale={[.02, .02, .02]}
        type="OBJ"
        position={[0, 1, -4]}
      />)
  }

  _onInitialized() {
    this.setState({
      text: "Hello World!"
    });
  }

  _onClicked = async () => {
    let result = await this.props.arSceneNavigator.takeScreenshot('newFile', true);

    const file = {
      uri: result.url,
      name: "image.png",
      type: "image/png"
    }

    const options = {
      keyPrefix: "screenshots/",
      bucket: "augmenu-foodmodels",
      region: "us-east-2",
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SEC_KEY,
      successActionStatus: 201
    }


    const image = await RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      let reqObject = {
        "requests": [{
          "image": {
            "source": {
              "imageUri":
                response.body.postResponse.location
            }
          },
          "features": [{
            "type": "TEXT_DETECTION",
            "maxResults": 1
          }]
        }]
      }

      axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.CLOUD_VISION}`, reqObject)
        .then(result => {
          const thing = result.data.responses[0].textAnnotations[0].description.replace(/\s/g, '')
          this.setState({menuItem : thing.toUpperCase()})
          // console.warn('this is the thing!!!!!!', thing.toUpperCase())
          this.props.arSceneNavigator.viroAppProps._clickDone()
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
