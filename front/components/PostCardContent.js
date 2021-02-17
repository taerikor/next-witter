import Link from 'next/link'
import PropTypes from 'prop-types'

const PostCardContent = ({postData}) => (
    <div>
        {postData.split(/(#[^\s#]+)/g).map((content, index) => {
            if(content.match(/(#[^\s#]+)/)){
                return <Link href={`/hashtag/${content.slice(1)}`} key={index}><a>{content}</a></Link>
            }
            return content
        })}
    </div>
)
PostCardContent.propTypes = { postData: PropTypes.string.isRequired }

export default PostCardContent