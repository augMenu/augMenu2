import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import HomePage from './homepage'
import {StackNavigator} from 'react-navigation'


export default class extends Component{
    
    static navigationOptions={
        title:"welcome"
    }
    render(){
        console.warn("do we have this object here?",this.props)
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text style ={styles.welcomeText}>hello?</Text>
                <TouchableOpacity onPress={()=>{navigate('HomePage')}} style={styles.logoContainer}>
                <Image  style={styles.logoImage} source={require("../assets/GH_logo.jpg")}/>
                </TouchableOpacity>
            </View>
        )
    }
}
const PrimaryView = StackNavigator({
    HomePage: { screen: HomePage}
},
{
    headerMode: 'none',
    initialRouteName: 'HomePage'
})






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