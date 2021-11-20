import axios from 'axios'
import { all,fork, takeLatest, call, put, delay} from 'redux-saga/effects'
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from '../reducer/actionTypes'

function addPostApi (data) {
    return axios.post('/api/post', data)
}
function* addPost (action) {
    try{
        const res =  yield call(addPostApi,action.data)
        yield put({
            type: ADD_POST_SUCCESS,
            data: res.data
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error: err.response.data
        })
    }
}


function* watchAddPost () {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
}