import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducers/user'
import Link from 'next/link'

function UserProfile() {
    const dispatch = useDispatch()
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
          });
    }, [])
    const {user,logOutLoading} = useSelector(state => state.user)
    return (
        <Card
            actions={[
                <div key='twit'>Twit<br /><Link href={`/user/${user.id}`} ><a>{user.Posts.length}</a></Link></div>,
                <div key='followings'>Following<br /><Link href={`/profile`} ><a>{user.Followings.length}</a></Link></div>,
                <div key='followers'>Follower<br /><Link href={`/profile`} ><a>{user.Followers.length}</a></Link></div>,
            ]} 
        >
            <Card.Meta
            avatar={<Link href={`/user/${user.id}`} ><a><Avatar>{user.nickname[0]}</Avatar></a></Link>}
            title={user.nickname}
            />
            <Button loading={logOutLoading} onClick={onLogout}>
                Log out
            </Button>
        </Card>
    )
}

export default UserProfile
