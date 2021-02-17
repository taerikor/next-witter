import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction, LOG_OUT_REQUEST } from '../reducers/user'

function UserProfile() {
    const dispatch = useDispatch()
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
          });
    }, [])
    const {user,isLoggingOut} = useSelector(state => state.user)
    return (
        <Card
            actions={[
                <div key='twit'>Twit<br />0</div>,
                <div key='followings'>Following<br />0</div>,
                <div key='followers'>Follower<br />0</div>,
            ]} 
        >
            <Card.Meta
            avatar={<Avatar>{user.nickname[0]}</Avatar>}
            title={user.nickname}
            />
            <Button loading={isLoggingOut} onClick={onLogout}>
                Log out
            </Button>
        </Card>
    )
}

export default UserProfile
