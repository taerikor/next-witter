import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'

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
      hasMorePosts:true,
}

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data ,
    User: {
      id: 1,
      nickname: '제로초',
    },
  });

  export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      src: faker.image.image(),
    }],
    Comments: [{
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
  }));

// types
export const LIKE_POST_REQUEST = 'like_post_request'
export const LIKE_POST_SUCCESS = 'like_post_success'
export const LIKE_POST_FAILURE = 'like_post_failure'

export const UNLIKE_POST_REQUEST = 'unlike_post_request'
export const UNLIKE_POST_SUCCESS = 'unlike_post_success'
export const UNLIKE_POST_FAILURE = 'unlike_post_failure'

export const LOAD_POSTS_REQUEST = 'load_posts_request'
export const LOAD_POSTS_SUCCESS = 'load_posts_success'
export const LOAD_POSTS_FAILURE = 'load_posts_failure'

export const ADD_POST_REQUEST = 'add_post_request'
export const ADD_POST_SUCCESS = 'add_post_success'
export const ADD_POST_FAILURE = 'add_post_failure'

export const ADD_COMMENT_REQUEST = 'add_comment_request'
export const ADD_COMMENT_SUCCESS = 'add_comment_success'
export const ADD_COMMENT_FAILURE = 'add_comment_failure'

export const REMOVE_POST_REQUEST = 'remove_post_request'
export const REMOVE_POST_SUCCESS = 'remove_post_success'
export const REMOVE_POST_FAILURE = 'remove_post_failure'

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
      case LIKE_POST_REQUEST : 
              draft.likePostLoading = true;
              draft.likePostDone = false;
              draft.likePostError = null;
              break
      case LIKE_POST_SUCCESS :{
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
      draft.mainPosts.unshift(action.data)
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
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null
      break
      case LOAD_POSTS_SUCCESS : 
             draft.mainPosts = action.data.concat(draft.mainPosts)
             draft.hasMorePosts= draft.mainPosts.length < 50
             draft.loadPostsLoading = false;
             draft.loadPostsDone = true;
             break
      case LOAD_POSTS_FAILURE : 
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
      default: 
          break;
  }
}) 


export default reducer;