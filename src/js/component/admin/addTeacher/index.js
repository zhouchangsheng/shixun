/**
 * Created by jerry on 2016/9/9.
 */
import React from 'react';
import {Row,Col,Button,Table,Upload,Icon,Message} from 'antd';


/**
 * 文件上传
 * */
let name= 'excelFile';
let data = {method:"insertTeacherByFile"};
let pattern = /(\.xlsx$)|(\.xls$)/;
let fileTypeTip = '只能上传.xls或.xlsx 文件哦！';

/**
 * Table表头
 * */
const columns=[{
    title:"工号",
    dataIndex:'workerId',
    key:'workerId',
},{
    title:"姓名",
    dataIndex:'name',
    key:'name',
},{
    title:"专业",
    dataIndex:"profession",
    key:"profession"
},{
    title:"学院",
    dataIndex:"depart",
    key:"depart"
}];



class AddTeacher extends React.Component{
    constructor(){
        super();
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(info){
        const {addTeacherViaFileFunc} = this.props;
        addTeacherViaFileFunc(info);
    }

    render(){
        const {uploadFileUrlOfAddTeacherURL,teacherAdded} = this.props;
        const props = {
            action: uploadFileUrlOfAddTeacherURL,
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
                <Row className="markdown"><h2>导入教师</h2></Row>
                <Row type="flex" justify="left" align="middle" style={{paddingTop:20,paddingBottom:20}}>
                    <Col lg={{span:4}} xs={{span:10}} sm={{span:5}} md={{span:4}}>
                        <Upload {...props} >
                            <Button type="ghost">
                                <Icon type="upload"/>文件导入
                            </Button>
                        </Upload>
                    </Col>
                    <Col lg={{span:8}} xs={{span:14}} sm={{span:16}} md={{span:16}}>
                        <span><strong>注意：</strong>文件的类型只支持***.xlsx或****.xls</span>
                    </Col>
                </Row>
                <Row className="markdown"><h3>导入成功记录</h3></Row>
                <Table  dataSource={teacherAdded} columns={columns} />
            </Row>
        )
    }
}

export default AddTeacher;