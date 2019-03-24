const initialState = {
    data: [],
    noteFill:{},
    note:{},
    alert:'',
    reminder:'',
    isLoading: false,
    isLoggedIn: false,
    isError: false
  }
  
  export default note = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NOTE_PENDING' :
        return {
            ...state,
            isLoading:true
        }
        case 'ADD_NOTE_REJECTED' :
        return {
            ...state,
            isLoading:false
        }
        case 'ADD_NOTE_FULFILLED' :
        return {
            ...state,
            isLoading:false,
            noteFill: action.payload
        }
        case 'GET_NOTE_PENDING' :
        return {
            ...state,
            isLoading:true
        }
        case 'GET_NOTE_REJECTED' :
        return {
            ...state,
            isLoading:false
        }
        case 'GET_NOTE_FULFILLED' :
        return {
            ...state,
            isLoading:false,
            note: action.payload
        }
        case 'DELETE_NOTE_PENDING' :
        return {
            ...state,
            isLoading:true
        }
        case 'DELETE_NOTE_REJECTED' :
        return {
            ...state,
            isLoading:false
        }
        case 'DELETE_NOTE_FULFILLED' :
        return {
            ...state,
            isLoading:false,
            alert: action.payload
        }
        case 'UPDATE_NOTE_PENDING' :
        return {
            ...state,
            isLoading:true
        }
        case 'UPDATE_NOTE_REJECTED' :
        return {
            ...state,
            isLoading:false
        }
        case 'UPDATE_NOTE_FULFILLED' :
        return {
            ...state,
            isLoading:false,
            alert: action.payload
        }

        case 'ADD_REMINDER_PENDING' :
        return {
            ...state,
            isLoading:true
        }
        case 'ADD_REMINDER_REJECTED' :
        return {
            ...state,
            isLoading:false
        }
        case 'ADD_REMINDER_FULFILLED' :
        return {
            ...state,
            isLoading:false,
            reminder: action.payload
        }
        default:
            return state
    }
  }