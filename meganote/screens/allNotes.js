import React, {Component} from 'react'
import {View, Text, AsyncStorage, BackHandler, Alert, FlatList, TouchableOpacity, ScrollView, AppState} from 'react-native'
import {Header, Left, Right, Card, Fab, Container, Button} from 'native-base'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'

import {changeLoginStatus} from '../src/publics/redux/actions/users'
import {getNotes} from '../src/publics/redux/actions/notes'

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

class allNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active:'true',
            selectedNote:[],
            appState: AppState.currentState
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
        this.focusListener = this.props.navigation.addListener('didFocus',()=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton) 
        this._fetchData()
        })
      }

    async _fetchData() {
        await this.props.dispatch(getNotes())
    }

    async handleEditScreen(id, data) {
        await BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        this.props.navigation.navigate('editItem', {id, data})
        
    }
      
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        AppState.removeEventListener('change', this._handleAppStateChange)
      }

    async handleAddButton() {
        await BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        this.props.navigation.push('newItem')
        
    }

    _handleAppStateChange = (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState})
      }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exit meganote?',
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

    async _handleCheckToken() {
        const a = await AsyncStorage.getItem('token')
        const b = await AsyncStorage.getItem('id')
        alert(JSON.stringify(this.props.notes.data))
    }

    _regularExpression(item) {
        let s
        let date

        if(item != null) {
            s = item
            date = s.match(/^\d{4}-\d{2}-\d{2}/g)
        } else {
            date = ''
        }
            return date
    }

    render() {
        return (
            <Container>
                <ScrollView>
                <View>
                    <Header style={{backgroundColor:'#3B53EA'}}>
                        <Left>
                            <IconMaterialIcons color='white' name='menu' size={30} onPress={()=>{}}/>   
                        </Left>
                        <View style={{alignSelf:'center',marginHorizontal:100}}>
                            <Text style={{color:'white'}}>Meganote</Text>
                        </View>
                        <Right>
                            <IconMaterialIcons color='white' name='search' size={20} onPress={()=>{}}/> 
                        </Right>
                    </Header>
                    <Card style={{flexDirection:'row', marginTop:10}}>
                        <IconSimpleLineIcons style={{marginLeft:10}} name='note' size={30} color='#3B53EA' />
                        <Text onPress={()=>{alert(JSON.stringify(this.props.notes.data))}} style={{fontSize:20, marginLeft:5, fontWeight:'bold', color:'#3B53EA', alignSelf:'center'}}>All Notes</Text>
                    </Card>
                        <FlatList
							data={this.props.notes.data}
							refreshing={this.props.notes.isLoading}
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item,index)=>String(index)}
							renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity style={{borderBottomWidth:1}} onPress={()=>{this.handleEditScreen(item.id,item)}}>
                                        <Text numberOfLines={1} style={{marginLeft:10, fontSize:20, color:'#3B53EA'}}>{item.title}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text  numberOfLines={1} style={{marginLeft:10, fontSize:10, color:'#3B53EA', width:100}}>{item.note}</Text>
                                            <Text style={{fontSize:10, color:'#3B53EA', marginLeft:30}}>Date Created : {item.created_at}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            />
                    <Card style={{flexDirection:'row', marginTop:10}}>
                        <IconSimpleLineIcons style={{marginLeft:10}} name='clock' size={30} color='#3B53EA' />
                        <Text onPress={()=>{this._handleCheckToken()}} style={{fontSize:20, marginLeft:5, fontWeight:'bold', color:'#3B53EA', alignSelf:'center'}}>All Reminders</Text>
                    </Card>
                        <FlatList
                            data={this.props.notes.data}
                            refreshing={this.props.notes.isLoading}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item,index)=>String(index)}
                            renderItem={({item, index}) => {
                                if(item.reminder.schedule != null) { 
                                    return (
                                        <TouchableOpacity onPressIn={()=>{this._regularExpression(item.reminder.schedule)}} style={{borderBottomWidth:1}} onPress={()=>{this.handleEditScreen(item.id,item)}}>
                                            <Text numberOfLines={1} style={{marginLeft:10, fontSize:20, color:'#3B53EA'}}>{this._regularExpression(item.reminder.schedule)}</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text  numberOfLines={1} style={{marginLeft:10, fontWeight:'bold', fontSize:10, color:'#3B53EA', width:100}}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }}
                        />
                </View>
                </ScrollView>
                <View style={{flex:1}}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#3B53EA' }}
                        position="bottomRight"
                        onPress={()=>{this.handleAddButton()}}>
                        <IconFontAwesome name="plus" />
                    </Fab>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        notes: state.notes
    }
}

export default connect(mapStateToProps)(withNavigation(allNotes))