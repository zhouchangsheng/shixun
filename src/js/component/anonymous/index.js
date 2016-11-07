/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';

import {Row} from 'antd';


import ActorHeader from '../public/ActorHeader';
import ActorBody from '../public/ActorBody';
import SignForm from './SignForm';
import ForgotPWDForm from './ForgotPWDForm';
import SimpleTriggerModal from '../public/SimpleTriggerModal';

class Anonymous extends React.Component{
    constructor(){
        super();
    }

    render(){
        //console.log(this.props.history.pushState);
        return(
            <Row>
                <ActorHeader>
                    <SimpleTriggerModal
                        modalTitle={<h3 style={{textAlign:'center'}}>用户登录</h3>}
                        triggerType="a"
                        triggerClassName="navItem"
                        triggerText="登录"
                        closable={false}
                        cancelText="关闭"
                    >
                        <SignForm

                        />
                    </SimpleTriggerModal>
                    <SimpleTriggerModal
                        modalTitle={<h3 style={{textAlign:'center'}}>找回密码</h3>}
                        triggerType="a"
                        triggerClassName="navItem"
                        triggerText="忘记密码"
                        closable={false}
                        cancelText="关闭"
                    >
                        <ForgotPWDForm/>
                    </SimpleTriggerModal>
                </ActorHeader>
                <ActorBody>
                    <div style={{width:"100%",height:500,backgroundColor:'gray'}}>
                    </div>
                </ActorBody>
            </Row>

        )
    }
}


export default Anonymous;



