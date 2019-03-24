import React, {Component} from 'react';
import { StatusBar , View , Text, Image} from 'react-native';
export default class splashScreen extends Component {

    componentDidMount() {

        setTimeout(()=> {
            this.props.navigation.navigate('loginScreen')
        },2000)
    }
    render() {
        return (
            <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor : 'white'}}>
                <StatusBar backgroundColor="white" barStyle="light-content"/>
                <Image style={{marginTop:30, marginBottom:10, width:250, height:100,resizeMode:'stretch', alignSelf:'center'}} source={{uri:'https://i.imgur.com/E8oGchW.gif'}}/>
            </View>
        )
    }
}