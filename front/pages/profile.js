import axios from 'axios'
import Router from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'
import { LOAD_FOLLOWER_REQUEST, LOAD_FOLLOWING_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url, {withCredentials: true }).then(result => result.data)

function profile() {
    const { user } = useSelector(state => state.user)
    const [ followingsLimit, setFollowingsLimit ] =useState(3)
    const [ followersLimit, setFollowersLimit ] =useState(3)
    const { data: followingsData , error: followingError } =useSWR(`http://localhost:5000/user/following?limit=${followingsLimit}`,fetcher)
    const { data: followersData , error: followerError } =useSWR(`http://localhost:5000/user/follower?limit=${followersLimit}`,fetcher)

    useEffect(()=>{
        if(!user){
            Router.push('/')
        }
    },[user])

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit(prev => prev + 3)
    },[])

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit(prev => prev + 3)
    },[])


    if(!user){
        return <h1>Loading..</h1>
    }

    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header='Following' data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
            <FollowList header='Follower' data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError}/>
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
