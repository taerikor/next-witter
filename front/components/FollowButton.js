import { Button } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user'

const FollowButton = ({post}) => {
    const dispatch = useDispatch();
    const { user, followLoading, unfollowLoading } = useSelector(state => state.user)

    const isFollowing = user?.Followings.find(userInfo => userInfo.id === post.User.id)

    const onFollowClick = useCallback(() => {
        if(isFollowing){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data:post.User.id
            })
        }else{
            dispatch({
                type:FOLLOW_REQUEST,
                data:post.User.id
            })
        }
    },[isFollowing])

    if(user.id === post.User.id){
        return null;
    }

    return (
        <Button
        loading={followLoading || unfollowLoading} 
        onClick={onFollowClick}>
            {isFollowing?'UNFOLLOW':'FOLLOW'}
            </Button>
        )
}

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
  };
  

export default FollowButton