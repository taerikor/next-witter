import React, { useCallback, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import ImagesZoom from './ImagesZoom'
import { backUrl } from '../config/config'

function PostImages({ images }) {
    const [showImageZoom, setShowImageZoom] = useState(false)

    const onZoom = useCallback(() => {
        setShowImageZoom(true)
    }, [])

    const onClose = useCallback(() => {
        setShowImageZoom(false)
    }, [])

    if(images.length === 1 ){
        return (
            <>
                <img role='presentation' src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}           
            </>
        )
    }else if(images.length === 2){
        return (
            <div>
                <img role='presentation' width='50%' src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />           
                <img role='presentation' width='50%' src={`${backUrl}/${images[1].src}`} alt={images[0].src} onClick={onZoom} />
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}             
            </div>
        )
    }else {
        return (
            <>
            <div>
                <img role='presentation' width='50%' src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />           
                <div
                role='presentation'
                style={{ display: 'inline-block', width:'50%', textAlign: 'center', verticalAlign: 'middle'}}
                onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                   Load More {images.length - 1} Images
                   </div>
            </div>
            {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}  
            </>
        )
    }
}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object)
}

export default PostImages
