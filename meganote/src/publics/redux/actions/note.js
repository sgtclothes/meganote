import axios from 'axios'
import {url} from '../../../../components/Server'

export const addNote = () => {
    return {
        type: 'ADD_NOTE',
        payload: axios.post(url+'addNote',data)      
    }
}