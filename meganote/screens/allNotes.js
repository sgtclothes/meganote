import React, {Component} from 'react'
import {View, Text, AsyncStorage, BackHandler, Alert} from 'react-native'
import {Header, Left, Right, Card, Fab, Container, Button} from 'native-base'
import {connect} from 'react-redux'
import {changeLoginStatus} from '../src/publics/redux/actions/users'

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

class allNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active:'true'
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }


    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting meganote?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
              }
            ],
            {
              cancelable: false
            }
          );
          return true
        }

    async _handleLogout() {
        this.props.dispatch(changeLoginStatus(false))
        await AsyncStorage.removeItem('token')
        await this.props.navigation.navigate('loginScreen')
    }

    render() {
        return (
            <Container>
            <View>
                <Header style={{backgroundColor:'#3B53EA'}}>
                <Left style={{borderWidth:1}}>
                    <IconMaterialIcons color='white' name='menu' size={20} onPress={()=>{}}/>   
                </Left>
                <View style={{alignSelf:'center', borderWidth:1, marginHorizontal:100}}>
                    <Text style={{color:'white'}}>Test</Text>
                </View>
                <Right style={{borderWidth:1}}>
                    <IconMaterialIcons color='white' name='search' size={20} onPress={()=>{}}/> 
                </Right>
                </Header>
                <Text style={{fontSize:20, marginLeft:10}}>All Notes</Text>
                <Card>
                <Text>Test</Text>
                </Card>
                <Card>
                <Text>Notes</Text>
                </Card>
                <Button onPress={()=>{this._handleLogout()}}>
                    <Text>Log out</Text>
                </Button>
                </View>
                
                <View style={{flex:1}}>

                
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#3B53EA' }}
                    position="bottomRight"
                    onPress={()=>{this.props.navigation.push('newItem')}}>
                     <IconFontAwesome name="plus" />
                 </Fab>
                 </View>

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(allNotes)