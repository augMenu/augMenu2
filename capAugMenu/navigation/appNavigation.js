import { StackNavigator } from 'react-navigation'


//import all the screens 
import Homepage from '../components/homepage'
import Splash from '../components/splash'

const PrimaryView = StackNavigator({
    splashScreen: {screen: Splash},
    homepage: { screen: Homepage}

},
{
    headerMode: 'none',
    initialRouteName: 'splashScreen'
})

export default PrimaryView