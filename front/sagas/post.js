import { all, delay, fork, put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios'
import { 
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS, 
    ADD_POST_FAILURE, 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    LIKE_POST_FAILURE, 
    LIKE_POST_REQUEST, 
    LIKE_POST_SUCCESS, 
    LOAD_POSTS_FAILURE, 
    LOAD_POSTS_REQUEST, 
    LOAD_POSTS_SUCCESS, 
    REMOVE_POST_FAILURE, 
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS
} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';


function likePostApi(data) {
   return axios.patch(`/post/${data}/like`)
}

function* likePost (action) {
    try{
        const result = yield call(likePostApi, action.data)
        yield put({
            type:LIKE_POST_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:LIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}
function unlikePostApi(data) {
   return axios.delete(`/post/${data}/like`)
}

function* unlikePost (action) {
    try{
        const result = yield call(unlikePostApi, action.data)
        yield put({
            type:UNLIKE_POST_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:UNLIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function addPostApi(data) {
   return axios.post('/post',{content: data })
}

function* addPost (action) {
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
   return axios.delete(`/post/${data}`)
}

function* removePost (action) {
    try{
        const result = yield call(removePostApi, action.data)
        yield put({
            type:REMOVE_POST_SUCCESS,
            data: result.data
        })
        yield put({
            type:REMOVE_POST_OF_ME,
            data: result.data
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

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST,  likePost)
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST,  unlikePost)
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
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPosts)
    ])
  }