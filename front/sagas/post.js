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
    LOAD_HASHTAG_POSTS_FAILURE, 
    LOAD_HASHTAG_POSTS_REQUEST, 
    LOAD_HASHTAG_POSTS_SUCCESS, 
    LOAD_POSTS_FAILURE, 
    LOAD_POSTS_REQUEST, 
    LOAD_POSTS_SUCCESS, 
    LOAD_POST_FAILURE, 
    LOAD_POST_REQUEST, 
    LOAD_POST_SUCCESS, 
    LOAD_USER_POSTS_FAILURE, 
    LOAD_USER_POSTS_REQUEST, 
    LOAD_USER_POSTS_SUCCESS, 
    REMOVE_POST_FAILURE, 
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    RETWEET_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS
} from '../reducers/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';


function retweetApi(data) {
   return axios.post(`/post/${data}/retweet`, data)
}

function* retweet (action) {
    try{
        const result = yield call(retweetApi, action.data)
        yield put({
            type:RETWEET_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:RETWEET_FAILURE,
            error: err.response.data,
        })
    }
}
function uploadImageApi(data) {
   return axios.post(`/post/images`, data)
}

function* uploadImage (action) {
    try{
        const result = yield call(uploadImageApi, action.data)
        yield put({
            type:UPLOAD_IMAGE_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:UPLOAD_IMAGE_FAILURE,
            error: err.response.data,
        })
    }
}
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
   return axios.post('/post',data)
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

function loadUserPostsApi(data,lastId) {
   return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`)
}

function* loadUserPosts (action) {
    try{
        const result = yield call(loadUserPostsApi,action.data ,action.lastId)
        yield put({
            type:LOAD_USER_POSTS_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:LOAD_USER_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}
function loadHashtagPostsApi(data,lastId) {
   return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
}

function* loadHashtagPosts (action) {
    try{
        const result = yield call(loadHashtagPostsApi, action.data, action.lastId)
        yield put({
            type:LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:LOAD_HASHTAG_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}
function loadPostsApi(lastId) {
   return axios.get(`/posts?lastId=${lastId || 0}`)
}

function* loadPosts (action) {
    try{
        const result = yield call(loadPostsApi, action.lastId)
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

function loadPostApi(data) {
   return axios.get(`/post/${data}`)
}

function* loadPost (action) {
    try{
        const result = yield call(loadPostApi, action.data)
        yield put({
            type:LOAD_POST_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:LOAD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST,  retweet)
}

function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE_REQUEST,  uploadImage)
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

function* watchLoadHashtagPosts() {
    yield takeLatest( LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}
function* watchLoadUserPosts() {
    yield takeLatest( LOAD_USER_POSTS_REQUEST,  loadUserPosts)
}
function* watchLoadPosts() {
    yield takeLatest( LOAD_POSTS_REQUEST,  loadPosts)
}

function* watchLoadPost() {
    yield takeLatest( LOAD_POST_REQUEST,  loadPost)
}

export default function* postSaga() {
    yield all([
        fork(watchRetweet),
        fork(watchUploadImage),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadPosts),
        fork(watchLoadPost),
    ])
  }