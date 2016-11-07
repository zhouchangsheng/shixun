/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Modal,Row,Button} from 'antd';
/*
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';*/


/**
 * 单组件触发模态框，该组件触发器trigger样式可通过props设置
 * param: props.triggerType 该参数(触发类型)只支持 a或button即超链或按钮样式，默认为超链样式
 * param: props.triggerClassName  该参数设置 trigger的class，默认为空
 * param: props.triggerText 该参数设置trigger中的文本，默认为空
 * param: props.modalTitle 该参数设置模态框标题，参数类型可以是React.Element或字符串，默认为空
 * param：props.closable 该参数设置模态框是否显示右上角的关闭按钮,默认显示
 * param：props.cancelText 该参数设置模态框关闭按钮文字
 * param: props.style 该参数主要用来设置模态框离顶部距离,例如style={{top:25}}，默认为空，居中显示
 * param: props.disabled 该参数用来设置触发器trigger是否禁用 默认为false
 * param: props.children  子组件
 * */

class SimpleTriggerModal extends React.Component{
    constructor(){
        super();
        this.state= {
            visible: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal(){
        this.setState({visible:true});
    }

    closeModal(){
        this.setState({visible:false})
    }


    render(){
        let trigger='';
        let disabled =this.props.disabled==undefined?false:this.props.disabled?true:false;
        let triggerText = this.props.triggerText==undefined?"trigger":this.props.triggerText;
        let triggerClassName = this.props.triggerClassName!=undefined?this.props.triggerClassName.trim():undefined;
        if(this.props.triggerType=="button"){
            trigger=<Button type="ghost" disabled={disabled} className={(triggerClassName!=''&&triggerClassName!=undefined)?triggerClassName:null} onClick={this.showModal}>{triggerText}</Button>;
        }else if(this.props.triggerType==undefined||this.props.triggerType=='a'){
            trigger=<a  disabled={disabled} className={(triggerClassName!=''&&triggerClassName!=undefined)?triggerClassName:null} onClick={this.showModal}>{triggerText}</a>;
        }

        return(

            <Row >
                {
                    trigger
                }
                <Modal
                    visible={this.state.visible}
                    wrapClassName={"vertical-center-modal"}
                    onCancel={this.closeModal}
                    title={this.props.modalTitle}
                    closable={this.props.closable==undefined?true:this.props.closable}
                    footer={<Button type="ghost" onClick={this.closeModal}>{this.props.cancelText||'关闭'}</Button>}
                    style={this.props.style==undefined?null:this.props.style}
                >
                    {
                        this.props.children
                    }
                </Modal>
            </Row>
        )
    }
}

export default SimpleTriggerModal;