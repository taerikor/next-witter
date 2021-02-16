import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'

function UserProfile({setIsLoggedIn}) {
    const onLogout = useCallback(() => {
        setIsLoggedIn(false)
    }, [])
    return (
        <Card
            actions={[
                <div key='twit'>twit<br />0</div>,
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
