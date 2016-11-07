/**
 * Created by jerry on 2016/9/16.
 */
import {combineReducers} from 'redux';
import adminReducer from './adminReducer';
import teacherReducer from './teacherReducer';
import username from './username';
import publicReducer from './publicReducer';
import studentReducer from './studentReducer';
/**
 * 使用redux的combineReducers方法将所有reducer打包起来
 * */
const rootReducer = combineReducers({
    username:username,
    adminReducer:adminReducer,
    teacherReducer:teacherReducer,
    publicReducer:publicReducer,
    studentReducer:studentReducer
});
export default rootReducer;