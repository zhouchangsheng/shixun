/**
 * Created by jerry on 2016/9/7.
 */
import React from 'react';
import {Row,Col,Icon} from 'antd';

import {connect} from 'react-redux';

/**
 * 该组件是页面的头部
 * param: props.children 子组件
 * */
class ActorHeader extends React.Component{
    render(){
        let {name,actor} = this.props.username;
        let actorTitle= actor==1?'管理员':actor==3?'教师':actor==2?'企业':actor==4?'学生':'匿名用户';

        return(
            <Row type="flex" justify="center" align="middle" style={{height:60,backgroundColor:'white'}}>
                <Col  lg={{span:5}} md={{span:4}} sm={{span:7}} xs={{span:10}}>
                    <Icon type="user" style={{fontSize:"1.2rem",fontWeight:600}}/><span style={{paddingLeft:5,paddingRight:5}}>{actorTitle+" "+name}</span>
                </Col>
                <Col lg={{span:17}} md={{span:20}} sm={{span:17}} xs={{span:14}} >
                    <Row type="flex" justify="end" align="middle">
                        {
                            this.props.children
                        }
                    </Row>
                </Col>
            </Row>

        )
    }
}


function mapStateToProps(state){
    return{
        username:state.username,
    }
}



export default connect(mapStateToProps)(ActorHeader);