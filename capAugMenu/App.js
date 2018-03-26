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
import secrets from "./secrets"


import HomeScreen from './components/HomeScreen'
import ARScreen from './components/ARScreen'
import OnBoarding from './components/OnBoarding'

import { StackNavigator } from 'react-navigation'

const AppNav = StackNavigator({
  HomeScreen : {screen : HomeScreen},
  ARScreen : { screen : ARScreen },
  OnBoarding : {screen : OnBoarding},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
})

export default class extends Component {
  render(){
    return(
      <AppNav/>
    )
  }
}
