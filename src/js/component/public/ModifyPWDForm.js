/**
 * Created by jerry on 2016/9/19.
 */
import React from 'react';
import {Button,Form,Input,Row,Col} from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;
let Api = require("../../middleware/api");

function noop() {
    return false;
}


/**
 * 修改密码表单
 * param:无
 * */
let ModifyPWDForm = React.createClass({
    resetField(){
        this.props.form.resetFields();
    },

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePwd'], { force: true });
        }
        callback();
    },

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('pwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },



    submitClick(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            var dataForm={password:values.oriPwd,newPassword:values.pwd};
            Api.modifyPWD(dataForm);
            this.resetField();
        });
    },


    render() {
        const { getFieldProps } = this.props.form;

        const oriPwdProps = getFieldProps('oriPwd',{
            rules:[
                {required:true,whitespace:true,message:'请填写原始密码'}
            ]
        });

        const pwdProps = getFieldProps('pwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass },
            ],
        });
        const rePwdProps = getFieldProps('rePwd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2,
            }],
        });
        const formItemLayout = {
            labelCol: { span: 6,offset:2 },
            wrapperCol: { span: 10 },
        };
        return (
            <div>
                <Form horizontal >
                    <FormItem
                        {...formItemLayout}
                        label="原始密码"
                    >
                        <Input {...oriPwdProps} type="password"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                               autoComplete="off" id="oriPwd"
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新密码"
                    >
                        <Input {...pwdProps} type="password"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                               autoComplete="off" id="pwd"
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        <Input {...rePwdProps} type="password"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                               autoComplete="off" id="rePwd"
                        />
                    </FormItem>
                    <FormItem>
                        <Row type="flex" align="middle" justify="center" >
                            <Col span={4} offset={2}>
                                <Button type="primary" onClick={this.submitClick}>提交</Button>
                            </Col>
                            <Col span={4}>
                                <Button type="ghost" onClick={this.resetField}>重置</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
        );
    },
});

ModifyPWDForm = createForm()(ModifyPWDForm);

export default ModifyPWDForm;