import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import appNavigation from './appNavigation'


function reduxNavigation(props){
    const{ dispatch, nav} = props
    const navigation = ReactNavigation.addNavigationHelpers({
        dispatch, 
        state:nav
    })
    return <appNavigation navigation ={navigation} />
}




export default connect(mapState)(reduxNavigation)