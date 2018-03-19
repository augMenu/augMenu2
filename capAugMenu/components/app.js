import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Root from './root'



const store = createStore()

export default class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <Root />
            </Provider>
        )
    }
}

// export default 