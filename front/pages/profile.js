import axios from 'axios'
import Router from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'
import { LOAD_FOLLOWER_REQUEST, LOAD_FOLLOWING_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore'

function profile() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!user){
            Router.push('/')
        }
    },[user])

    useEffect(() => { 
        dispatch({
            type:LOAD_FOLLOWING_REQUEST
        })
        dispatch({
            type:LOAD_FOLLOWER_REQUEST
        })
    },[])
    
    if(!user){
        return null
    }

    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header='Following' data={user.Followings} />
            <FollowList header='Follower' data={user.Followers} />
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });
  

export default profile
