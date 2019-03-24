import React, {Component} from 'react'
import {View,Text, BackHandler, TouchableOpacity, AsyncStorage} from 'react-native'
import {Form, Item, Input, Header, Left, Right, Button} from 'native-base'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {changeLoginStatus, getUser, updateUser} from '../src/publics/redux/actions/users'

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

class editProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id:'',
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
        await BackHandler.addEventListener('hardwareBackPress',this.handleBackButton)
        })
    }

    async fetchData() {
        const id = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')
        // alert(JSON.stringify(id+token))
        await this.props.dispatch(getUser(id,token))
        await this.setState({
            id,
            token,
            username: this.props.users.profile.user.username,
            email: this.props.users.profile.user.email,
            telephone: this.props.users.profile.profile.phone,
            twitter: this.props.users.profile.profile.twitter,
            facebook: this.props.users.profile.profile.facebook
        })
        alert(JSON.stringify(this.state))
        
    }

    handleBackButton = async () =>{
       await BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton)   
       this.props.navigation.goBack()
    }

    handleCancel() {
        this.props.navigation.goBack()
    }

    async handleUpdate() {

        const data = {
            email: this.state.email,
            phone: this.state.telephone,
            twitter: this.state.twitter,
            facebook: this.state.facebook
        }

        try {
            await this.props.dispatch(updateUser(this.state.id, data, this.state.token))
            this.props.navigation.goBack()
        } catch(e) {
            alert(e.status)
        }
    }
    

    render() {
        return (
            <View>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={()=>{this.handleCancel()}}>
                            <IconMaterialIcons name='arrow-back' size={30} color='white'/>
                        </TouchableOpacity>
                    </Left>
                    <Text numberOfLines={1} style={{width:200, alignSelf:'center', fontWeight:'bold', color:'white'}}>Edit Profile</Text>
                    <Right>
                        <TouchableOpacity onPress={()=>{this.handleUpdate()}}>
                            <IconFontAwesome name='check' size={30} color='white'/>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{marginLeft:20, marginTop:30, width:'80%'}}>
                    <Form>
                        <Text style={{color:'#3B53EA'}}>Email</Text>
                        <Item style={{marginBottom:10}}>
                            <Input 
                            style={{fontSize:15}} 
                            defaultValue={this.state.email}
                            onChangeText={(email)=>{this.setState({email})}}
                            />
                        </Item>
                        <Text style={{color:'#3B53EA'}}>Phone</Text>
                        <Item style={{marginBottom:10}}>
                            <Input 
                            style={{fontSize:15}} 
                            defaultValue={this.state.telephone}
                            onChangeText={(telephone)=>{this.setState({telephone})}}
                            />
                        </Item>
                        <Text style={{color:'#3B53EA'}}>Twitter</Text>
                        <Item style={{marginBottom:10}}>
                            <Input 
                            style={{fontSize:15}} 
                            defaultValue={this.state.twitter}
                            onChangeText={(twitter)=>{this.setState({twitter})}}
                            />
                        </Item>
                        <Text style={{color:'#3B53EA'}}>Facebook</Text>
                        <Item style={{marginBottom:10}}>
                            <Input 
                            style={{fontSize:15}} 
                            defaultValue={this.state.facebook}
                            onChangeText={(facebook)=>{this.setState({facebook})}}
                            />
                        </Item>
                    </Form>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users        
    }
}

export default connect(mapStateToProps)(withNavigation(editProfile))