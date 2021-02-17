import { Form, Input, Button } from 'antd'
import { useCallback } from 'react'
import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
const CommentForm = ({ post }) => {
    const userId = useSelector(state => state.user?.User?.id)

    const [commentText, onCommentChange] = useInput('') 

    const onSubmit = useCallback(() => {

    }, [commentText])
    return (
        <Form onFinish={onSubmit}>
             <Form.Item style={{ position: 'relative', margin: 0 }}>
                 <Input.TextArea value={commentText} onChange={onCommentChange} row={4} />
                 <Button 
                 type='primary' 
                 htmlType='submit'
                 style={{ position:'absolute', right: 0, bottom: -40}}
                 >Twit</Button>
             </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm