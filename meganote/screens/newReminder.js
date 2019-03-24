import React, {Component} from 'react'
import {View,Text, BackHandler, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {Header, Left, Right} from 'native-base'
import {CalendarList, Calendar, Agenda} from 'react-native-calendars'
import {addReminder} from '../src/publics/redux/actions/note'

import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'

import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

class Feeds extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title:'',
            note:'',
            currentDate:''
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus',async ()=>{
        
        await BackHandler.addEventListener('hardwareBackPressReminder',this.handleBackButtonReminder)
        })
    }

    handleBackButtonReminder = async () =>{
       await BackHandler.removeEventListener('hardwareBackPressReminder',this.handleBackButtonReminder)   
       await this.props.navigation.navigate('allNotes')
    }
    
    handleCancel() {
        this.props.navigation.navigate('allNotes')
    }

    async handleAddReminder() {
        
        const data = {
            title: this.state.title,
            note: this.state.note,
            schedule: this.state.currentDate
        }

        // alert(JSON.stringify(data))
        await this.props.dispatch(addReminder(data))
        await this.props.navigation.navigate('allNotes')
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Header>
                        <Left>
                            <TouchableOpacity onPress={()=>{this.handleCancel()}}>
                                <IconMaterialIcons name='arrow-back' size={30} color='white'/>
                            </TouchableOpacity>
                        </Left>
                        <Text style={{alignSelf:'center', fontWeight:'bold', color:'white'}}>CREATE NEW REMINDER</Text>
                        <Right>
                            <TouchableOpacity onPress={()=>{this.handleAddReminder()}}>
                                <IconFontAwesome name='check' size={30} color='white'/>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <TextInput 
                        style={{fontSize:18, marginTop:10, borderBottomWidth:1}} 
                        placeholder='Title'
                        onChangeText={(title)=>{this.setState({title})}}
                        />
                    <TextInput 
                        style={{fontSize:18, borderBottomWidth:1}} 
                        onChangeText={(note)=>{this.setState({note})}}
                        placeholder='Type here'
                        />
                    <Text style={{fontSize:18, color:'#3B53EA', fontWeight:'bold', textAlign:'center'}} >Set Date : {this.state.currentDate}</Text>
                     <View>
                        <Calendar
                        onDayPress={(day) => {this.setState({currentDate: day.dateString})}}
                        />
                     </View>
                     <Text onPress={()=>{alert(JSON.stringify(this.state.currentDate))}}>Check state</Text>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        note: state.note
    }
}

export default connect(mapStateToProps)(withNavigation(Feeds))