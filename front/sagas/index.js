import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'


import postSaga from './post'
import userSaga from './user'

export default function* rootSaga(){
    yield all([
        fork(userSaga),
        fork(postSaga)
    ])
}