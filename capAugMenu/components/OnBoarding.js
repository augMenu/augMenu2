import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
//import AppIntro from 'react-native-app-intro';

export default class extends Component{
    render() {
        return (
            <View>
            <Text> 
                Hello 
            </Text> 
            </View> )
          {/*<AppIntro>
            <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
              <View level={10}><Text style={styles.text}>Page 1</Text></View>
              <View level={15}><Text style={styles.text}>Page 1</Text></View>
              <View level={8}><Text style={styles.text}>Page 1</Text></View>
            </View>
            <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
              <View level={-10}><Text style={styles.text}>Page 2</Text></View>
              <View level={5}><Text style={styles.text}>Page 2</Text></View>
              <View level={20}><Text style={styles.text}>Page 2</Text></View>
            </View>
            <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
              <View level={8}><Text style={styles.text}>Page 3</Text></View>
              <View level={0}><Text style={styles.text}>Page 3</Text></View>
              <View level={-10}><Text style={styles.text}>Page 3</Text></View>
            </View>
            <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
              <View level={5}><Text style={styles.text}>Page 4</Text></View>
              <View level={10}><Text style={styles.text}>Page 4</Text></View>
              <View level={15}><Text style={styles.text}>Page 4</Text></View>
            </View>
          </AppIntro>
          */}
      }
    }

    const styles = StyleSheet.create({
        slide: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#9DD6EB',
          padding: 15,
        },
        text: {
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold',
        },
      });