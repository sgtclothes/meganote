import axios from 'axios'
import {url} from '../../../../components/Server'

export const registerUser = (data) => {

    return {
        type: 'REGISTER',
        payload: axios.post(url+'register',data)      
    }
}

export const loginUser = (data) => {

    return {
        type: 'LOGIN',
        payload: axios.post(url+'login',data)      
    }
}

export const changeLoginStatus = (data) => {

    return {
        type: 'LOGIN_STATUS',
        payload: data      
    }
}