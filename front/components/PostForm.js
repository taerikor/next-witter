import { Button, Form, Input} from 'antd'
import { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { addPost } from '../reducers/post'


const PostForm = () => {
    const [text,setText] = useState('')
    const { imagePaths } = useSelector(state => state.post)
    const dispatch = useDispatch();
    const imageInput = useRef();
    const onSubmit = useCallback(()=>{
        dispatch(addPost)
        setText('')
    },[])

    const onUploadClick = useCallback(() => {
        imageInput.current.click()
    } ,[imageInput.current])

    const onTextChange = useCallback((e) => {
        setText(e.target.value)
    },[])
     return (
         <Form 
         style={{ margin: '10px 0 20px'}}
         encType='multipart/form-data'
         onFinish={onSubmit}
         >
             <Input.TextArea
             value={text}
             onChange={onTextChange}
             placeholder='Type Twit'
             />
             <div>
                 <input type='file' multiple hidden ref={imageInput} />
                 <Button onClick={onUploadClick}>Image Upload</Button>
                 <Button type='primary' style={{float:'right'}} htmlType='submit'>Twit</Button>
             </div>
             <div>
                 {imagePaths.map((path) => (
                     <div key={path} style={{ display: 'inline-block' }}>
                         <img src={path} style={{ width:'200px'}} alt={path} />
                         <div>
                             <Button>Remove</Button>
                         </div>
                     </div>
                 ))}
             </div>
         </Form>
     )
}

export default PostForm