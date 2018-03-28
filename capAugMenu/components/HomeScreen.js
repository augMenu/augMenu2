import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'


export default class extends Component{
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }

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

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                    <View>
                        <Text>How to Augmenu</Text>

                        <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
                <View style={styles.buttonView}>
                <TouchableHighlight style={styles.buttonContainer} onPress={()=> {this.setModalVisible(true)}}>
                        <Text style={styles.buttonText} >TAP FOR INSTRUCTIONS</Text>
                </TouchableHighlight>
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
        marginTop : 30

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
        marginTop : 20,

    },
    buttonContainer:{
        backgroundColor: 'white',
        borderRadius:35,
        borderColor:'white',
        padding:15,
        margin : 10,
        alignItems : 'center'

    },

})