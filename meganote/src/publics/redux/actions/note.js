import axios from 'axios'
import {url} from '../../../../components/Server'

export const addNote = (data) => {
    return {
        type: 'ADD_NOTE',
        payload: axios.post(url+'addNote',data)      
    }
}

export const getNote = (id) => {
    return {
        type: 'GET_NOTE',
        payload: axios.get(url+'show/'+id)      
    }
}

export const deleteNote = (id) => {
    return {
        type: 'DELETE_NOTE',
        payload: axios.get(url+'delete/'+id)      
    }
}

export const updateNote = (id, data) => {
    return {
        type: 'UPDATE_NOTE',
        payload: axios.post(url+'update/'+id,data)      
    }
}

export const addReminder = (data) => {
    return {
        type: 'ADD_REMINDER',
        payload: axios.post(url+'addReminder',data)      
    }
}