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
  Image
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

// Array of 3d models that we use in this sample. This app switches between this these models.


export default class ARScreen extends Component {
  constructor(props) {
    super(props);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._clickDone = this._clickDone.bind(this);

    this.state = {
        displayObject:false, 
        isButtonClicked : false,
        _clickDone : this._clickDone,
    }

 
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
      return this._getARNavigator();
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    //console.warn(ViroARSceneNavigator)
    return (
      // <ViroARSceneNavigator {...this.state.sharedProps}
      //   initialScene={{scene: InitialARScene}} />

      <View style={localStyles.outer} >
      <ViroARSceneNavigator style={localStyles.arView} apiKey="7E64B933-579F-492D-B242-1E02DD37588B"
        initialScene={{scene:InitialARScene, passProps:{displayObject:this.state.displayObject}}}   viroAppProps={this.state}
      />
      
      <View style={{alignItems: 'center'}}>
        <TouchableHighlight style={localStyles.buttons}
          onPress={() => {this._onClicked()}}
          >
          <Text style={localStyles.buttonText}> Capture Menu </Text>
          </TouchableHighlight>
          </View>
      </View>
  )}

  _onClicked(){
    console.warn("on Click")
    this.setState({
       isButtonClicked : true
    })
  }

  _clickDone(){
    console.log("On DOne")
     this.setState({
        isButtonClicked : false
     })
  }
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },

  buttons : {
    height: 50,
    paddingBottom:20,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },

buttonText:{
    textAlign: 'center',
    color: 'black',
    fontSize:20,
    marginTop:20,
    fontWeight:'700',
    fontFamily:'Academy Engraved LET'
},

buttonContainer:{
    flexGrow: 1, 
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth:1,
    borderRadius:5,
    borderColor:'white',
    paddingVertical:8,
    alignItems : 'center'

},
});

module.exports = ARScreen
