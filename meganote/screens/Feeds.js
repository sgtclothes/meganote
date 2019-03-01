import React, {Component} from 'react'
import {View,Text, BackHandler} from 'react-native'
import {withNavigation} from 'react-navigation'

class Feeds extends Component {

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus',async ()=>{
        await BackHandler.addEventListener('hardwareBackPressFeeds',this.handleBackButtonFeeds)
        })
      }

      handleBackButtonFeeds = async () =>{
       await BackHandler.removeEventListener('hardwareBackPressFeeds',this.handleBackButtonFeeds)   
       await this.props.navigation.navigate('allNotes')
        }
    

    render() {
        return (
            <View>
                <Text>
                    Feeds Page
                </Text>
            </View>
        )
    }
}

export default withNavigation(Feeds)