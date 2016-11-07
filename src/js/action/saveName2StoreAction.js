/**
 * Created by jerry on 2016/9/17.
 */
/**
 * 获取用户名
 * */
export const SAVE_NAME2STORE='SAVE_NAME2STORE';

import Cookie from 'react-cookie';
function saveName2Store(name){
    return{
        type:SAVE_NAME2STORE,
        text:name,
    }
}

export function saveName2StoreAction(){
    return (dispatch,getState)=>{
        let uid = Cookie.load('uid');
        if(uid==undefined||uid==""){
            dispatch(saveName2Store("anonymous"))
        }else{
            dispatch(saveName2Store(uid))
        }
    }
}