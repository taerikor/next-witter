import { createWrapper } from 'next-redux-wrapper'
import { compose, createStore,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '../reducer'
const configureStore = () => {
    const middleware = []
    const enhancer = process.env.NODE_ENV === 'production' 
    ? compose( applyMiddleware(...middleware))
    : composeWithDevTools(
        applyMiddleware(...middleware)
      )
    const store = createStore(reducer,enhancer);
    return store
}
const Wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default Wrapper