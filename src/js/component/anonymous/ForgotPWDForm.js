/**
 * Created by jerry on 2016/9/18.
 */
/**
 * 用户登陆组件
 * */
import {connect} from 'react-redux';
import React from 'react';

import {Form,Select,Input,Modal} from 'antd';
/*
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
*/

const FormItem  = Form.Item;
const Option = Select.Option;
const selectData =[{key:"1",name:"管理员"},{key:"2",name:"企业"},{key:"3",name:"教师"},{key:"4",name:"学生"}];
let Api = require('../../middleware/api');

/**
 * 忘记密码表单
 * */
let varForgotPWDForm =React.createClass({
    sumbitHandler(e){
        e.preventDefault();
        var form =this.props.form.getFieldsValue();
        var actor = form.actor;
        var username = form.username;
        var password = form.password;

        var judgeFirst = (actor==undefined||username==undefined||password==undefined);
        var judgeSecond = (actor==''||username==''||password=='');

        if(judgeFirst||judgeSecond){
            var actorInfo = (actor==undefined||actor=='')? "身份 ":"";
            var usernameInfo = (username==undefined||username=='')?"账号 ":"";
            var passwordInfo = (password ==undefined||password=='')?"密码 ":"";
            Modal.info({
                title: '提示信息',
                content: actorInfo+usernameInfo+passwordInfo+'不能为空',
            });
            return;
        }
    },


    render(){
        const {getFieldProps}  = this.props.form;
        return (
            <Form horizontal style={{padding:20,borderLeft:"1px solid #e9e9e9"}} >

                <FormItem
                    labelCol={{span:6}}
                    wrapperCol={{span:6}}
                    label="身份"
                    id="control-actor"
                >
                    <Select
                        size="large"
                        placeholder="请选择"
                        {...getFieldProps('actor')}
                    >
                        {
                            selectData.map(function(item){
                                return(
                                    <Option key={item.key} value={item.key}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </FormItem>

                <FormItem
                    wrapperCol={{span:14}}
                    labelCol={{span:6}}
                    label="账号"
                    id="control-username"
                >
                    <Input type="text"  {...getFieldProps('username')} size="large" placeholder="请输入账号"/>

                </FormItem>

            </Form>
        )
    }
});


const ForgotPWDForm = Form.create()(varForgotPWDForm);

export default ForgotPWDForm;

