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

export const getUser = (id,token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return {
        type: 'GET_USER',
        payload: axios.get(url+'user/profile/'+id)      
    }
}

export const updateUser = (id,data,token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return {
        type: 'UPDATE_USER',
        payload: axios.post(url+'user/updateProfile/'+id,data)      
    }
}

export const changeLoginStatus = (data) => {

    return {
        type: 'LOGIN_STATUS',
        payload: data      
    }
}