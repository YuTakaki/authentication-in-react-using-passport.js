const initState = {
    data : [],
    error : [],
    currentlyLogin : ''
};
const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'RESET_ERROR':
            return{
                ...state,
                error : []
            }
        case 'ADD_ERROR':
            return{
                ...state,
                error : action.data
            }
        case 'ALL_DATA':
            return{
                ...state,
                data : action.data
            }
        case 'DEL_ERROR':
            const newError = state.error.filter((err) => err.msg !== action.data)
            return{
                ...state,
                error : newError
            }
        case 'CURRENT_USER':
            return{
                ...state,
                currentlyLogin : action.data
            }
        case 'RESET_CURRENT_USER':
            return{
                ...state,
                currentlyLogin : ''
            }
        default : 
            return state;
    }
    
}

export default rootReducer;