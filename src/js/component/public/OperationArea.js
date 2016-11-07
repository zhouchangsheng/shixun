/**
 * Created by jerry on 2016/9/20.
 */
import React from 'react';
import {Row} from 'antd';
//import Row from 'antd/lib/row';

/**
 * 操作区
 * param: props.children 子组件
 * */
class OperationArea extends React.Component{
    render(){
        return(
            <Row>
                {this.props.children}
            </Row>
        )
    }
}

export default OperationArea;