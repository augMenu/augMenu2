import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, ScrollView } from 'react-native'


export default class extends Component {
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    render() {
        const resizeMode = 'center';

        return (

            <View style={styles.container}>
                <Image source={require('../assets/Home.jpg')}
                    style={styles.backgroundStyle}
                />
                <Text style={styles.welcomeText}>AugMenu</Text>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require("../assets/logo.jpg")} />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <ScrollView style={{ flex: 1, backgroundColor: '#FF3A4B' }}>
                        <View style={styles.listContainer}>
                            <Text style={styles.headerText}>How to augMenu:</Text>
                            <Text style={styles.instructionItems}>1. Scan a menu item: A good scan includes only key words from the title of the item on the menu.</Text>
                            <Text style={styles.instructionItems}>E.g. Try and scan the words "Chocolate Mousse", not "A puddingesque cake made with egg whites and melted chocolate"</Text>
                            <Text style={styles.instructionItems}>2. Wait.</Text>
                            <Text style={styles.instructionItems}>E.g. Relax. Don't quit the app or panic.</Text>
                            <Text style={styles.instructionItems}>3. Once the model of the food item appears, you have the option to tap it to explore its nutritional information.</Text>
                            <Text style={styles.instructionItems}>4. Use two fingers to rotate your virtual food item.</Text>
                            <Text style={styles.instructionItems}>5. Tap the 'X' to scan another item on the menu.</Text>
                            <Text style={styles.instructionItems}>6. Should you get an error directing you to scan again, go back to step 1.</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.backButton}>BACK</Text>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </Modal>
                
                <View style={styles.buttonView}>
                   
                <TouchableHighlight style={styles.buttonContainer} onPress={() => { this.setModalVisible(true) }}>
                <Text style={styles.buttonText} >INSTRUCTIONS</Text>
                    </TouchableHighlight>

                <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ARScreen')
                    }} style={styles.buttonContainer}>
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
    container: {
        flex: 1,
        backgroundColor: '#FF3A4B'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom:30,

    },
    logoImage: {
        height: 240,
        width: 240,
        borderRadius: 120,
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
    welcomeText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 45,
        marginTop: 15,
        fontWeight: '700',
        fontFamily: 'AvenirNext-Regular',
        backgroundColor: 'transparent',
        padding: 40,
    },
    buttonText: {
        textAlign: 'center',
        color: '#f92f48',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'AvenirNext-Regular'
    },

    headerText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',

    },

    buttonView: {
        flex: 1,
        marginTop: 20,
    },

    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 35,
        borderColor: 'white',
        padding: 15,
        marginRight: 15,
        marginLeft :15,
        marginTop:10,
        alignItems: 'center'
    },
    instructionItems: {
        color: 'white',
        fontSize: 16,
        backgroundColor: '#FF3A4B',
        padding: 10,
        textAlign: 'center',
    },
    backButton: {
        color: 'white',
        fontSize: 20,
        backgroundColor: '#FF3A4B',
        padding: 10,
        textAlign: 'center'
    },
    listContainer: {
        alignItems: 'center',
        backgroundColor: '#FF3A4B',
        padding: 10
    }

})