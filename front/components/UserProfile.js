import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducers/user'

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
                <div key='twit'>Twit<br />{user.Posts.length}</div>,
                <div key='followings'>Following<br />{user.Followings.length}</div>,
                <div key='followers'>Follower<br />{user.Followers.length}</div>,
            ]} 
        >
            <Card.Meta
            avatar={<Avatar>{user.nickname[0]}</Avatar>}
            title={user.nickname}
            />
            <Button loading={logOutLoading} onClick={onLogout}>
                Log out
            </Button>
        </Card>
    )
}

export default UserProfile
