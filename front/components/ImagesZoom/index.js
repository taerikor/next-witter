import PropTypes from 'prop-types'
import Slick from 'react-slick'
import { useState } from 'react'
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from './styles';

const ImagesZoom = ({images, onClose}) => {
    const [ currentSlide, setCurrentSlide] = useState(0)
    return (
        <Overlay>
            <Global />
            <Header>
                <h1>Detail Image</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick 
                        initialSlide={0}
                        beforeChange={slide => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map(image => (
                            <ImgWrapper key={image.src} >
                                <img src={`http://localhost:5000/${image.src}`} alt={image.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                        {currentSlide + 1}
                        {' '}
                        / 
                        {' '}
                         {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    )

}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
}

export default ImagesZoom