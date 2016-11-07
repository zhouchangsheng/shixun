/**
 * Created by jerry on 2016/9/20.
 */
import React from 'react';
import {Row} from 'antd';
//import Row from 'antd/lib/row';

/**
 * 菜单
 * param: props.children 子组件
 * */
class MenuItem extends React.Component{
    render(){
        return(
            <Row>
                {this.props.children}
            </Row>
        )
    }
}

export default MenuItem;