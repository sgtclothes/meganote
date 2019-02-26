/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react'
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
import { Provider } from 'react-redux'
import store from './src/publics/redux/store'


import allNotes from './screens/allNotes'
import newItem from './screens/newItem'
import loginScreen from './screens/loginScreen'
import registerScreen from './screens/registerScreen'
import splashScreen from './screens/splashScreen'



const StackNavigation = createStackNavigator({

  loginScreen : {screen: loginScreen, navigationOptions: {header: null}}, //--> Segera dikembalikan
  registerScreen : {screen: registerScreen},
  allNotes : {screen: allNotes, navigationOptions: {header: null}},
  newItem : {screen: newItem, navigationOptions: {header: null}},
  initialRouteMain : 'registerScreen'
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