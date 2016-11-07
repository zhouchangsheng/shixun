/**
 * Created by jerry on 2016/9/19.
 */
import React from 'react';
import {Button,Row,Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

let Api =require("../../middleware/api");


/**
 * 注销组件，该组件触发器trigger的样式通过props参数可设置
 * param: props.triggerType 该参数(触发类型)只支持 a或button即超链或按钮样式，默认为超链样式
 * param: props.triggerClassName  该参数设置 trigger的class，默认为空
 * param: props.triggerText 该参数设置trigger中的文本，默认为空
 * */
class SignOut extends React.Component{
    constructor(){
        super();
        this.confirm = this.confirm.bind(this);
    }
    confirm(){
        this.props.signOutFunc();
    }

    render(){
        let trigger='';
        let triggerClassName = this.props.triggerClassName!=undefined?this.props.triggerClassName.trim():undefined;
        if(this.props.triggerType=="button"){
            trigger=<Button className={(triggerClassName!=''&&triggerClassName!=undefined)?triggerClassName:null}  > {this.props.triggerText}</Button>;
        }else if(this.props.triggerType==undefined||this.props.triggerType=='a'){
            trigger=<a  className={(triggerClassName!=''&&triggerClassName!=undefined)?triggerClassName:null} >{this.props.triggerText}</a>;
        }

        return(
            <Row>
                <Popconfirm placement="bottomRight" title={"确定要注销吗？"} onConfirm={this.confirm}>
                    {trigger}
                </Popconfirm>
            </Row>
        )
    }
}

/*
*将action的所有方法绑定到props上
* */
function mapDispatchToProps(dispatch){
    return {
        signOutFunc:bindActionCreators(Api.signOut,dispatch)
    };
}


/**
 * 通过react-redux提供的connect 方法将我们需要的state中的数据和actions中的方法绑定到props上
 * */
export default connect(null,mapDispatchToProps)(SignOut);
