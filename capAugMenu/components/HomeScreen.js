import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'


export default class extends Component{

    render(){
        const resizeMode = 'center';

        return(

            <View style={styles.container}>
                <Image source={require('../assets/Home.jpg')}   

                style={styles.backgroundStyle}
                  />

                <Text style ={styles.welcomeText}>AugMenu</Text>
                <View style={styles.logoContainer}>
                     <Image  style={styles.logoImage} source={require("../assets/logo.jpg")}/>
                </View>

                <View style={styles.buttonView}>
                
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ARScreen')
                }}  style={styles.buttonContainer}> 
                    <Text style={styles.buttonText}>
                        SCAN MENU
                    </Text>
                </TouchableOpacity>
                </View>
            </View> 
      )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : 40

    },
    logoImage:{
        height: 240,
        width: 240,
        borderRadius:120,

    },
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
        fontWeight:'900',
        fontFamily:'Academy Engraved LET',
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
        marginTop : 60,

    },
    buttonContainer:{
        backgroundColor: 'white',
        borderWidth:1,
        borderRadius:35,
        borderColor:'white',
        padding:15,
        margin : 40,
        alignItems : 'center'

    },
})