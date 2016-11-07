/**
 * Created by jerry on 2016/9/20.
 */
/**
 * 注销
 * */
const SIGN='SIGN';

function signOut(data){
    return{
        type:SIGN,
        text:data,
    }
}

/**
 * 对验证返回处理
 * */
export function signOutAction(){
    return (dispatch,getState) =>{
        let data={name:'anonymous',actor:''};
        dispatch(signOut(data));
    }

}