import React from 'react'
import { useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'

function profile() {
    const { user } = useSelector(state => state.user)
    
    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header='Following' data={user.Followings} />
            <FollowList header='Follower' data={user.Followers} />
        </AppLayout>
    )
}

export default profile
