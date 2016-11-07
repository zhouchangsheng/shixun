/**
 * Created by jerry on 2016/9/18.
 */

/**
 * 获取用户名reducer
 * */

const SIGN = "SIGN";
const InitialState={name:'anonymous',actor:''};

export default (state=InitialState,action)=>{
    switch(action.type){
        case SIGN:
            return {name:action.text.name,actor:action.text.actor};
        default:
            return state;
    }
}