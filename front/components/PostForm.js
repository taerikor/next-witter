import { Button, Form, Input} from 'antd'
import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backUrl } from '../config/config'
import useInput from '../hooks/useInput'
import { addPost, ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from '../reducers/post'


const PostForm = () => {
    const { imagePaths,addPostDone } = useSelector(state => state.post)
    const dispatch = useDispatch();
    const imageInput = useRef();
    
    const [text,onTextChange,setText] = useInput('')

    const onSubmit = useCallback(()=>{
        if (!text || !text.trim()) {
            return alert('type text');
          }

        const formData = new FormData();
        imagePaths.forEach(path => {
            formData.append('image', path)
        })
        formData.append('content', text)
        dispatch({
            type: ADD_POST_REQUEST,
            data:formData
        })
    },[text, imagePaths])

    useEffect(()=> {
        if(addPostDone){
            setText('')
        }
    }, [addPostDone])

    const onUploadClick = useCallback(() => {
        imageInput.current.click()
    } ,[imageInput.current])

    const onImagesChange = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (file) => {
            imageFormData.append('image', file)
        })
        dispatch({
            type:UPLOAD_IMAGE_REQUEST,
            data:imageFormData
        })
    }, [])
    const onRemove = useCallback((index) => () => {
        dispatch({
            type:REMOVE_IMAGE,
            data:index
        })
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
                 <input type='file' name='image' multiple hidden ref={imageInput} onChange={onImagesChange} />
                 <Button onClick={onUploadClick}>Image Upload</Button>
                 <Button type='primary' style={{float:'right'}} htmlType='submit'>Twit</Button>
             </div>
             <div>
                 {imagePaths.map((path, i) => (
                     <div key={path} style={{ display: 'inline-block' }}>
                         <img src={`${backUrl}/${path}`} style={{ width:'200px'}} alt={path} />
                         <div>
                             <Button onClick={onRemove(i)}>Remove</Button>
                         </div>
                     </div>
                 ))}
             </div>
         </Form>
     )
}

export default PostForm