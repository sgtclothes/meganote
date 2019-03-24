import axios from 'axios'
import {url} from '../../../../components/Server'

export const getNotes = () => {
    return {
        type: 'GET_NOTES',
        payload: axios.get(url+'getNotes')      
    }
}