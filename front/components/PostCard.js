import {Card, Popover, Button, Avatar, List, Comment} from 'antd'
import {RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons'
import PostImages from './PostImages'
import ButtonGroup from 'antd/lib/button/button-group'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useState } from 'react'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post'
import FollowButton from './FollowButton'
import Link from 'next/link'
import moment from 'moment'


const PostCard = ({post}) => {
    const userId = useSelector(state => state.user?.user?.id)
    const { removePostLoading } = useSelector(state => state.post)
    const dispatch = useDispatch();

    const [liked,setLiked] = useState(false)
    const [toggleComment,setToggleComment] = useState(false)

    const onLikeClick = useCallback(()=>{
        if(!userId){
            return alert('please login')
        }
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        })
        setLiked(prev => !prev)
    },[userId])

    const onUnLikeClick = useCallback(()=>{
        if(!userId){
            return alert('please login')
        }
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        })
        setLiked(prev => !prev)
    },[userId])

    const onToggleComment = useCallback(()=>{
        setToggleComment(prev => !prev)
    },[])
    
    const onRemoveClick = useCallback(() => {
        if(!userId){
            return alert('please login')
        }
        dispatch({
            type:REMOVE_POST_REQUEST,
            data: post.id
        })
    }, [userId])

    const onRetweet = useCallback(() => {
        if(!userId){
            return alert('please login')
        }
        dispatch({
            type:RETWEET_REQUEST,
            data:post.id
        })
    },[userId])

    return( 
    <div style={{marginBottom:20}}>
        <Card 
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
                <RetweetOutlined onClick={onRetweet} key='retweet'/>,
                liked 
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLikeClick} />
                :<HeartOutlined key='heart' onClick={onLikeClick}/>,
                <MessageOutlined key='message' onClick={onToggleComment} />,
                <Popover key='more' content={(
                    <ButtonGroup>
                        {userId && post.User.id === userId ?
                        <>
                        <Button>Revise</Button>
                        <Button loading={removePostLoading} onClick={onRemoveClick}>Remove</Button>
                        </>
                        :<Button>Report</Button>
                    }
                    </ButtonGroup>
                )}>
                    <EllipsisOutlined />
                </Popover>
            ]}
            title={post.RetweetId ? `${post.User.nickname} Retweeted it` : null}
            extra={userId && <FollowButton post={post} />}
        >
         {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
                <span style={{ float:'right'}}>{moment(post.createdAt).startOf('hour').fromNow() || moment(post.createdAt).endOf('day').fromNow() }</span>
              <Card.Meta
                avatar={<Avatar><Link href={`/user/${post.Retweet.User.id}`} ><a>{post.Retweet.User.nickname[0]}</a></Link></Avatar>}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
          )
          : (
              <>
            <span style={{ float:'right'}}>{moment(post.createdAt).startOf('hour').fromNow() || moment(post.createdAt).endOf('day').fromNow() }</span>
            <Card.Meta
              avatar={<Avatar><Link href={`/user/${post.User.id}`} ><a>{post.User.nickname[0]}</a></Link></Avatar>}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
            </>
          )}
        </Card>
        {toggleComment && (
            <div>
            <CommentForm post={post} />
            <List 
            header={`${post.Comments.length} Comments`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            renderItem={item => (
                <li>
                    <Comment 
                    author={item.User.nickname}
                    avatar={<Avatar><Link href={`/user/${item.User.id}`} ><a>{item.User.nickname[0]}</a></Link></Avatar>}
                    content={item.content}
                    />
                </li>
            )}
            />
            </div>)}

    </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
    }),
  };
  

export default PostCard