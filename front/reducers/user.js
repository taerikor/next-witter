export const  initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {}
}
// types
export const LOG_IN = 'log_in'
export const LOG_OUT = 'log_out'

// Actions
export const loginAction = (data) => {
    return {
        type: LOG_IN,
        data
    }
}
export const logoutAction = {
    type: LOG_OUT
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case LOG_IN:{
            return {...state,
                    isLoggedIn: true,
                    loginData: action.data,
            }
        }
        case LOG_OUT:{
            return {...state,
                    isLoggedIn: false,
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default reducer;