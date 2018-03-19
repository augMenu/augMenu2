import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default class extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style ={styles.welcomeText}>This is the gome page</Text>
                <View style={styles.logoContainer}>
                <Image  style={styles.logoImage} source={require("../assets/GH_logo.jpg")}/>
                </View>
                <TouchableOpacity>
                <Text>Instructions</Text>
                <Text>Scan Menu</Text>
                </TouchableOpacity>
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
        flexGrow: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage:{
        height: 200,
        width: 200
    },
    welcomeText:{
        fontSize: 40,
        textAlign: 'center',
    }
})