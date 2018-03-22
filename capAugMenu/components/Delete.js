'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  // <Viro3DObject source={{uri:'http://172.16.27.67:1337/nike.obj'}}
  // resources={[{uri:'http://172.16.27.67:1337/materials.mtl'},
  // {uri:'http://172.16.27.67:1337/texture.jpg'}]}

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} >
        <ViroText 
            text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style=  {styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#ffffff"} />
        
        <ViroSpotLight
            innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
            position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        
        <Viro3DObject 
          source={{ uri: 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger.obj' }}
          resources={[{ uri: 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger.mtl' },
              {uri:'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/hamburger/Hamburger_BaseColor.png'}]}
          position={[0.0, 0.0, -1]}
          scale={[0.05, 0.05, 0.05]}
          type="OBJ"
          onClick={() => { this._onClicked() }} />
      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text: "Hello World!"
    });
  }
  _onClicked = async () => {
    let result = await  this.props.arSceneNavigator.takeScreenshot('newFile', true);
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
