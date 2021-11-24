import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from './actionTypes'
import produce from 'immer'
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
    data:{
        ...data,
        id:1
    }
   } 
}
export const logoutReqAction = () => {
   return {
    type: LOG_OUT_REQUEST
   } 
}

const reducer = (state=initialState, action) => {
    return produce(state, draft => {
        switch(action.type){
            case LOG_IN_REQUEST:
                draft.logInLoading= true;
                draft.logInError= null;
                draft.logInDone= false;
                break
            case LOG_IN_SUCCESS:
                draft.logInLoading= false;
                draft.logInDone= true;
                draft.user = action.data
                break
            case LOG_IN_FAILURE:
                draft.logInLoading= false;
                draft.logInError= action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading= true;
                draft.logOutError= null;
                draft.logOutDone= false;
                break
            case LOG_OUT_SUCCESS:
                draft.logOutLoading= false;
                draft.logOutDone= true;
                draft.user = null;
                break
            case LOG_OUT_FAILURE:
                draft.logOutLoading= false;
                draft.logOutError= action.error;
                break
            default: return state;
        }
    })
    
}
export type IUserState = ReturnType<typeof reducer>;
export default reducer;