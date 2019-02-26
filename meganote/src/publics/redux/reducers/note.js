const initialState = {
    data: [],
    noteFill:{},
    profile:{},
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
        default:
            return state
    }
  }