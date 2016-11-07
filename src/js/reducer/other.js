/**
 * Created by jerry on 2016/9/16.
 */
import {
    REQUEST_LOADING,
    REQUEST_SUCCESS_VALIDATED,
    REQUEST_SUCCESS_INVALIDATED,
    REQUEST_FAIL_TIMEOUT,
    REQUEST_FAIL_NET
} from '../action/public/sign/index';

const SIGN="SIGN";

/**
 * 使用redux的combineReducers方法将所有reducer打包起来
 * */
const rootReducer = (state,action)=> {
    switch (action.type) {
        case SIGN:
            return {name: action.text.name, actor: action.text.actor};
        case REQUEST_SUCCESS_VALIDATED:
            return Object.assign({}, state, {text: action.text, symbol: action.symbol});
        case REQUEST_SUCCESS_INVALIDATED:
            return Object.assign({}, state, {text: action.text, symbol: action.symbol});
        case REQUEST_FAIL_TIMEOUT:
            return Object.assign({}, state, {text: action.text, symbol: action.symbol});
        case REQUEST_FAIL_NET:
            return Object.assign({}, state, {text: action.text, symbol: action.symbol});
        default :
            return state;
    }
};
export default rootReducer;