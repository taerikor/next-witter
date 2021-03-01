import { all, fork } from 'redux-saga/effects'
import axios from 'axios'
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;


import postSaga from './post'
import userSaga from './user'

export default function* rootSaga(){
    yield all([
        fork(userSaga),
        fork(postSaga)
    ])
}