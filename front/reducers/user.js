export const  initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
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

export const SIGN_UP_REQUEST = 'sign_up_request'
export const SIGN_UP_SUCCESS = 'sign_up_success'
export const SIGN_UP_FAILURE = 'sign_up_failure'

export const FOLLOW_REQUEST = 'follow_request'
export const FOLLOW_SUCCESS = 'follow_success'
export const FOLLOW_FAILURE = 'follow_failure'

export const UNFOLLOW_REQUEST = 'unfollow_request'
export const UNFOLLOW_SUCCESS = 'unfollow_success'
export const UNFOLLOW_FAILURE = 'unfollow_failure'


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

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case LOG_IN_REQUEST:{
            return {...state,
                logInLoading:true,
                logInError:null,
                logInDone:false
            }
        }
        case LOG_IN_SUCCESS:{
            return {...state,
                logInLoading:false,
                logInDone:true,
                    user: dummyUser(action.data)
            }
        }
        case LOG_IN_FAILURE:{
            return {...state,
                    logInLoading: false,
                    logInError:action.error
            }
        }
        case LOG_OUT_REQUEST:{
            return {...state,
                    logOutLoading:true,
                    logOutError:null,
                    logOutDone:false,
            }
        }
        case LOG_OUT_SUCCESS:{
            return {...state,
                    logOutLoading:false,
                    logOutDone:true,
                    user:null
            }
        }
        case LOG_OUT_FAILURE:{
            return {...state,
                    logOutLoading:false,
                    logOutError:action.error
            }
        }
        case SIGN_UP_REQUEST:{
            return {...state,
                    signUpLoading:true,
                    signUpError:null,
                    signUpDone:false,
            }
        }
        case SIGN_UP_SUCCESS:{
            return {...state,
                    signUpLoading:false,
                    signUpDone:true,
            }
        }
        case SIGN_UP_FAILURE:{
            return {...state,
                    signUpLoading:false,
                    signUpError: action.error
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default reducer;