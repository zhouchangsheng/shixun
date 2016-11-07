/**
 * Created by jerry on 2016/9/19.
 */
import React from 'react';
import {Row} from 'antd';
//import Row from 'antd/lib/row';

class UploadFile extends React.Component{
    render(){

        return(
            <Row type="flex" justify="left" align="middle" style={{paddingTop:20,paddingBottom:20}}>
                <Col lg={{span:4}} xs={{span:10}} sm={{span:5}} md={{span:4}}>
                    <Upload {...props} >
                        <Button type="ghost">
                            <Icon type="upload"/>文件导入
                        </Button>
                    </Upload>
                </Col>
                <Col lg={{span:20}} xs={{span:14}} sm={{span:19}} md={{span:20}}>
                    {this.props.tips}
                </Col>
            </Row>
        )
    }
}