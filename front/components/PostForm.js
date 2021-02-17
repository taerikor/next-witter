import { Button, Form, Input} from 'antd'
import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { addPost } from '../reducers/post'


const PostForm = () => {
    const { imagePaths,addPostDone } = useSelector(state => state.post)
    const dispatch = useDispatch();
    const imageInput = useRef();
    
    const [text,onTextChange,setText] = useInput('')

    const onSubmit = useCallback(()=>{
        dispatch(addPost(text))
    },[text])

    useEffect(()=> {
        if(addPostDone){
            setText('')
        }
    }, [addPostDone])

    const onUploadClick = useCallback(() => {
        imageInput.current.click()
    } ,[imageInput.current])

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