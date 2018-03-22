'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import axios from 'axios'

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroSurface
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      showComponent : false
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getNewComponent = this._getNewComponent.bind(this);
  }

  // <Viro3DObject source={{uri:'http://172.16.27.67:1337/nike.obj'}}
  // resources={[{uri:'http://172.16.27.67:1337/materials.mtl'},
  // {uri:'http://172.16.27.67:1337/texture.jpg'}]}

  componentWillReceiveProps(){
    if(this.props.arSceneNavigator.viroAppProps.isButtonClicked) {
        this._onClicked();

        this.props.arSceneNavigator.viroAppProps._clickDone();
    }
  }


  render() {
        return (
            <ViroARScene ref="arscene" onTrackingInitialized={this._onTrackInit}>
                <ViroAmbientLight color="#ffffff" intensity={200}/>
                {this._getNewComponent()}
            </ViroARScene>
          );
        }

 _getNewComponent() {
         
           if (this.state.showComponent) {
              return (<ViroBox  position={(0, -1, -1)} scale={(.5, .5, .5)} />);
            } else {
              return (<ViroText onClick={() => this._onClicked()}
                text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style=  {styles.helloWorldTextStyle} />); // return nothing
            }
}
  _onInitialized() {
    this.setState({
      text: "Hello World!"
    });
  }
  
  _onClicked = async () => {
    console.warn("before Capture")
    let result = await  this.props.arSceneNavigator.takeScreenshot('newFile', true);
    
    let reqObject = { 
      "requests":[
        {
          "image":{
            "source":{
              "imageUri":
                result.url
            }
          },
          "features":[
            {
              "type":"TEXT_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    }
    
    let axiosResult = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDwp32TG1jOgZcnQYpxRjOSjLG66XbmZSI',reqObject);

    console.warn(axiosResult.responses[0].textAnnotations[0].description)
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
});

module.exports = HelloWorldSceneAR;
