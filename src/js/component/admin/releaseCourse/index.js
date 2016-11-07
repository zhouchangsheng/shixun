/**
 * Created by jerry on 2016/9/9.
 */
import React from 'react';
import {Row,Col,Table,} from 'antd';
/*
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
*/
import ReleaseCourseForm from './ReleaseCourseForm';
import SimpleTriggerModal from '../../public/SimpleTriggerModal';

const columns=[{
    title:"课程名",
    dataIndex:'name',
    key:'name',
},{
    title:"供选专业",
    dataIndex:'profession',
    key:'profession',
},{
    title:"教师工号",
    dataIndex:"teacher",
    key:"teacher"
},{
    title:"公司",
    dataIndex:"company",
    key:"company"
},{
    title:"描述",
    dataIndex:"memo",
    key:"memo"
},{
    title:"附件",
    dataIndex:"addition",
    key:"addition",
    render: (text, record) => (
        <span>
            <a key={record.teacher} title="点击下载" href={record.addition} target="_blank">下载</a>
        </span>
    )
}];
class ReleaseCourse extends React.Component{
    constructor(){
        super();
    }


    render(){
        const {
            courseReleased,
            professionGot,
            teacherGot,
            companyGot,
            releaseCourseInfoWithFileFunc,
            releaseCourseInfoWithFileURL
        } = this.props;
        return(
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>发布课程</h2></Row>
                <Row type="flex" justify="left" align="middle" style={{paddingTop:20,paddingBottom:20}}>
                    <Col lg={{span:4}} xs={{span:6}} sm={{span:5}} md={{span:4}}>
                        <SimpleTriggerModal
                            modalTitle={<h3 style={{textAlign:'center'}}>发布课程</h3>}
                            triggerType="button"
                            triggerClassName="ghost"
                            triggerText="发布课程"
                            closable={false}
                            cancelText="关闭"
                        >
                            <ReleaseCourseForm
                                teacherGot = {teacherGot}
                                companyGot = {companyGot}
                                professionGot = {professionGot}
                                releaseCourseInfoWithFileFunc={releaseCourseInfoWithFileFunc}
                                releaseCourseInfoWithFileURL ={releaseCourseInfoWithFileURL}
                            />
                        </SimpleTriggerModal>
                    </Col>
                    <Col lg={{span:10}} xs={{span:17}} sm={{span:16}} md={{span:16}}>
                        <span><strong>注意：</strong>上传附件的文件类型只支持***.doc、****.docx、***.pdf</span>
                    </Col>
                </Row>
                <Row className="markdown"><h3>发布成功记录</h3></Row>
                <Table columns={columns} dataSource={courseReleased} />
            </Row>
        )
    }
}

export default ReleaseCourse;