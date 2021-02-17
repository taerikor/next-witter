export const  initialState = {
    isLoggedIn: false,
    isLoggingIn: false, //try login
    isLoggingOut: false, //try logout
    user: null,
    signUpData: {},
    loginData: {}
}
// types
export const LOG_IN_REQUEST = 'log_in_request'
export const LOG_IN_SUCCESS = 'log_in_success'
export const LOG_IN_FAILURE = 'log_in_failure'

export const LOG_OUT_REQUEST = 'log_out_request'
export const LOG_OUT_SUCCESS = 'log_out_success'
export const LOG_OUT_FAILURE = 'log_out_failure'


// Actions
export const loginRequestAction = (data) => ({
        type: LOG_IN_REQUEST,
        data
})
export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST
})

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case LOG_IN_REQUEST:{
            return {...state,
                isLoggingIn:true,
                isLoggedIn:false
            }
        }
        case LOG_IN_SUCCESS:{
            return {...state,
                    isLoggedIn: true,
                    isLoggingIn: false,
                    user: {...action.data, nickname: 'taeri'}
            }
        }
        case LOG_IN_FAILURE:{
            return {...state,
                    isLoggingIn: false
            }
        }
        case LOG_OUT_REQUEST:{
            return {...state,
                    isLoggingOut: true,
            }
        }
        case LOG_OUT_SUCCESS:{
            return {...state,
                    isLoggingOut: false,
                    isLoggedIn:false,
                    user:null
            }
        }
        case LOG_OUT_FAILURE:{
            return {...state,
                    isLoggingOut: false,
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default reducer;