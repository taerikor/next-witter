import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore'


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
        const handleScroll = () => {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostsLoading ){
                    const lastId = mainPosts[mainPosts.length -1 ]?.id
                    console.log(lastId)
                    dispatch({
                        type:LOAD_POSTS_REQUEST,
                        lastId,
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

export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type:LOAD_POSTS_REQUEST
    })
    context.store.dispatch({
        type:LOAD_MY_INFO_REQUEST
    })
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise()
})

export default Home