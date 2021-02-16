import React from 'react'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'

function profile() {
    const followerList = [{  nickname: 'taeri'}, {nickname: 'sejin'}, {nickname:'homin'}]
    const followingList = [{  nickname: 'taeri'}, {nickname: 'sejin'}, {nickname:'homin'}]
    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header='Following' data={followingList} />
            <FollowList header='Follower' data={followerList} />
        </AppLayout>
    )
}

export default profile
