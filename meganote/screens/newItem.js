import React, { Component } from 'react'
import {Text, View, Modal, TextInput, TouchableOpacity} from 'react-native'
import {Header, Left, Right, Container, Icon} from 'native-base'
import {connect} from 'react-redux'
import {addNote} from '../src/publics/redux/actions/note'

import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

class newItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible:false,
            title:'',
            note:''
        }
    }

    componentDidMount() {
        this.setState({modalVisible:true}) 
    }

    setModalVisible(data) {
		this.setState({modalVisible: data})
    }

    handleCancel(data) {
        this.setModalVisible(data)
        this.props.navigation.goBack()
    }

    handleToReminder() {
        this.setState({modalVisible:false})
        this.props.navigation.push('newReminder')
    }

    async handleAdd() {

        const fillData = {
            title:this.state.title,
            note:this.state.note
        }
        try {
        await this.props.dispatch(addNote(fillData))
        this.props.navigation.goBack()
        } catch(e) {
            alert(e.message)
        }
    }
      
    render() {
        return (
            <Container>
                <View>
                    <Header>
                        <Left>
                            <TouchableOpacity onPress={()=>{this.handleCancel(false)}}>
                                <IconMaterialIcons name='arrow-back' size={30} color='white'/>
                            </TouchableOpacity>
                        </Left>
                        <Text style={{alignSelf:'center', fontWeight:'bold', color:'white'}}>CREATE NEW NOTE</Text>
                        <Right>
                            <TouchableOpacity onPress={()=>{this.handleAdd(this.state)}}>
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
                    onChangeText={(note)=>{this.setState({note})}}
                    scrollEnabled={true}
                    multiline={true}
                    maxLength={10000}
                    style={{fontSize:18}} 
                    placeholder='Type here'/>
                    <Modal
                    onRequestClose={()=>{this.handleCancel(false)}}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}>
                        <View style={{width:'100%', height:'100%',backgroundColor:'rgba(0.5,0.5,0.5,0.8)', justifyContent:'center', alignSelf:'center', alignContent:'center', alignItems:'center'}}>
                            <View style={{ backgroundColor:'white', width:'90%', height:200, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{marginHorizontal:50, color:'black', fontWeight:'bold'}}>What will you do?</Text>
                                <View style={{marginVertical:5}}/>
                                <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}} style={{flexDirection:'row'}}>
                                    <IconSimpleLineIcons color='#3B53EA' name='note' size={20}/>
                                    <Text style={{color:'#3B53EA', marginHorizontal:5}}>Create a note</Text>
                                </TouchableOpacity>
                                <View style={{marginVertical:5}}/>
                                <TouchableOpacity onPress={()=>{this.handleToReminder()}} style={{flexDirection:'row'}}>
                                    <IconSimpleLineIcons color='#3B53EA' name='clock' size={20}/>
                                    <Text style={{color:'#3B53EA', marginHorizontal:5}}>Create a reminder</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>            
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        note: state.note
    }
}

export default connect(mapStateToProps)(newItem)