import React, {Component} from 'react'
import {View, Text, Image, Button, TouchableOpacity} from 'react-native'
import {Container, Header, Content, Form, Item, Input, Card, Label} from 'native-base'
import {connect} from 'react-redux'
import {registerUser} from '../src/publics/redux/actions/users'

class registerScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username:'',
            email:'',
            password:''
        }
    }

    //Actions from redux
    async _handleRegister(data) {
        this.props.dispatch(registerUser(data))
        return await alert('Register successful')
    }


    static navigationOptions = {
        title: 'Create Account',
        headerTintColor : '#3B53EA'
        }
    
    render() {
        return (    
        <Container>
            <Content>
                <Image style={{marginTop:12, marginBottom:10, width:250, height:100,resizeMode:'stretch', alignSelf:'center'}} source={{uri:'https://i.imgur.com/E8oGchW.gif'}}/>
                <Card style={{marginLeft:20, marginRight:20, paddingBottom:20, borderRadius:10}}>
                     <View style={{marginLeft:10, width:280}}>
                        <Form>
                            <Item floatingLabel>
                                <Label style={{fontSize:12}}>Username</Label>
                                <Input style={{fontSize:15}} onChangeText={(username)=>{this.setState({username})}}/>
                            </Item>
                            <Item floatingLabel>
                                <Label style={{fontSize:12}}>Email</Label>
                                <Input style={{fontSize:15}} onChangeText={(email)=>{this.setState({email})}}/>
                            </Item>
                            <Item floatingLabel>
                                <Label style={{fontSize:12}}>Password</Label>
                                <Input secureTextEntry={true} style={{fontSize:15}} onChangeText={(password)=>{this.setState({password})}}/>
                            </Item>
                        </Form>
                    </View>
                    <View style={{alignSelf:'center', marginTop:20, width:200}}>
                        <View style={{width:300, alignSelf:'center', marginLeft:30, paddingRight:20, marginBottom:20}}>
                            <Text style={{fontSize:10}}>By clicking Create Account, you are agreeing to our <Text style={{textDecorationLine:'underline'}}>Terms of Service</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text></Text>
                        </View>
                        <TouchableOpacity style={{width:270, alignSelf:'center'}}>
                            <Button onPress={()=>this._handleRegister(this.state)} color='#3B53EA' title=' Create Account'/>
                        </TouchableOpacity>
                    </View>
                </Card>
                <View style={{alignItems:'center', marginTop:10}}>
                    <Text>Already have an account? <Text onPress={()=>this.props.navigation.goBack()} style={{color:'#3B53EA'}}>Sign in</Text></Text>
                    <Text>----------------------------or----------------------------</Text>
                    <Card style={{alignSelf:'center', width:250, paddingVertical:5, marginTop:15, borderWidth:1}}>
                        <TouchableOpacity style={{color:'red'}}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={{marginLeft:20, marginRight:10, width:25, height:25, resizeMode:'stretch'}} source={{uri:'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png'}}/>
                                <Text>Sign in with Google</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>
                </View>
            </Content>      
        </Container>
        )
    }
}

const mapStateToProps = ({users}) => {
    return {
        users
    }
}

export default connect(mapStateToProps)(registerScreen)