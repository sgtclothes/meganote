import React, { Component } from 'react'
import {Text, View, Modal, TextInput} from 'react-native'
import {Header, Left, Right, Container, Icon} from 'native-base'
import {connect} from 'react-redux'

import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

class newItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible:false
        }
    }

    componentDidMount() {
        this.setState({modalVisible:false}) //Modified to false
    }

    setModalVisible(data) {
		this.setState({modalVisible: data})
      }

    handleCancel(data) {
        this.setModalVisible(data)
        this.props.navigation.push('allNotes')
    }
      
    render() {
        return (
            <Container>

            <View>
                <Header style={{backgroundColor:'white'}}>
                    <Left>
                        <IconSimpleLineIcons name='check' size={30} color='#3B53EA'/>
                    </Left>
                    <Right>
                        
                    </Right>
                </Header>
                <TextInput style={{fontSize:18, marginTop:10, borderBottomWidth:1}} placeholder='TITLE'/>
                <TextInput 
                scrollEnabled={true}
                multiline={true}
                maxLength={10000}
                style={{fontSize:18}} 
                placeholder='...'/>
                <Modal
				animationType="fade"
				transparent={true}
				visible={this.state.modalVisible}>
                    <View style={{width:'100%', height:'100%',backgroundColor:'rgba(0.5,0.5,0.5,0.8)', justifyContent:'center', alignSelf:'center', alignContent:'center', alignItems:'center'}}>
                        <View style={{ backgroundColor:'white', width:'90%', height:200, alignItems:'center', justifyContent:'center'}}>
				            <Text style={{marginHorizontal:50, fontWeight:'bold'}}>What will you do?</Text>
                            <View style={{marginVertical:5}}/>
                            <View style={{flexDirection:'row'}}>
                                <IconSimpleLineIcons name='note' size={20}/>
                                <Text style={{marginHorizontal:5}}>Create a note</Text>
					        </View>
                            <View style={{marginVertical:5}}/>
                            <View style={{flexDirection:'row'}}>
                                <IconSimpleLineIcons name='clock' size={20}/>
                                <Text style={{marginHorizontal:5}}>Create a reminder</Text>
					        </View>
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