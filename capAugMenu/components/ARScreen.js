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
  Image,
  ActivityIndicator
} from 'react-native';



import {
  ViroSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';


// /*
//  TODO: Insert your API key below
//  */
var sharedProps = {
  apiKey: process.env.VIRO_API_KEY,
}

// Sets the default scene you want for AR 
var InitialARScene = require('./AugMenuScreen');

// Array of 3d models that we use in this sample. This app switches between this these models.

export default class ARScreen extends Component {
  constructor(props) {
    super(props);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._clickDone = this._clickDone.bind(this);

    this.state = {
      displayObject: false,
      isButtonClicked: false,
      _clickDone: this._clickDone,
      showComponent: false,

    }
  }

  // Replace this function with the contents  _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return this._getARNavigator();
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={localStyles.outer} >
        <ViroARSceneNavigator style={localStyles.arView} apiKey={process.env.VIRO_API_KEY}
          initialScene={{ scene: InitialARScene, passProps: { displayObject: this.state.displayObject } }} viroAppProps={this.state}
        />


        {(this.state.showComponent === false && this.state.isButtonClicked === true) &&   
          <View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems: 'center', justifyContent:'center'}}>
            <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff'/>
          </View>
        }

        <View style={{position: 'absolute',  left: 0, right: 0, bottom: 40, alignItems: 'center'}}>
          <TouchableHighlight  underlayColor={'#00000000'} style={localStyles.buttons}
            onPress={() => { this._onClicked() } 
          }
          >
          <Image style={localStyles.buttonImage} 
          source={require('../assets/cube.png')}
        />
          </TouchableHighlight>
          </View>
        </View>
    )
  }


  _onClicked() {
    this.setState({
      isButtonClicked: true,
      showComponent : false

    })
  }

  _clickDone() {
    this.setState({
      isButtonClicked: false,
      showComponent : true

    })
  }
}

var localStyles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor:'#00000000',

  },
  innerOuter : {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,225, 0.1)'
  },

  arView: {
    flex: 1,
    backgroundColor:'transparent'

  },

  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },

  buttonText: {
    textAlign: 'center',
    color:  '#f92f48',
    fontSize:25,
    marginTop:15,
    fontWeight:'700',
    fontFamily:'Academy Engraved LET'
  },
  buttonImage :{
    width : 70,
    height : 70,
  },

});

module.exports = ARScreen
