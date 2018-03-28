import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'


export default class extends Component{
    render() {
        return(
            <View style={instructionStyle.container}>  
            <Image source={require('../assets/Home.jpg')} 
            style={instructionStyle.backgroundStyle}
              />    

            <Text style ={instructionStyle.welcomeText}>How to AugMenu!</Text>

            <View style={instructionStyle.buttonView}>
            
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('HomeScreen')
            }}  style={instructionStyle.buttonContainer}> 
                <Text style={instructionStyle.buttonText}>
                    SCAN MENU
                </Text>
            </TouchableOpacity>
            </View>
        </View> 
        )
    }
}

const instructionStyle = Stylesheet.create({
    backgroundStyle: 
        {
            backgroundColor: '#ccc',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',

    },
    welcomeText:{
        textAlign: 'center',
        color: 'white',
        fontSize:45,
        marginTop:15,
        fontWeight:'700',
        fontFamily:'AvenirNext-Regular',
        backgroundColor: 'transparent',
        padding: 40,
    },
    buttonText:{
        textAlign: 'center',
        color:   '#f92f48',
        fontSize:20,
        fontWeight:'700',
        fontFamily:'AvenirNext-Regular'
    },
    buttonView : {
        flex: 1, 
        marginTop : 40,

    },
    buttonContainer:{
        backgroundColor: 'white',
        borderWidth:1,
        borderRadius:35,
        borderColor:'white',
        padding:15,
        margin : 40,
        alignItems : 'center'

    }
})