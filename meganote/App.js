/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react'
import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation'
import { Provider } from 'react-redux'
import store from './src/publics/redux/store'


import allNotes from './screens/allNotes'
import newItem from './screens/newItem'
import loginScreen from './screens/loginScreen'
import registerScreen from './screens/registerScreen'
import splashScreen from './screens/splashScreen'
import profileScreen from './screens/profileScreen'
import editItem from './screens/editItem'
// import Feeds from './screens/Feeds'
import editProfile from './screens/editProfile'
import newReminder from './screens/newReminder'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const BottomTabNavigator = createBottomTabNavigator({

  allNotes:{screen:allNotes, 
		navigationOptions : {
			tabBarLabel:"My notes",
			tabBarIcon: ({tintColor}) => (
				<IconSimpleLineIcons name="note" size={30} color='#3B53EA'/>
			)
		}
  },
  
  // Feeds:{screen:Feeds, 
	// 	navigationOptions : {
	// 		tabBarLabel:"Feeds",
	// 		tabBarIcon: ({tintColor}) => (
	// 			<IconFontAwesome name="feed" size={30} color='#3B53EA'/>
	// 		)
	// 	}
  // },
  
  profileScreen:{screen:profileScreen, 
		navigationOptions : {
			tabBarLabel:"Account",
			tabBarIcon: ({tintColor}) => (
				<IconMaterialCommunityIcons name="account" size={30} color='#3B53EA'/>
			)
		}
	}

})

const StackNavigation = createStackNavigator({

  loginScreen : {screen: loginScreen, navigationOptions: {header: null}}, //--> Segera dikembalikan
  registerScreen : {screen: registerScreen},
  Main : {screen: BottomTabNavigator, navigationOptions: {header: null}},
	newItem : {screen: newItem, navigationOptions: {header: null}},
	editItem : {screen: editItem, navigationOptions: {header: null}},
	editProfile : {screen: editProfile, navigationOptions: {header: null}},
	newReminder : {screen: newReminder, navigationOptions: {header: null}},
  initialRouteMain : 'Main'
})

const SwitchNavigation = createSwitchNavigator({

	splashScreen:{screen:splashScreen},
	Main:{screen:StackNavigation},
	initialRouteName: 'splashScreen'
})

const AppContainer = createAppContainer(SwitchNavigation)

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App