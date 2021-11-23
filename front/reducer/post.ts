import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from './actionTypes';
import shortid from 'shortid'

const initialState = {
    mainPosts: [{
        id: 1,
        User: {
          id: 1,
          nickname: '제로초',
        },
        content: '첫 번째 게시글 #hashtag #해시태그#hash',
        Images: [{
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        }, {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },{
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
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
      }],
      imagePaths: [],
      postAdded: false,
      addPostLoading: false,
      addPostDone: false,
      addPostError: null,
      addCommentLoading: false,
      addCommentDone: false,
      addCommentError: null,
      
}

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
  export const addCommentReqAction = (data) => {
      return {
          type: ADD_COMMENT_REQUEST,
          data

      }
  }

const reducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_POST_REQUEST :
            return {
                ...state,
                addPostLoading:true,
                addPostError: null,
                addPostDone: false,
            }
        case ADD_POST_SUCCESS :
            return {
                ...state,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
                addPostLoading:false,
                addPostDone: true,
            }
        case ADD_POST_FAILURE :
            return {
                ...state,
                addPostLoading:false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST :
            return {
                ...state,
                addCommentLoading:true,
                addCommentError: null,
                addCommentDone: false,
            }
        case ADD_COMMENT_SUCCESS :
            const postIndex = state.mainPosts.findIndex(post => post.id === action.data.postId)
            const post = {...state.mainPosts[postIndex]}
            post.Comments = [dummyComment(action.data),...post.Comments]
            const mainPosts = [...state.mainPosts]
            mainPosts[postIndex] = post
            return {
                ...state,
                mainPosts,
                addCommentLoading:false,
                addCommentDone: true,
            }
        case ADD_COMMENT_FAILURE :
            return {
                ...state,
                addCommentLoading:false,
                addCommentError: action.error,
            }
        default: return state;
    }
}

export type IPostState = ReturnType<typeof reducer>;
export default reducer;