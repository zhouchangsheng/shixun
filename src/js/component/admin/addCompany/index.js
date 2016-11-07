/**
 * Created by jerry on 2016/9/9.
 */
import React from 'react';

import {Row,Col,Button,Table,Upload,Icon,Message} from 'antd';


/**
 * Table表头
 * */
const columns=[{
    title:"企业",
    dataIndex:'name',
    key:'name',
},{
    title:"联系人",
    dataIndex:"contact",
    key:"contact"
},{
    title:"地址",
    dataIndex:"address",
    key:"address"
}];


/**
 * 文件上传
 * */
let name= 'excelFile';
let data = {method:"insertCompanyByFile"};
let pattern = /(\.xlsx$)|(\.xls$)/;
let fileTypeTip = '只能上传.xls或.xlsx 文件哦！';

class AddCompany extends React.Component{
    constructor(){
        super();
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(info){
        const {addCompanyViaFileFunc} = this.props;
        addCompanyViaFileFunc(info);
    }

    render(){
        const {uploadFileUrlOfAddCompanyURL,companyAdded} = this.props;
        const props = {
            action: uploadFileUrlOfAddCompanyURL,
            name:name,
            data:data,
            onChange:this.handleChange,
            showUploadList:false,
            beforeUpload(file) {
                const fileType = pattern.test(file.name);
                if (!fileType) {
                    Message.destroy();
                    Message.error(fileTypeTip,3);
                }
                return fileType;
            },
        };

        return(
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>导入公司</h2></Row>
                <Row type="flex" justify="left" align="middle" style={{paddingTop:20,paddingBottom:20}}>
                    <Col lg={{span:4}} xs={{span:10}} sm={{span:5}} md={{span:4}}>
                        <Upload {...props} >
                            <Button type="ghost">
                                <Icon type="upload"/>文件导入
                            </Button>
                        </Upload>
                    </Col>
                    <Col lg={{span:20}} xs={{span:14}} sm={{span:19}} md={{span:20}}>
                        <span><strong>注意：</strong>文件的类型只支持***.xlsx或****.xls</span>
                    </Col>
                </Row>
                <Row className="markdown"><h3>导入成功记录</h3></Row>
                <Table dataSource={companyAdded} columns={columns} />
            </Row>
        )
    }
}

export default AddCompany;