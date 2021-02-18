import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { LOAD_POSTS_REQUEST } from '../reducers/post'


const Home = () => {
    const { user} = useSelector(state => state.user)
    const { mainPosts,hasMorePosts,loadPostsLoading } = useSelector(state => state.post)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type:LOAD_POSTS_REQUEST
        })
    },[])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostsLoading ){
                    console.log('yes')
                    dispatch({
                        type:LOAD_POSTS_REQUEST
                    })
                }
            }
        }

        window.addEventListener('scroll',handleScroll)

        return () => {
            window.removeEventListener('scroll',handleScroll)
        }
    }, [hasMorePosts, loadPostsLoading])

return <AppLayout>
     {user && <PostForm />}
    {mainPosts.map(post => <PostCard key={post.id} post={post} />)}
     </AppLayout>
}

export default Home