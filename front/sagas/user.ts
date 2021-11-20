import axios from 'axios'
import { all,fork, takeLatest, call, put, delay} from 'redux-saga/effects'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../reducer/actionTypes'

function logInApi (data) {
    return axios.post('/api/login', data)
}
function* logIn (action) {
    console.log('saga')
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

function* watchLogIn () {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut () {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}


export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}