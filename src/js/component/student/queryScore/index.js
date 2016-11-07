/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Row,Button,Table} from 'antd';
/*
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';*/

const columnsOfQueryScore =[
    {
        title:"名称",
        dataIndex:'courseName',
        key:'courseName',
    },{
        title:"教师",
        dataIndex:'teacherName',
        key:'teacherName',
    },{
        title:"公司",
        dataIndex:"companyName",
        key:"companyName"
    },{
        title:'分数',
        dataIndex:'score',
        key:'score'
    }
];

class QueryScore extends React.Component{
    constructor(){
        super();
        this.getCourseScore = this.getCourseScore.bind(this);
    }
    getCourseScore(){
        const {getCourseScoreByStudentFunc} = this.props;
        getCourseScoreByStudentFunc?getCourseScoreByStudentFunc():'';
    }
    render(){
        const {courseScoreByStudent} = this.props;
        return(
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>成绩查询</h2></Row>
                <Row style={{marginTop:5,marginBottom:5}}>
                    <Button type="primary" onClick={this.getCourseScore}>查看</Button>
                </Row>
                <Table columns={columnsOfQueryScore} dataSource={courseScoreByStudent}/>
            </Row>
        )
    }
}

export default QueryScore;