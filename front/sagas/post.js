import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
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
   return axios.post('/api/addPost',data)
}

function* addPost (action) {
    try{
        console.log('saga add post')
        //const result = yield call(addPostApi)
        const id = shortId.generate()
        yield delay(1000)
        yield put({
            type:ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data
            }
        })
        yield put({
            type:ADD_POST_TO_ME,
            data: id,
        })
    }catch(err){
        console.log(err)
        yield put({
            type:ADD_POST_FAILURE,
            error: err.reponse.data,
        })
    }
}
function addCommentApi(data) {
   return axios.post('/api/addComment',data)
}

function* addComment (action) {
    try{
        console.log(action)
        //const result = yield call(addCommentApi)
        yield delay(1000)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data: action.data
        })
    }catch(err){
        console.log(err)
        yield put({
            type:ADD_COMMENT_FAILURE,
            error: err.reponse.data,
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
            error: err.reponse.data,
        })
    }
}

function loadPostsApi(data) {
   return axios.get('/api/posts')
}

function* loadPosts (action) {
    try{
        console.log(action)
        //const result = yield call(loadPostsApi)
        yield delay(1000)
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10)
        })
    }catch(err){
        console.log(err)
        yield put({
            type:LOAD_POSTS_FAILURE,
            error: err.reponse.data,
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