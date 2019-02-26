import React, {Component} from 'react'
import {View, Text, Image, Button, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native'
import {Container, Header, Content, Form, Item, Input, Card} from 'native-base'
import {connect} from 'react-redux'
import {loginUser,changeLoginStatus} from '../src/publics/redux/actions/users'

class loginScreen extends Component {



    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    async componentDidMount() {
        await this._retrieveData()
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if (value !== null) {
            this.props.dispatch(changeLoginStatus(true))
            this.props.navigation.push('allNotes')
          }
        } catch (error) {
          // Error retrieving data
        }
      }

    async _handleLogin(data) {
        
        try {
            await this.props.dispatch(loginUser(data))
            await AsyncStorage.setItem('token',this.props.users.profile.access_token.token)
            this.props.navigation.push('allNotes')
        } catch(e) {
            if(e) {
            alert('Incorrect email and password')
            }
        }
            
    }

    async _checkToken() {
        const a = await AsyncStorage.getItem('token')
        await alert(JSON.stringify(a))
    }

    render() {

        if(this.props.users.isLoggedIn == true) {
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large' color='#3B53EA'/>
			    </View>
            )
        } else {
        return (    
        <Container>
            <Content>
                <Image style={{marginTop:30, marginBottom:10, width:250, height:100,resizeMode:'stretch', alignSelf:'center'}} source={{uri:'https://i.imgur.com/E8oGchW.gif'}}/>
                <Text style={{position:'absolute', color:'#3B53EA', marginTop:100, marginLeft:135}}>Your daily pocket note</Text>
                <Text style={{textAlign:'center', fontSize:15, color:'#3B53EA', fontWeight:'bold'}}>SIGN IN</Text>
                <Card style={{marginTop:20, marginLeft:20, marginRight:20, paddingBottom:20, borderRadius:10}}>
                    <Card style={{alignSelf:'center', width:250, paddingVertical:5, marginTop:30, borderWidth:1}}>
                        <TouchableOpacity onPress={()=>{this._checkToken()}} style={{color:'red'}}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={{marginLeft:20, marginRight:10, width:25, height:25, resizeMode:'stretch'}} source={{uri:'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png'}}/>
                                <Text>Sign in with Google</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>
                     <View style={{marginLeft:10, width:280, marginTop:30}}>
                        <Form>
                            <Item>
                                <Input onChangeText={(email)=>{this.setState({email})}} placeholder="Email" />
                            </Item>
                            <Item>
                                <Input onChangeText={(password)=>{this.setState({password})}} placeholder="Password" />
                            </Item>
                        </Form>
                    </View>
                    <View style={{alignSelf:'center', marginTop:30, width:200}}>
                        <TouchableOpacity>
                            <Button onPress={()=>{this._handleLogin(this.state)}} color='#3B53EA' title='Sign in'/>
                        </TouchableOpacity>
                        <Text style={{marginTop:20, textAlign:'center', fontSize:10}}>Forgot password? <Text style={{color:'#3B53EA'}}>Click to reset</Text></Text>
                    </View>
                </Card>
                <View style={{alignItems:'center', marginTop:20}}>
                    <Text>Don't have an account?</Text>
                    <Text onPress={()=>this.props.navigation.navigate('registerScreen')} style={{color:'#3B53EA', marginTop:10}}>Create account</Text>
                </View>
            </Content>      
        </Container>
        )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(loginScreen)