import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import { 
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS, 
    ADD_POST_FAILURE, 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS 
} from '../reducers/post'


function addPostApi(data) {
   return axios.post('/api/addPost',data)
}

function* addPost (action) {
    try{
        console.log('saga add post')
        //const result = yield call(addPostApi)
        yield delay(1000)
        yield put({
            type:ADD_POST_SUCCESS,
            data: {
                content: action.data
            }
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
        console.log('saga add Comment')
        //const result = yield call(addCommentApi)
        yield delay(1000)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data: {
                content: action.data
            }
        })
    }catch(err){
        console.log(err)
        yield put({
            type:ADD_COMMENT_FAILURE,
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

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ])
  }