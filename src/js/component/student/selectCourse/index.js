/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Row,Col,Button,Table} from 'antd';
/*
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';*/

import CourseSelectFilter from './CourseSelectFilter';

const columnsOfSelectCourse=[{
    title:"名称",
    dataIndex:'name',
    key:'name',
},{
    title:"教师",
    dataIndex:'teacherName',
    key:'teacherName',
},{
    title:"公司",
    dataIndex:"company",
    key:"company"
},{
    title:"备注",
    dataIndex:"memo",
    key:"memo"
},{
    title:"附件",
    dataIndex:'addition',
    key:'addition',
    render:(text,record)=>(
        <a title="点击下载" target="_blank" href={record.addition}>下载</a>
    )

}];

const columnsOfSelectedCourse=[{
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
}];

let removeCourseData=[];
let submitCourseData=[];

class SelectCourse extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeysOfSelect:[],
            selectedRowKeysOfSelected:[],
        };

        this.onSelectChangeOfSelect = this.onSelectChangeOfSelect.bind(this);
        this.onSelectChangeOfSelected = this.onSelectChangeOfSelected.bind(this);
        this.removeCourseSelected = this.removeCourseSelected.bind(this);
        this.submitSelectCourse = this.submitSelectCourse.bind(this);
    }


    onSelectChangeOfSelect(selectedRowKeys,selectedRows){
        //const {username} = this.props;
        this.setState({selectedRowKeysOfSelect:[]});
        this.setState({selectedRowKeysOfSelect:selectedRowKeys});
        submitCourseData=[];
        selectedRowKeys.map((item)=>{
            submitCourseData.push(item)
        });
    }

    onSelectChangeOfSelected(selectedRowKeys,selectedRows){
        this.setState({selectedRowKeysOfSelected:[]});
        this.setState({selectedRowKeysOfSelected:selectedRowKeys});
        removeCourseData=[];
        selectedRowKeys.map((item)=>{
            removeCourseData.push(item)
        });
    }

    submitSelectCourse(){
        const {submitSelectCourseFunc} = this.props;
        submitSelectCourseFunc?submitSelectCourseFunc(submitCourseData):'';
        this.setState({selectedRowKeysOfSelect:[]});
    }

    removeCourseSelected(){
        const {removeCourseSelectedFunc} =this.props;
        removeCourseSelectedFunc?removeCourseSelectedFunc(removeCourseData):'';
        this.setState({selectedRowKeysOfSelected:[]});
    }

    render(){
        const {
            courseRelatedWithActor,
            courseSelected,
            getCourseRelatedWithActorFunc
        } = this.props;

        const {selectedRowKeysOfSelect } = this.state;
        const rowSelectionOfSelect = {
            selectedRowKeys:selectedRowKeysOfSelect,
            onChange: this.onSelectChangeOfSelect,
        };
        const hasSelectedOfSelect = selectedRowKeysOfSelect.length > 0;

        const {selectedRowKeysOfSelected } = this.state;
        const rowSelectionOfSelected = {
            selectedRowKeys:selectedRowKeysOfSelected,
            onChange: this.onSelectChangeOfSelected,
        };
        const hasSelectedOfSelected = selectedRowKeysOfSelected.length > 0;

        return(
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>选择课程</h2></Row>

                <Row className="markdown"><h3>筛选课程</h3></Row>
                <CourseSelectFilter
                    style={{marginTop:0}}
                    getCourseRelatedWithActorFunc={getCourseRelatedWithActorFunc}
                />

                <Row className="markdown"><h3>可选课程</h3></Row>
                <Row style={{marginTop:5,marginBottom:5}}>
                    <Col >
                        <Button type="primary" onClick={this.submitSelectCourse}
                                disabled={!hasSelectedOfSelect}
                                data-id="hh">提交</Button>
                        <span style={{ marginLeft: 8 }}>{hasSelectedOfSelect ? `选择了 ${selectedRowKeysOfSelect.length} 个课程` : ''}</span>
                    </Col>

                </Row>
                <Table
                    rowKey={record=>record.id}
                    rowSelection={rowSelectionOfSelect}
                    columns={columnsOfSelectCourse}
                    dataSource={courseRelatedWithActor}
                />

                <Row className="markdown"><h3>已选课程</h3></Row>
                <Row style={{marginTop:10,marginBottom:5}} type="flex" justify="start" align="middle">
                    <Col lg={{span:22}} md={{span:21}} sm={{span:20}} xs={{span:19}}>
                        <Button type="primary" onClick={this.removeCourseSelected}
                                disabled={!hasSelectedOfSelected}
                        >删除</Button>
                        <span style={{ marginLeft: 8 }}>{hasSelectedOfSelected ? `选择了 ${selectedRowKeysOfSelected.length} 个对象` : ''}</span>
                    </Col>

                </Row>
                <Table
                    rowSelection={rowSelectionOfSelected}
                    columns={columnsOfSelectedCourse}
                    rowKey={record=>record.id}
                    dataSource={courseSelected}
                />


            </Row>
        )
    }
}

export default SelectCourse;