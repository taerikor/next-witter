import Router from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'
import { LOAD_FOLLOWER_REQUEST, LOAD_FOLLOWING_REQUEST } from '../reducers/user'

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

export default profile
