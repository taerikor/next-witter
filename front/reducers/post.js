

const  initialState = {
    mainPosts: [{
        id: 1,
        User: {
          id: 1,
          nickname: '제로초',
        },
        content: '첫 번째 게시글 #해시태그 #test #테스트',
        Images: [{
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        }, {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        }, 
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        }
    ],
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
      addPostLoading: false,
      addPostDone: false,
      addPostError: null,
      addCommentLoading: false,
      addCommentDone: false,
      addCommentError: null,
}

const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
      id: 1,
      nickname: '제로초',
    },
    Images: [],
    Comments: [],
  };

// types
export const ADD_POST_REQUEST = 'add_post_request'
export const ADD_POST_SUCCESS = 'add_post_success'
export const ADD_POST_FAILURE = 'add_post_failure'

export const ADD_COMMENT_REQUEST = 'add_comment_request'
export const ADD_COMMENT_SUCCESS = 'add_comment_success'
export const ADD_COMMENT_FAILURE = 'add_comment_failure'

// Actions
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
  });

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
  });

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case ADD_POST_REQUEST : {
            return {
                ...state,
                addPostLoading:true,
                addPostDone:false,
                addPostError:null,
            }
        }
        case ADD_POST_SUCCESS : {
            return {
                ...state,
                mainPosts:[dummyPost, ...state.mainPosts],
                addPostLoading:false,
                addPostDone:true
            }
        }
        case ADD_POST_FAILURE : {
            return {
                ...state,
                addPostLoading:false,
                addPostError: action.error
            }
        }
        case ADD_COMMENT_REQUEST : {
            return {
                ...state,
                addCommentLoading:true,
                addCommentDone:false,
                addCommentError:null,
            }
        }
        case ADD_COMMENT_SUCCESS : {
            return {
                ...state,
                // mainPosts:[dummyPost, ...state.mainPosts],
                addCommentLoading:false,
                addCommentDone:true
            }
        }
        case ADD_COMMENT_FAILURE : {
            return {
                ...state,
                addCommentLoading:false,
                addCommentError: action.error
            }
        }
        ldsf
        SVGAnimatedLengthList
        
        default: {
            return { ...state }
        }
    }
}

export default reducer;