import axios from 'axios'
import { all,fork, takeLatest, call, put, delay} from 'redux-saga/effects'
import { FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from '../reducer/actionTypes'

function followApi (data) {
    return axios.post('/api/follow', data)
}
function* followUser (action) {
    console.log(action.data)
    try{
        // const res =  yield call(followApi,action.data)
        yield delay(1000)
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type:FOLLOW_FAILURE,
            error: err.response.data
        })
    }
}
function unfollowApi (data) {
    return axios.post('/api/unfollow', data)
}
function* unfollowUser (action) {
    
    try{
        // const res =  yield call(unfollowApi,action.data)
        yield delay(1000)
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type:UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }
}
function logInApi (data) {
    return axios.post('/api/login', data)
}
function* logIn (action) {
    
    try{
        // const res =  yield call(logInApi,action.data)
        yield delay(3000)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type:LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}


function logOutApi () {
    return axios.post('/api/login')
}
function* logOut () {
    try{
        // const res =  yield call(logOutApi)
        yield delay(3000)
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: res.data
        })
    }catch(err){
        yield put({
            type:LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchFollow () {
    yield takeLatest(FOLLOW_REQUEST, followUser)
}
function* watchUnfollow () {
    yield takeLatest(UNFOLLOW_REQUEST, unfollowUser)
}
function* watchLogIn () {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut () {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}


export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}