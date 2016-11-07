/**
 * Created by jerry on 2016/9/17.
 */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import rootReducer from '../reducer/index';

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleWare)
    )
}
