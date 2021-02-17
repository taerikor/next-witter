import {Card, Popover, Button, Avatar, List, Comment} from 'antd'
import {RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons'
import PostImages from './PostImages'
import ButtonGroup from 'antd/lib/button/button-group'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useCallback, useState } from 'react'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'


const PostCard = ({post}) => {
    const userId = useSelector(state => state.user.User && state.user.User.id)

    const [liked,setLiked] = useState(false)
    const [toggleComment,setToggleComment] = useState(false)

    const onToggleLike = useCallback(()=>{
        setLiked(prev => !prev)
    },[])
    const onToggleComment = useCallback(()=>{
        setToggleComment(prev => !prev)
    },[])

    return( 
    <div style={{marginBottom:20}}>
        <Card 
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
                <RetweetOutlined key='retweet'/>,
                liked 
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                :<HeartOutlined key='heart' onClick={onToggleLike}/>,
                <MessageOutlined key='message' onClick={onToggleComment} />,
                <Popover key='more' content={(
                    <ButtonGroup>
                        {userId && post.User.id === userId ?
                        <>
                        <Button>Revise</Button>
                        <Button>Remove</Button>
                        </>
                        :<Button>Report</Button>
                    }
                    </ButtonGroup>
                )}>
                    <EllipsisOutlined />
                </Popover>
            ]}
        >
            <Card.Meta 
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
            />
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
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                    />
                </li>
            )}
            />
            </div>)}
        {/* <CommentForm />
        <Comments /> */}
    </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
    }),
  };
  

export default PostCard