import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import { 
    LOG_IN_FAILURE, 
    LOG_IN_REQUEST, 
    LOG_IN_SUCCESS, 
    LOG_OUT_FAILURE, 
    LOG_OUT_REQUEST, 
    LOG_OUT_SUCCESS, 
    SIGN_UP_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS
} from '../reducers/user';


function logInApi (data) {
    return axios.post('/api/login',data)
}

function* logIn(action) {
    try{
        console.log('saga Login')
        //const result = yield call(logInApi);
        yield delay(1000);
        yield put({
            type:LOG_IN_SUCCESS,
            data: action.data,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logOutApi () {
    return axios.post('/api/logout')
}

function* logOut() {
    try{
        console.log('saga LogOut')
        //const result = yield call(logOutApi);
        yield delay(1000);
        yield put({
            type:LOG_OUT_SUCCESS,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function signUpApi () {
    return axios.post('/api/signup')
}

function* signUp(action) {
    try{
        console.log('saga sign Up')
        //const result = yield call(signUpApi);
        yield delay(1000);
        yield put({
            type:SIGN_UP_SUCCESS,
        });
    }catch (err){
        console.log(err)
        yield put({
            type:SIGN_UP_FAILURE,
            error: err.response.data
        })
    }
}

// function followAPI() {
//     return axios.post('/api/follow');
//   }
  
//   function* follow(action) {
//     try {
//       // const result = yield call(followAPI);
//       yield delay(1000);
//       yield put({
//         type: FOLLOW_SUCCESS,
//         data: action.data,
//       });
//     } catch (err) {
//       console.error(err);
//       yield put({
//         type: FOLLOW_FAILURE,
//         error: err.response.data,
//       });
//     }
//   }
  
//   function unfollowAPI() {
//     return axios.post('/api/unfollow');
//   }
  
//   function* unfollow(action) {
//     try {
//       // const result = yield call(unfollowAPI);
//       yield delay(1000);
//       yield put({
//         type: UNFOLLOW_SUCCESS,
//         data: action.data,
//       });
//     } catch (err) {
//       console.error(err);
//       yield put({
//         type: UNFOLLOW_FAILURE,
//         error: err.response.data,
//       });
//     }
//   }

// function* watchFollow() {
//     yield takeLatest(FOLLOW_REQUEST, follow);
//   }
  
//   function* watchUnfollow() {
//     yield takeLatest(UNFOLLOW_REQUEST, unfollow);
//   }

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
    yield all([
        // fork(watchFollow),
        // fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}