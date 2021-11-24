import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from './actionTypes';
import shortid from 'shortid'
import produce from "immer"

const initialState = {
    mainPosts: [],
      imagePaths: [],
      postAdded: false,
      addPostLoading: false,
      addPostDone: false,
      addPostError: null,
      removePostLoading: false,
      removePostDone: false,
      removePostError: null,
      addCommentLoading: false,
      addCommentDone: false,
      addCommentError: null,
      loadPostLoading: false,
      loadPostDone: false,
      loadPostError: null,
      hasMorePosts: true,
}
export const generateDummyPost = (number) => Array(number).fill(2).map(() => ({
    id: shortid.generate(),
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글 #hashtag #해시태그#hash',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  }))

const dummyPost = (data) => ({
    id: shortid.generate(),
    content: data,
    User: {
      id: 1,
      nickname: '제로초',
    },
    Images: [],
    Comments: [],
  })

const dummyComment = (data) => ({
    id: shortid.generate(),
    content: data.comment,
    User: {
      id: data.userId,
      nickname: '제로초',
    },
  })


  export const addPostReqAction = (data) => {
      return {
          type: ADD_POST_REQUEST,
          data

      }
  }
  export const removePostReqAction = (data) => {
      return {
          type: REMOVE_POST_REQUEST,
          data

      }
  }
  export const addCommentReqAction = (data) => {
      return {
          type: ADD_COMMENT_REQUEST,
          data

      }
  }

const reducer = (state=initialState, action) => {
  return produce(state, (draft) => {
    switch(action.type){
      case LOAD_POST_REQUEST :
        draft.loadPostLoading=true;
        draft.loadPostError=null;
        draft.loadPostDone=false;
        break;
      case LOAD_POST_SUCCESS :
        draft.loadPostLoading=false
        draft.loadPostDone=true;
        draft.mainPosts = action.data.concat(draft.mainPosts)
        draft.hasMorePosts = draft.mainPosts.length < 50
        break;
      case LOAD_POST_FAILURE :
        draft.loadPostLoading=false;
        draft.loadPostError=action.error;
        break;
      case ADD_POST_REQUEST :
        draft.addPostLoading=true;
        draft.addPostError=null;
        draft.addPostDone=false;
        break;
      case ADD_POST_SUCCESS :
        draft.addPostLoading=false
        draft.addPostDone=true;
        draft.mainPosts.unshift(dummyPost(action.data))
        break;
      case ADD_POST_FAILURE :
        draft.addPostLoading=false;
        draft.addPostError=action.error;
        break;
      case REMOVE_POST_REQUEST :
        draft.removePostLoading=true;
        draft.removePostError=null;
        draft.removePostDone=false;
        break;
      case REMOVE_POST_SUCCESS :
              draft.mainPosts = state.mainPosts.filter((post) => post.id !== action.data);
              draft.removePostLoading=false;
              draft.removePostDone= true;
          break
      case REMOVE_POST_FAILURE :
        draft.removePostLoading=false;
        draft.removePostError=action.error;
        break;
      case ADD_COMMENT_REQUEST :
        draft.addCommentLoading=true;
        draft.addCommentError=null;
        draft.addCommentDone=false;
        break;
      case ADD_COMMENT_SUCCESS :
          const post = draft.mainPosts.find(post => post.id === action.data.postId)
          post.Comments.unshift(dummyComment(action.data))

          draft.addCommentLoading=false;
          draft.addCommentError=action.error;
          break;
      case ADD_COMMENT_FAILURE :
        draft.addCommentLoading=false;
        draft.addCommentError=action.error;
        break
      default: return state;
  }
  })
    
}

export type IPostState = ReturnType<typeof reducer>;
export default reducer;