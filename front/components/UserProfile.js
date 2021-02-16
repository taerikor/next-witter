import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/user'

function UserProfile() {
    const dispatch = useDispatch()
    const onLogout = useCallback(() => {
        dispatch(logoutAction)
    }, [])
    return (
        <Card
            actions={[
                <div key='twit'>Twit<br />0</div>,
                <div key='followings'>Following<br />0</div>,
                <div key='followers'>Follower<br />0</div>,
            ]} 
        >
            <Card.Meta
            avatar={<Avatar>Taeri</Avatar>}
            title='Next'
            />
            <Button onClick={onLogout}>
                Log out
            </Button>
        </Card>
    )
}

export default UserProfile
