/**
 * Created by jerry on 2016/9/18.
 */
/**
 * 登录action
 * */
const SIGN='SIGN';

function sign(data){
    return{
        type:SIGN,
        text:data,
    }
}

/**
 * 对验证返回处理
 * */
export function signAction(status,name,actor){
    let data;
    return (dispatch,getState) =>{
        if(status=='success'){
            data={name:name,actor:actor};
            dispatch(sign(data));
        }
    }

}