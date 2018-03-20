import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'


export default class extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.logoContainer}> 
                    <Image style = {styles.logoImage}
                    source={require('../assets/logoIcon.jpeg' )} />
                    <Text style={styles.logoText}> AugMenu </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor : 'white',
        flex:1,
    },
    logoContainer:{
        alignItems: 'center',
    },
    logoImage:{
        height: 200,
        width: 200,
        borderRadius:20,
    },

    logoText: {
        fontSize: 40,
        textAlign: 'center',
        color: '#6F1E51',
        margin: 40,
        fontWeight : 'bold',
        fontFamily : 'Arial Hebrew'
  
      }
})