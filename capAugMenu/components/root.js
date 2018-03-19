import React, {Component} from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../navigation/reduxNavigation'
import { connect } from 'react-redux'
import PrimaryView from '../navigation/appNavigation'
// import StartupActions from '../Redux/'

class Root extends Component{
    render(){
        return(
            <View style = {style.applicationView}>
                <StatusBar barStyle = "light-content" />
                <ReduxNavigation />
            </View>
        )
    }
}

const style = StyleSheet.create({
    applicationView: {
        flex: 1}
})

const mapDispatch = (dispatch) =>{
    // startup: () => dispatch(StartupActions.startip())
}

export default connect(null, mapDispatch)(Root)