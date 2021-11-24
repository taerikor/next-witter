import axios from 'axios'
import { all,fork, takeLatest, call, put, delay,throttle} from 'redux-saga/effects'
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../reducer/actionTypes'
import { generateDummyPost } from '../reducer/post'

function loadPostApi (data) {
    return axios.post('/api/post', data)
}
function* loadPost (action) {
    try{
        // const res =  yield call(loadPostApi,action.data)
        yield delay(1000)
        yield put({
            type: LOAD_POST_SUCCESS,
            data: generateDummyPost(10)
        })
    }catch(err){
        yield put({
            type:LOAD_POST_FAILURE,
            error: err.response.data
        })
    }
}
function removePostApi (data) {
    return axios.post('/api/post', data)
}
function* removePost (action) {
    try{
        // const res =  yield call(removePostApi,action.data)
        yield delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type:REMOVE_POST_FAILURE,
            error: err.response.data
        })
    }
}
function addCommentApi (data) {
    return axios.post('/api/comment', data)
}
function* addComment (action) {
    try{
        // const res =  yield call(addCommentApi,action.data)
        yield delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type:ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    }
}
function addPostApi (data) {
    return axios.post('/api/post', data)
}
function* addPost (action) {
    try{
        // const res =  yield call(addPostApi,action.data)
        yield delay(1000)
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error: err.response.data
        })
    }
}


function* watchLoadPost () {
    yield throttle(3000,LOAD_POST_REQUEST, loadPost)
}

function* watchRemovePost () {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}
function* watchAddComment () {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}
function* watchAddPost () {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchAddPost),
    ])
}