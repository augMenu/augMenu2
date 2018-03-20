import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import SplashScreen from './SplashScreen'


export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            timePassed: false,
        };
    }
    
    componentWillMount() {
        setTimeout( () => {
            this.setTimePassed();
        },3000);
    }
    setTimePassed() {
        this.setState({timePassed: true});
    }
    
    render() {
        const {navigate} = this.props.navigation 
        return (
            <View>
            { !this.state.timePassed ?  < SplashScreen/> :  navigate('HomeScreen')}
            </View>
        )}
}


