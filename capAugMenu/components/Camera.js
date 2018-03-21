'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroCamera,
  ViroVideo
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
    <ViroScene>
        <ViroText>
            Some Text 
        </ViroText>
    </ViroScene>
    );
  }

  _onInitialized() {
    this.setState({
      text: "Hello World!"
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
});

module.exports = HelloWorldSceneAR;
