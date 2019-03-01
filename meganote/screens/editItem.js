import React, { Component } from 'react'
import {Text, View, Modal, TextInput, BackHandler, TouchableOpacity, ActivityIndicator} from 'react-native'
import {Header, Left, Right, Container, Icon} from 'native-base'
import {connect} from 'react-redux'
import {getNote,deleteNote, updateNote} from '../src/publics/redux/actions/note'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

class editItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title:'',
            note:'',
            id:'',
            data:{},
            textEdit:false,
            isEdit:false,
            modalVisible:false
        }
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('id','no id')
        this._fetchData(id)
    }

    async _fetchData(id) {
        try {
            await this.props.dispatch(getNote(id))
            await this.setState({
                data: this.props.note.note.data,
                title: this.props.note.note.data.note.title,
                note: this.props.note.note.data.note.note,
                id
            })
        } catch(e) {
            alert(e.message)
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
      }

    handleBackButton() {
        this.props.navigation.goBack()
    }

    handleCancel() {
        this.props.navigation.goBack()
    }

    handleEdit() {
        this.setState({
            isEdit:!this.state.isEdit,
            textEdit:!this.state.textEdit
        })

    }

    async handleUpdate() {

        const data = {
            title: this.state.title,
            note: this.state.note
        }
        try {
            await this.props.dispatch(updateNote(this.state.id, data))
            this.props.navigation.goBack()
        } catch(e) {
            alert(e.status)
        }
    }

    setModalVisible(data) {
		this.setState({modalVisible: data})
    }

    async handleDelete(id) {
        this.setModalVisible(false)
        this.props.dispatch(deleteNote(id))
        await this.props.navigation.goBack()
    }

    handleCancel(data) {
        this.setModalVisible(data)
        this.props.navigation.goBack()
    }

    render() {
        let deleteAndEdit
        if(this.props.note.isLoading == true) {
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large' color='#3B53EA'/>
			    </View>
            )
        } else {
            
            if(this.state.isEdit == false) {
                deleteAndEdit = (
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{marginRight:10}} onPress={()=>{this.setModalVisible(true)}}>
                            <IconMaterialCommunityIcons name='clock' size={30} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight:10}} onPress={()=>{this.setModalVisible(true)}}>
                            <IconMaterialCommunityIcons name='trash-can' size={30} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.handleEdit()}}>
                            <IconMaterialIcons name='edit' size={30} color='white'/>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                deleteAndEdit = (
                    <View>
                        <TouchableOpacity onPress={()=>{this.handleUpdate()}}>
                            <IconFontAwesome name='check' size={30} color='white'/>
                        </TouchableOpacity>
                    </View>
                )
            }
            return (
                <Container>
                    <View>
                        <Header>
                            <Left>
                                <TouchableOpacity onPress={()=>{this.handleCancel(false)}}>
                                    <IconMaterialIcons name='arrow-back' size={30} color='white'/>
                                </TouchableOpacity>
                            </Left>
                            <Text numberOfLines={1} style={{width:200, alignSelf:'center', fontWeight:'bold', color:'white'}}>{this.state.data.title}</Text>
                            <Right>
                                {deleteAndEdit}
                            </Right>
                        </Header>
                        <TextInput 
                        editable={this.state.textEdit}
                        style={{color:'black', fontSize:18, marginTop:10, borderBottomWidth:1}} 
                        placeholder='Title'
                        defaultValue={this.state.title}
                        onChangeText={(title)=>{this.setState({title})}}
                        />
                        <TextInput 
                        editable={this.state.textEdit}
                        onChangeText={(note)=>{this.setState({note})}}
                        scrollEnabled={true}
                        multiline={true}
                        maxLength={10000}
                        style={{color:'black', fontSize:18}} 
                        placeholder='Type here'
                        defaultValue={this.state.note}    
                        />           
                    </View>
                    <View>
                        <Text onPress={()=>{alert(JSON.stringify(this.state.title))}}>
                            Click to check
                        </Text>
                    </View>
                    <Modal
                    onRequestClose={()=>{this.handleCancel(false)}}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}>
                        <View style={{width:'100%', height:'100%',backgroundColor:'rgba(0.5,0.5,0.5,0.8)', justifyContent:'center', alignSelf:'center', alignContent:'center', alignItems:'center'}}>
                            <View style={{backgroundColor:'white', width:'90%', height:200, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{color:'black', fontWeight:'bold', width:300, textAlign:'center'}}>Are you sure want to delete this item?</Text>
                                <View style={{flexDirection:'row', marginTop:20}}>
                                    <View style={{marginVertical:5}}/>
                                    <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}} style={{flexDirection:'row'}}>
                                        <Text style={{color:'#3B53EA', marginHorizontal:30, fontWeight:'bold'}}>Cancel</Text>
                                    </TouchableOpacity>
                                    <View style={{marginVertical:5}}/>
                                    <TouchableOpacity onPress={()=>{this.handleDelete(this.state.id)}} style={{flexDirection:'row'}}>
                                        <Text style={{color:'#3B53EA', marginHorizontal:30, fontWeight:'bold'}}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>   
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        note: state.note
    }
}

export default connect(mapStateToProps)(editItem)