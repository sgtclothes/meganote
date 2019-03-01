const initialState = {
    data: [],
    user:{},
    profile:{},
    isLoading: false,
    isLoggedIn: false,
    isError: false
  }
  
  export default users = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_PENDING':
        return {
            ...state,
            isLoading: true
        }
        
        case 'REGISTER_REJECTED':
        return {
            ...state,
            isLoading: false
        }

        case 'REGISTER_FULFILLED':
        return {
           ...state,
            isLoading: true,
            user: action.payload
        }

        case 'LOGIN_PENDING':
        return {
            ...state,
            isLoading: true
        }
        
        case 'LOGIN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError:true
        }

        case 'LOGIN_FULFILLED':
        return {
           ...state,
            isLoading: true,
            user: action.payload.data
        }

        case 'GET_USER_PENDING':
        return {
            ...state,
            isLoading: true
        }
        
        case 'GET_USER_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError:true
        }

        case 'GET_USER_FULFILLED':
        return {
           ...state,
            isLoading: true,
            profile: action.payload.data
        }

        case 'UPDATE_USER_PENDING':
        return {
            ...state,
            isLoading: true
        }
        
        case 'UPDATE_USER_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError:true
        }

        case 'UPDATE_USER_FULFILLED':
        return {
           ...state,
            isLoading: true,
            profile: action.payload.data
        }

        case 'LOGIN_STATUS':
        return {
           ...state,
            isLoggedIn:action.payload
        }
        default:
            return state
    }
  }