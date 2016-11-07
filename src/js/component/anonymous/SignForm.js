/**
 * Created by jerry on 2016/9/18.
 */
/**
 * 用户登陆组件
 * */
import {connect} from 'react-redux';
import React from 'react';
import {Form,Select,Input,Button,Modal} from 'antd';



import {bindActionCreators} from 'redux';

const FormItem  = Form.Item;
const Option = Select.Option;
const selectData =[{key:"1",name:"管理员"},{key:"2",name:"企业"},{key:"3",name:"教师"},{key:"4",name:"学生"}];
let API = require('../../middleware/api');

/**
 * 登录表单
 * param:无
 * */
let SignForm =React.createClass({
    submitHandler(e){
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
        const {checkAccountAndSave2Store} = this.props;
        checkAccountAndSave2Store?checkAccountAndSave2Store(form):'';

    },


    render(){
        const {getFieldDecorator}  = this.props.form;
        return (
            <Form horizontal style={{padding:20}} >

                <FormItem
                    labelCol={{span:6}}
                    wrapperCol={{span:6}}
                    label="身份"
                    id="control-actor"
                >
                    {
                        getFieldDecorator("actor")(
                            <Select
                                size="large"
                                placeholder="请选择"
                            >
                                {
                                    selectData.map(function(item){
                                        return(
                                            <Option key={item.key} value={item.key}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )
                    }

                </FormItem>

                <FormItem
                    wrapperCol={{span:14}}
                    labelCol={{span:6}}
                    label="账号"
                    id="control-username"
                >
                    {
                        getFieldDecorator("username")(
                            <Input type="text"   size="large" placeholder="请输入账号"/>
                        )
                    }
                </FormItem>
                <FormItem

                    wrapperCol={{span:14}}
                    labelCol={{span:6}}
                    label="密码"
                    id="control-password"
                >
                    {
                        getFieldDecorator("password")(
                            <Input size="large" type="password"   placeholder="请输入密码"/>
                        )
                    }

                </FormItem>
                <FormItem wrapperCol={{ span: 16,offset:6}}
                >
                    <Button type="primary" htmlType="submit" onClick={this.submitHandler}>登录</Button>
                </FormItem>
            </Form>
        )
    }
});


SignForm = Form.create()(SignForm);
/**
 * 将action的所有方法绑定到props上
 */
function mapDispatchToProps(dispatch){
    return {
        checkAccountAndSave2Store:bindActionCreators(API.checkAccountAndSave2Store,dispatch)
    };
}


/**
 * 通过react-redux提供的connect 方法将我们需要的state中的数据和actions中的方法绑定到props上
 * */
export default connect (null,mapDispatchToProps)(SignForm);

