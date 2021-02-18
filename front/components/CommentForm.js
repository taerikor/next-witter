import { Form, Input, Button } from 'antd'
import { useCallback, useEffect } from 'react'
import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post'
const CommentForm = ({ post }) => {
    const userId = useSelector(state => state.user?.user?.id)
    const { addCommentDone,addCommentLoading } = useSelector(state => state.post)
    const dispatch = useDispatch();

    const [commentText, onCommentChange, setCommentText] = useInput('') 

    useEffect(()=> {
        if(addCommentDone){
            setCommentText('')
        }
    }, [addCommentDone])

    const onSubmit = useCallback(() => {
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data: {content: commentText, postId: post.id, userId}
        })
    }, [commentText, userId])
    
    return (
        <Form onFinish={onSubmit}>
             <Form.Item style={{ position: 'relative', margin: 0 }}>
                 <Input.TextArea value={commentText} onChange={onCommentChange} row={4} />
                 <Button 
                 loading={addCommentLoading}
                 type='primary' 
                 htmlType='submit'
                 style={{ position:'absolute', right: 0, bottom: -40, zIndex: 1}}
                 >Twit</Button>
             </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm