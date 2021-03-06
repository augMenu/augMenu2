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
  ViroARPlane,
  ViroARPlaneSelector
} from 'react-viro';

const BASE_URL = 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels'


export default class HelloWorldSceneAR extends Component {


  constructor() {
    super();
    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      menuItem: '',
      rotation: [0,0,0],
      showIngredients : false
    };
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._getNewComponent = this._getNewComponent.bind(this);
    this._onRotate = this._onRotate.bind(this);
    this._showIngredients = this._showIngredients.bind(this);
    this._closeIngredients = this._closeIngredients.bind(this)
  }


  componentWillReceiveProps() {
    if (this.props.arSceneNavigator.viroAppProps.isButtonClicked) {
      this._onClicked();
      this._closeIngredients();
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
        <ViroAmbientLight color="#ffffff" intensity={800} />
        <ViroNode position={[0, 1, -4]}
        //position={[0, -1, -1]}
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

          {this.props.arSceneNavigator.viroAppProps.showComponent === true && this.state.showIngredients === true && this._displayIngredients()}
         
          {/*// <ViroSurface
          //   rotation={[-90, 0, 0]}
          //   position={[0, -.001, 0]}
          //   width={0.3} height={0.3}
          //   arShadowReceiver={true}
          // /> */}
        </ViroNode>
      </ViroARScene>
    );
  }

_displayIngredients(){
  return (
    <ViroImage
    height={1.5}
    width={1.5}
    position={[0, 3, -4]}
    onClick={this._closeIngredients}
    placeholderSource={require('../assets/chocolatemousse.jpg')}
    source={{
      uri: `${BASE_URL}/${this.state.menuItem}/${this.state.menuItem}.jpg`
    }}
      /> 
    )

}

  _getNewComponent() {
    // console.warn(`${BASE_URL}/${this.state.menuItem}/materials.mtl`)
    return (
      <Viro3DObject ref={component => this.foodObject = component} onError={()=>{
        Alert.alert(
          'Could not find a model for that item, please scan again')
        }}
        source={{
          uri: `${BASE_URL}/${this.state.menuItem}/${this.state.menuItem}.obj`
        }}
        resources={[{ uri: `${BASE_URL}/${this.state.menuItem}/materials.mtl` },
        { uri: `${BASE_URL}/${this.state.menuItem}/texture.jpg` }]}
        scale={[.02, .02, .02]}
        type="OBJ"
        position={[0, 1, -4]}
        onRotate={this._onRotate}
        onClick={this._showIngredients}
        />
      )
    }
    
 
  _onRotate(rotateState, rotationFactor, source){
    if (rotateState == 3) {
      this.setState({
        rotation : [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      })
      return;
    }
    this.foodObject.setNativeProps({rotation:[this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]});
  }

 _showIngredients(){
    this.setState({showIngredients : true})
}

_closeIngredients(){
  this.setState({showIngredients : false})
}
  _onInitialized() {
    this.setState({
      text: "Hello World!"
    });
  }

  _onClicked = async () => {
    let result = await this.props.arSceneNavigator.takeScreenshot('newFile', false);

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
