const initialState = {
    data: {},
    noteFill:{},
    profile:{},
    isLoading: false,
    isLoggedIn: false,
    isError: false
  }
  
  export default notes = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NOTES_PENDING' :
        return {
            ...state,
            isLoading:true
        }
        case 'GET_NOTES_REJECTED' :
        return {
            ...state,
            isLoading:false
        }
        case 'GET_NOTES_FULFILLED' :
        return {
            ...state,
            isLoading:false,
            data: action.payload.data
        }
        default:
            return state
    }
  }