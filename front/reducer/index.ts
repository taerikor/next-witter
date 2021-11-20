import { AnyAction, combineReducers } from 'redux'
import user, { IUserState } from './user'
import post, { IPostState } from './post'
import { HYDRATE } from 'next-redux-wrapper'

export interface IState {
    user: IUserState;
    post: IPostState;
}

const rootReducer = (state: IState| undefined, action:AnyAction): IState=>{
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        default: {
            const combineReducer = combineReducers({
                  post,
                  user,
                });
                return combineReducer(state, action);
              }

    }
}


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;