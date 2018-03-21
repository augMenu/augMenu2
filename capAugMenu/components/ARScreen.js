/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';


import {
  ViroSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

// /*
//  TODO: Insert your API key below
//  */
var sharedProps = {
  apiKey:"7E64B933-579F-492D-B242-1E02DD37588B",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./HelloWorldSceneAR');
var CameraScreen = require('./Camera')

export default class ARScreen extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps : sharedProps
    }
    this._getARNavigator = this._getARNavigator.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
      return this._getARNavigator();
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  
  }
}

module.exports = ARScreen
