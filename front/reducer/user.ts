import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from './actionTypes'

const initialState = {
        isLoggedIn: false,
        user:null,
        userInfo: null,
        logInLoading: false,
        logInDone: false,
        logInError: null,
        logOutLoading: false,
        logOutDone: false,
        logOutError: null,
}

export const loginReqAction = (data) => {
   return {
    type: LOG_IN_REQUEST,
    data
   } 
}
export const logoutReqAction = () => {
   return {
    type: LOG_OUT_REQUEST
   } 
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case LOG_IN_REQUEST:
            return {
                    ...state,
                    logInLoading:true,
                    logInError: null,
                    logInDone: false,
            }
        case LOG_IN_SUCCESS:
            return {
                    ...state,
                    logInLoading:false,
                    logInDone: true,
                    user: action.data
            }
        case LOG_IN_FAILURE:
            return {
                    ...state,
                    logInLoading:false,
                    logInError: action.error,
            }
        case LOG_OUT_REQUEST:
            return {
                    ...state,
                    logOutLoading:true,
                    logOutError: null,
                    logOutDone: false,
            }
        case LOG_OUT_SUCCESS:
            return {
                    ...state,
                    logOutLoading:false,
                    logOutDone: true,
                    user: null
            }
        case LOG_OUT_FAILURE:
            return {
                    ...state,
                    logOutLoading:false,
                    logOutError: action.error,
            }
        default: return state;
    }
}
export type IUserState = ReturnType<typeof reducer>;
export default reducer;