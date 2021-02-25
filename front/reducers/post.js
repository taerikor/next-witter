import shortId from 'shortid'
import produce from 'immer'

const  initialState = {
      mainPosts: [],
      imagePaths: [],
      likePostLoading: false,
      likePostDone: false,
      likePostError: null,
      unlikePostLoading: false,
      unlikePostDone: false,
      unlikePostError: null,
      addPostLoading: false,
      addPostDone: false,
      addPostError: null,
      addCommentLoading: false,
      addCommentDone: false,
      addCommentError: null,
      removePostLoading: false,
      removePostDone: false,
      removePostError: null,
      loadPostsLoading: false,
      loadPostsDone: false,
      loadPostsError: null,
      loadPostLoading: false,
      loadPostDone: false,
      loadPostError: null,
      uploadImageLoading: false,
      uploadImageDone: false,
      uploadImageError: null,
      retweetLoading: false,
      retweetDone: false,
      retweetError: null,
      hasMorePosts:true,
}

// types
export const RETWEET_REQUEST = 'retweet_request'
export const RETWEET_SUCCESS = 'retweet_success'
export const RETWEET_FAILURE = 'retweet_failure'

export const UPLOAD_IMAGE_REQUEST = 'upload_image_request'
export const UPLOAD_IMAGE_SUCCESS = 'upload_image_success'
export const UPLOAD_IMAGE_FAILURE = 'upload_image_failure'

export const LIKE_POST_REQUEST = 'like_post_request'
export const LIKE_POST_SUCCESS = 'like_post_success'
export const LIKE_POST_FAILURE = 'like_post_failure'

export const UNLIKE_POST_REQUEST = 'unlike_post_request'
export const UNLIKE_POST_SUCCESS = 'unlike_post_success'
export const UNLIKE_POST_FAILURE = 'unlike_post_failure'

export const LOAD_POSTS_REQUEST = 'load_posts_request'
export const LOAD_POSTS_SUCCESS = 'load_posts_success'
export const LOAD_POSTS_FAILURE = 'load_posts_failure'

export const LOAD_USER_POSTS_REQUEST = 'load_user_posts_request'
export const LOAD_USER_POSTS_SUCCESS = 'load_user_posts_success'
export const LOAD_USER_POSTS_FAILURE = 'load_user_posts_failure'

export const LOAD_HASHTAG_POSTS_REQUEST = 'load_hashtag_posts_request'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'load_hashtag_posts_success'
export const LOAD_HASHTAG_POSTS_FAILURE = 'load_hashtag_posts_failure'

export const LOAD_POST_REQUEST = 'load_post_request'
export const LOAD_POST_SUCCESS = 'load_post_success'
export const LOAD_POST_FAILURE = 'load_post_failure'

export const ADD_POST_REQUEST = 'add_post_request'
export const ADD_POST_SUCCESS = 'add_post_success'
export const ADD_POST_FAILURE = 'add_post_failure'

export const ADD_COMMENT_REQUEST = 'add_comment_request'
export const ADD_COMMENT_SUCCESS = 'add_comment_success'
export const ADD_COMMENT_FAILURE = 'add_comment_failure'

export const REMOVE_POST_REQUEST = 'remove_post_request'
export const REMOVE_POST_SUCCESS = 'remove_post_success'
export const REMOVE_POST_FAILURE = 'remove_post_failure'

export const REMOVE_IMAGE = 'remove_image'

// Actions
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
  });

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
  });

const reducer = (state = initialState, action ) => produce(state, (draft) => {
  switch (action.type) {
      case REMOVE_IMAGE : 
      draft.imagePaths = draft.imagePaths.filter((path,i) => i !== action.data)
        break
      case RETWEET_REQUEST : 
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = null;
        break
      case RETWEET_SUCCESS : {
      draft.retweetLoading = false;
      draft.retweetDone = true;
      draft.mainPosts.unshift(action.data)
        break
    }
      case RETWEET_FAILURE : 
      draft.retweetLoading = false;
      draft.retweetError = action.error;
        break
      case UPLOAD_IMAGE_REQUEST : 
      draft.uploadImageLoading = true;
      draft.uploadImageDone = false;
      draft.uploadImageError = null;
        break
      case UPLOAD_IMAGE_SUCCESS : {
      draft.imagePaths = action.data;
      draft.uploadImageLoading = false;
      draft.uploadImageDone = true;
        break
    }
      case UPLOAD_IMAGE_FAILURE : 
      draft.uploadImageLoading = false;
      draft.uploadImageError = action.error;
        break
      case LIKE_POST_REQUEST : 
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
        break
      case LIKE_POST_SUCCESS : {
      const post = draft.mainPosts.find(item => item.id === action.data.PostId)
      post.Likers.push({ id: action.data.UserId})
      draft.likePostLoading = false;
      draft.likePostDone = true;
        break
    }
      case LIKE_POST_FAILURE : 
      draft.likePostLoading = false;
      draft.likePostError = action.error;
        break
      case UNLIKE_POST_REQUEST : 
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
        break
      case UNLIKE_POST_SUCCESS : {
      const post = draft.mainPosts.find(item => item.id === action.data.PostId)
      post.Likers = post.Likers.filter(item => item.id !== action.data.UserId)
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
        break
    }
      case UNLIKE_POST_FAILURE : 
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
        break
      case ADD_POST_REQUEST : 
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
        break
      case ADD_POST_SUCCESS : 
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      draft.imagePaths = [];
        break
      case ADD_POST_FAILURE : 
      draft.addPostLoading = false;
      draft.addPostError = action.error;
        break
      case ADD_COMMENT_REQUEST : 
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
        break
      case ADD_COMMENT_SUCCESS : 
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
        break
      case ADD_COMMENT_FAILURE :       
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
        break
      case REMOVE_POST_REQUEST : 
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null
        break
      case REMOVE_POST_SUCCESS : 
      draft.mainPosts = draft.mainPosts.filter(post => post.id !== action.data.PostId ),
      draft.removePostLoading = false;
      draft.removePostDone = true;
        break
      case REMOVE_POST_FAILURE : 
      draft.removePostLoading = false;
      draft.removePostError = action.error;
        break
      case LOAD_POSTS_REQUEST : 
      case LOAD_USER_POSTS_REQUEST : 
      case LOAD_HASHTAG_POSTS_REQUEST : 
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null
        break
      case LOAD_POSTS_SUCCESS :
        case LOAD_USER_POSTS_SUCCESS : 
        case LOAD_HASHTAG_POSTS_SUCCESS :  
      draft.mainPosts = draft.mainPosts.concat(action.data)
      draft.hasMorePosts= action.data.length === 10
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
        break
      case LOAD_POSTS_FAILURE :
        case LOAD_USER_POSTS_FAILURE : 
        case LOAD_HASHTAG_POSTS_FAILURE :  
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
        break;
      case LOAD_POST_REQUEST : 
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null
        break
      case LOAD_POST_SUCCESS : 
      draft.singlePost = action.data
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
        break
      case LOAD_POST_FAILURE : 
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
        break;
      default: 
        break;
  }
}) 


export default reducer;