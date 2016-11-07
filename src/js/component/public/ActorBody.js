/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Row} from 'antd';
//import Row from 'antd/lib/row';


/**
 * 该组件是页面的主体（最外层）
 * param: props.children子组件
 * */
class ActorBody extends React.Component{
    render(){
        return(
            <Row>
                {this.props.children}
            </Row>
        )
    }
}

export default ActorBody;
