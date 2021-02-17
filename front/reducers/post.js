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
      postAdded: false,
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
const ADD_POST_REQUEST = 'add_post_request'
const ADD_POST_SUCCESS = 'add_post_success'
const ADD_POST_FAILURE = 'add_post_failure'

// Actions
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
  });

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case ADD_POST_REQUEST : {
            return {
                ...state,
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded:true
            }
        }
        case ADD_POST_SUCCESS : {
            return {
                ...state,
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded:true
            }
        }
        case ADD_POST_FAILURE : {
            return {
                ...state,
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded:true
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default reducer;