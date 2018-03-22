'use strict';

import React, { Component } from 'react';

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
      showComponent: false
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
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {this._getNewComponent()}

      </ViroARScene>
    );
  }

  _getNewComponent() {

    if (this.state.showComponent) {
      return (<ViroBox position={(0, -1, -1)} scale={(.5, .5, .5)} />);
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
    console.warn("before Capture")
    let result = await this.props.arSceneNavigator.takeScreenshot('newFile', true);

    console.warn(result.url)

    // let image = require(`${result.url}`)
    // console.warn("this is the image", JSON.stringify(image))


    let reqObject = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri":
                result.url
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

    // let axiosResult = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDwp32TG1jOgZcnQYpxRjOSjLG66XbmZSI', reqObject)
    // .then(result => {
    //   const result = result.responses[0]
    //   axios.get(`/food:${result}`)
    // })
    // .catch(err => console.warn(err));
    // let foodName = axiosResult.responses[0].textAnnotations[0].description //this might not work 
    // axios.get(`/food:${foodName}`)
    let imageurl = await axios.get('http://[PUT_IP_ADDRESS_HERE]:1337/foods/food/burger') //need local ip address here when running 
      .then(res => res.data)
      .then(food => {
        console.warn('food url ', food.image)
        return food.image
      })
      .catch(err => console.warn(err))
    // console.warn(JSON.stringify(axiosResult))
    // responses[0].textAnnotations[0].description
    //  axios.get('/food')
    // .then(res => res.data)
    // .then(food => {
    // food.image
    // })
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
  logoImage:{
    height: 200,
    width: 200
}
});

module.exports = HelloWorldSceneAR;
//<Image  style={styles.logoImage} source={{uri: '/private/var/mobile/Containers/Data/Application/9165C20B-C1C3-4EC5-93D0-58941817B01A/tmp/viro_media/newFile.png'}}/>