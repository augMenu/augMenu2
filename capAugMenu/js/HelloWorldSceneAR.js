'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <Viro3DObject 
        source={require('./res/emoji_smile/emoji_smile.vrx')} 
        position={[-.5, -.5, -.5]} scale={[.2, .2, .2]} type="VRX" />

    <Viro3DObject source={require('./res/emoji_smile/nike.obj')}
        resources={[require('./res/emoji_smile/materials.mtl'),
                   require('./res/emoji_smile/texture.jpg')]}
        position={[0.0, 0.0, -10]}
        scale={[0.05, 0.05, 0.05]}
        type="OBJ"
        onClick={() => {this._onClicked()}} />

      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text : "Hello World!"
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
