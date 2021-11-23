import axios from 'axios'
import { all,fork, takeLatest, call, put, delay} from 'redux-saga/effects'
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from '../reducer/actionTypes'

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


function* watchAddComment () {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}
function* watchAddPost () {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
    yield all([
        fork(watchAddComment),
        fork(watchAddPost),
    ])
}