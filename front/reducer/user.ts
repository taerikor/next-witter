import { FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from './actionTypes'
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
        followLoading: false,
        followDone: false,
        followError: null,
        unfollowLoading: false,
        unfollowDone: false,
        unfollowError: null,
}
const dummyUser = (data) => ({
    ...data,
    nickname: '제로초',
    Posts: [{ id: 1 }],
    Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
    Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
  });

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
            case FOLLOW_REQUEST:
                draft.followLoading= true;
                draft.followError= null;
                draft.followDone= false;
                break
            case FOLLOW_SUCCESS:
                draft.followLoading= false;
                draft.followDone= true;
                draft.user.Followings.push({id:action.data})
                break
            case FOLLOW_FAILURE:
                draft.followLoading= false;
                draft.followError= action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading= true;
                draft.unfollowError= null;
                draft.unfollowDone= false;
                break
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading= false;
                draft.unfollowDone= true;
                draft.user.Followings = draft.user.Followings.filter(item => item.id !== action.data)
                break
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading= false;
                draft.unfollowError= action.error;
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading= true;
                draft.logInError= null;
                draft.logInDone= false;
                break
            case LOG_IN_SUCCESS:
                draft.logInLoading= false;
                draft.logInDone= true;
                draft.user = dummyUser(action.data)
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