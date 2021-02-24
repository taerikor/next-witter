import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'


const Home = () => {
    const { user} = useSelector(state => state.user)
    const { mainPosts,hasMorePosts,loadPostsLoading,retweetError } = useSelector(state => state.post)
    const dispatch = useDispatch();

    useEffect(() => {
        if (retweetError) {
          alert(retweetError);
        }
      }, [retweetError]);

    useEffect(() => {
        dispatch({
            type:LOAD_POSTS_REQUEST
        })
    },[])
    
    useEffect(() => {
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        })
    },[])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostsLoading ){
                    const lastId = mainPosts[mainPosts.length -1 ]?.id
                    console.log(lastId)
                    dispatch({
                        type:LOAD_POSTS_REQUEST,
                        lastId
                    })
                }
            }
        }

        window.addEventListener('scroll',handleScroll)

        return () => {
            window.removeEventListener('scroll',handleScroll)
        }
    }, [hasMorePosts, loadPostsLoading,mainPosts])

return <AppLayout>
     {user && <PostForm />}
    {mainPosts.map(post => <PostCard key={post.id} post={post} />)}
     </AppLayout>
}

export default Home