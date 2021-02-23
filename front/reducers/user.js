import produce from 'immer'


export const  initialState = {
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false, 
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, 
    changeNicknameDone: false,
    changeNicknameError: null,
    user: null,
    signUpData: {},
    loginData: {}
}

// types
export const LOAD_MY_INFO_REQUEST = 'load_my_info_request'
export const LOAD_MY_INFO_SUCCESS = 'load_my_info_success'
export const LOAD_MY_INFO_FAILURE = 'load_my_info_failure'

export const LOG_IN_REQUEST = 'log_in_request'
export const LOG_IN_SUCCESS = 'log_in_success'
export const LOG_IN_FAILURE = 'log_in_failure'

export const LOG_OUT_REQUEST = 'log_out_request'
export const LOG_OUT_SUCCESS = 'log_out_success'
export const LOG_OUT_FAILURE = 'log_out_failure'

export const SIGN_UP_REQUEST = 'sign_up_request'
export const SIGN_UP_SUCCESS = 'sign_up_success'
export const SIGN_UP_FAILURE = 'sign_up_failure'

export const FOLLOW_REQUEST = 'follow_request'
export const FOLLOW_SUCCESS = 'follow_success'
export const FOLLOW_FAILURE = 'follow_failure'

export const UNFOLLOW_REQUEST = 'unfollow_request'
export const UNFOLLOW_SUCCESS = 'unfollow_success'
export const UNFOLLOW_FAILURE = 'unfollow_failure'

export const CHANGE_NICKNAME_REQUEST = 'change_nickname_request'
export const CHANGE_NICKNAME_SUCCESS = 'change_nickname_success'
export const CHANGE_NICKNAME_FAILURE = 'change_nickname_failure'

export const ADD_POST_TO_ME = 'add_post_to_me'
export const REMOVE_POST_OF_ME = 'remove_post_of_me'



const dummyUser = (data) => ({
    ...data,
    nickname: '제로초',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
    Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
  });

// Actions
export const loginRequestAction = (data) => ({
        type: LOG_IN_REQUEST,
        data
})
export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST
})

const reducer = (state = initialState, action ) => produce(state, (draft) => {
    switch (action.type) {
        case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoError = null;
                draft.loadMyInfoDone = false;
                break
        case LOAD_MY_INFO_SUCCESS:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoDone = true;
            draft.user = action.data;
            break
        case LOAD_MY_INFO_FAILURE:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
            break
        case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.user = action.data;
            break
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutError = null;
            draft.logOutDone = false;
            break
        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.user = null;
            break
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpError = null;
            draft.signUpDone = false;
            break
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break
        case FOLLOW_REQUEST:
            draft.followLoading = true;
            draft.followError = null;
            draft.followDone = false;
            break
        case FOLLOW_SUCCESS:
            draft.user.Followings.push({id:action.data})
            draft.followLoading = false;
            draft.followDone = true;
            break
        case FOLLOW_FAILURE:
            draft.followLoading = false;
            draft.followError = action.error;
            break
        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true;
            draft.unfollowError = null;
            draft.unfollowDone = false;
            break
        case UNFOLLOW_SUCCESS:
            draft.user.Followings = draft.user.Followings.filter(userInfo => userInfo.id !== action.data)
            draft.unfollowLoading = false;
            draft.unfollowDone = true;
            break
        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break
        case CHANGE_NICKNAME_REQUEST:
            draft.changeNicknameLoading = true;
            draft.changeNicknameError = null;
            draft.changeNicknameDone = false;
            break
        case CHANGE_NICKNAME_SUCCESS:
            draft.changeNicknameLoading = false;
            draft.changeNicknameDone = true;
            draft.user.nickname = action.data.nickname;
            break
        case CHANGE_NICKNAME_FAILURE:
            draft.changeNicknameLoading = false;
            draft.changeNicknameError = action.error;
            break
        case ADD_POST_TO_ME:
            draft.user.Posts.unshift({ id: action.data})
            break
        case REMOVE_POST_OF_ME:
            draft.user.Posts = draft.user.Posts.filter(post => post.id !== action.data.PostId)
            break
        default: 
            break
    }
})


export default reducer;