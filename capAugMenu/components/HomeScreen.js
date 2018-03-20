import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'


export default class extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style ={styles.welcomeText}>Home Page</Text>
                <View style={styles.logoContainer}>
                     <Image  style={styles.logoImage} source={require("../assets/GH_logo.jpg")}/>
                </View>
                <TouchableOpacity  style={styles.buttonContainer}> 
                    <Text style={styles.buttonText}>
                        Instructions
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ARScreen')
                }}  style={styles.buttonContainer}> 
                    <Text style={styles.buttonText}>
                        Scan Menu
                    </Text>
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
        textAlign: 'center',
        color: 'black',
        fontSize:30,
        marginTop:5,
        fontWeight:'700',
        fontFamily:'Academy Engraved LET'
    },
    buttonText:{
        textAlign: 'center',
        color: 'black',
        fontSize:20,
        marginTop:5,
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
})