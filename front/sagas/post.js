import { all, delay, fork, put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios'
import shortId from 'shortid'
import { 
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS, 
    ADD_POST_FAILURE, 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    generateDummyPost, 
    LOAD_POSTS_FAILURE, 
    LOAD_POSTS_REQUEST, 
    LOAD_POSTS_SUCCESS, 
    REMOVE_POST_FAILURE, 
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';


function addPostApi(data) {
   return axios.post('/post',{content: data })
}

function* addPost (action) {
    console.log(action)
    try{
        const result = yield call(addPostApi, action.data)
        yield put({
            type:ADD_POST_SUCCESS,
            data: result.data
        })
        yield put({
            type:ADD_POST_TO_ME,
            data: result.data.id
        })
    }catch(err){
        console.log(err)
        yield put({
            type:ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}
function addCommentApi(data) {
   return axios.post(`/post/${data.postId}/comment`,data)
}

function* addComment (action) {
    try{
        const result = yield call(addCommentApi, action.data)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

function removePostApi(data) {
   return axios.delete('/api/removepost',data)
}

function* removePost (action) {
    try{
        console.log(action)
        //const result = yield call(removePostApi)
        yield delay(1000)
        yield put({
            type:REMOVE_POST_SUCCESS,
            data: action.data
        })
        yield put({
            type:REMOVE_POST_OF_ME,
            data: action.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function loadPostsApi() {
   return axios.get('/posts')
}

function* loadPosts (action) {
    try{
        const result = yield call(loadPostsApi)
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:LOAD_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST,  addPost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST,  addComment)
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST,  removePost)
}

function* watchLoadPosts() {
    yield takeLatest( LOAD_POSTS_REQUEST,  loadPosts)
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPosts)
    ])
  }