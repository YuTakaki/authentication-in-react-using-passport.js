export const resetError = () => {
    return{
        type : "RESET_ERROR",
    }
}

export const addError = (data) => {
    return{
        type : 'ADD_ERROR',
        data
    }
}

export const allData = (data) => {
    return{
        type : 'ALL_DATA',
        data
    }
}

export const delError = (data) => {
    return{
        type : 'DEL_ERROR',
        data
    }
}

export const currentUser = (data) => {
    return{
        type : 'CURRENT_USER',
        data
    }
}

export const resetCurrentUser = (data) => {
    return{
        type : 'RESET_CURRENT_USER',
        data
    }
}