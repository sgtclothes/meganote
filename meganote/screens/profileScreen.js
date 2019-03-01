import React, {Component} from 'react'
import axios from 'axios'
import {View,Text, Image, ScrollView, AsyncStorage, BackHandler, Modal, Picker, ImageBackground} from 'react-native'
import {Form, Item, Label, Input, Button} from 'native-base'
import {withNavigation} from 'react-navigation'

import {connect} from 'react-redux'
import {changeLoginStatus, getUser} from '../src/publics/redux/actions/users'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class profileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            place:'',
            email:'',
            telephone:'',
            twitter:'',
            facebook:''
        }
    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus',async ()=>{
        this.fetchData()
        await BackHandler.addEventListener('hardwareBackPressProfile',this.handleBackButtonProfile)
        })
    }

    handleBackButtonProfile = async () =>{
        await BackHandler.removeEventListener('hardwareBackPressProfile',this.handleBackButtonProfile)   
        await this.props.navigation.navigate('allNotes')
    }

    async fetchData() {
        const id = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')
        // alert(id+token)
        await this.props.dispatch(getUser(id,token))
        this.setState({
            username: this.props.users.profile.user.username,
            email: this.props.users.profile.user.email,
            telephone: this.props.users.profile.profile.phone,
            twitter: this.props.users.profile.profile.twitter,
            facebook: this.props.users.profile.profile.facebook
        })
    }

    async _handleLogout() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        this.props.dispatch(changeLoginStatus(false))
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('id')
        axios.defaults.headers.common['Authorization'] = ""
        this.props.navigation.navigate('loginScreen')
    }

    async _handleCheckToken() {
        const a = await AsyncStorage.getItem('token')
        const b = await AsyncStorage.getItem('id')
        alert(a+b)
    }

    async _handleEditProfile() {
        await BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
        this.props.navigation.push('editProfile')
    }

    render() {
        return (
            <ScrollView> 
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <ImageBackground style={{height:250, width:'100%'}} source={{uri:'https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-038.jpg'}}>
                        <View style={{marginTop:50}}>
                            <Image style={{height:100, width:100, alignSelf:'center', justifyContent:'center'}} source={{uri:'https://i.imgur.com/Dlm0hoN.gif'}}/>
                            <Text onPress={()=>{alert(JSON.stringify(this.props.users))}} style={{color:'white', alignSelf:'center'}}>
                                {this.state.username}
                            </Text>
                            <Text style={{color:'white', alignSelf:'center'}}>Place</Text>
                            <Text onPress={()=>{this._handleEditProfile()}} style={{color:'white', alignSelf:'center', borderBottomWidth:1, borderBottomColor:'white'}}>Sunting profil</Text>
                        </View>
                    </ImageBackground>
                    <View style={{flexDirection:'row'}}>
                        <View style={{backgroundColor:'#9047d8', width:'50%', height:70, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{marginTop:-10, color:'white', fontSize:30}}>100</Text>
                            <Text onPress={()=>{this._handleCheckToken()}} style={{marginTop:-10, color:'white'}}>Friends</Text>
                        </View>
                        <View style={{backgroundColor:'#7b1793', width:'50%', height:70, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <IconMaterialCommunityIcons style={{marginTop:-10, color:'yellow', justifyContent:'center', alignSelf:'center'}} name='star' size={40}/>
                                <Text onPress={()=>{alert(JSON.stringify(this.props.users))}} style={{marginTop:-10, color:'white', fontSize:30}}>5</Text>
                            </View>
                            <Text style={{marginTop:-10, color:'white'}}>Ratings</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft:20, marginTop:30, width:'80%'}}>
                    <Form>
                        <Text style={{color:'#3B53EA'}}>Email</Text>
                        <Item style={{marginBottom:10}}>
                            <Input disabled style={{fontSize:15}} value={this.state.email}/>
                        </Item>
                        <Text style={{color:'#3B53EA'}}>Phone</Text>
                        <Item style={{marginBottom:10}}>
                            <Input disabled style={{fontSize:15}} value={this.state.telephone}/>
                        </Item>
                        <Text style={{color:'#3B53EA'}}>Twitter</Text>
                        <Item style={{marginBottom:10}}>
                            <Input disabled style={{fontSize:15}} value={this.state.twitter}/>
                        </Item>
                        <Text style={{color:'#3B53EA'}}>Facebook</Text>
                        <Item style={{marginBottom:10}}>
                            <Input disabled style={{fontSize:15}} value={this.state.facebook}/>
                        </Item>
                    </Form>
                </View>
                <Button style={{backgroundColor:'red', alignSelf:'center', marginTop:50, marginBottom:50, width:200}} onPress={()=>{this._handleLogout()}}>
                    <Text style={{color:'white', marginLeft:70}}>Log out</Text>
                </Button>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(withNavigation(profileScreen))