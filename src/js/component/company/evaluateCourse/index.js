/**
 * Created by jerry on 2016/9/8.
 */
import React from 'react';

import {Button,Table,Row,Col,InputNumber,Modal} from 'antd';



import CourseListSelect from '../CourseListSelect';


const columnsOfTaskList = [{
    title:'任务名',
    dataIndex:'name',
    key:'name'
},{
    title:'成果说明',
    dataIndex:'resultMemo',
    key:'resultMemo'
},{
    title:'成果附件',
    dataIndex:'resultURL',
    render:(text,record)=>{
        if(record.content){
            return <a href={record.content} target="_blank">附件</a>
        }else{
            return <span>无</span>
        }
    }
}];

class EvaluateCourse extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            //selectedRowKeys: [],  // 这里配置默认勾选列
            companyScore:0,
            courseId:null,
            studentId:null,
            taskListModalVisible:false,
            taskListModalTitle:null
        };

        this.submitStudentScoreModified = this.submitStudentScoreModified.bind(this);
        this.setAddCourseTaskButtonNormalAndSaveCourseIdToState = this.setAddCourseTaskButtonNormalAndSaveCourseIdToState.bind(this);
        //this.rowSelectChange = this.rowSelectChange.bind(this);
        this.scoreChange = this.scoreChange.bind(this);
        this.showCourseTaskModalOfSingleStudent = this.showCourseTaskModalOfSingleStudent.bind(this);
        this.closeTaskListModalVisible = this.closeTaskListModalVisible.bind(this);
    }

    setAddCourseTaskButtonNormalAndSaveCourseIdToState(value){
        this.setState({courseId:value});
    }

    submitStudentScoreModified() {
        const {saveStudentScoreEvaluatedByActorFunc} =this.props;

        var updateScoreData={
            score:this.state.companyScore+"",
            courseId:this.state.courseId,
            studentId:this.state.studentId
        };

        saveStudentScoreEvaluatedByActorFunc?saveStudentScoreEvaluatedByActorFunc(updateScoreData):'';
        //this.setState({selectedRowKeys:[]});
    }



    showCourseTaskModalOfSingleStudent(e){
        /**
         * warning antd按钮Button点击事件中 e.target 会有两种结果
         * 一是button中的<span>text</span>
         * 二是button自身
         * */
        let studentId = e.target.getAttribute('data-student-id')||e.target.parentNode.getAttribute('data-student-id');
        let courseId = e.target.getAttribute('data-course-id')||e.target.parentNode.getAttribute('data-course-id');
        let courseName=e.target.getAttribute('data-course-name')||e.target.parentNode.getAttribute('data-course-name');
        let companyScore=e.target.getAttribute('data-company-score')||e.target.parentNode.getAttribute('data-company-score');

        const {getCourseTaskListOfSingleStudentByActorFunc} = this.props;
        getCourseTaskListOfSingleStudentByActorFunc?getCourseTaskListOfSingleStudentByActorFunc(studentId,courseId):'';

        this.setState({taskListModalVisible:true,taskListModalTitle:courseName,studentId:studentId,companyScore:companyScore});
    }

    closeTaskListModalVisible(){
        this.setState({taskListModalVisible:false});
    }

    scoreChange(value){
        this.setState({companyScore:value});
    }


    render() {
        const columnsOfStudentScore = [{
            title: '课程名',
            dataIndex: 'courseName',
        }, {
            title: '学号',
            dataIndex: 'studentId',
        },{
            title: '姓名',
            dataIndex: 'studentName',
        }, {
            title: '分数',
            dataIndex: 'companyScore',

        }, {
            title: '成果详情',
            dataIndex: 'taskDetail',
            render: (text, record)=>(
                <Button
                    type="ghost"
                    data-course-id={record.courseId}
                    data-course-name={record.courseName}
                    data-company-score = {record.companyScore}
                    data-student-id={record.studentId}
                    onClick={this.showCourseTaskModalOfSingleStudent}
                >评估</Button>
            )
        }];



        const {
            courseRelatedWithActor,
            getStudentScoreRelatedWithCourseAndActorFunc,
            studentScoreRelatedWithCourseAndActor,
            courseTaskListOfSingleStudentByActor
        } = this.props;


        return (
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>课程评分</h2></Row>
                <Row className="markdown"><h3>选择课程</h3></Row>
                <CourseListSelect
                    courseRelatedWithActor={courseRelatedWithActor}
                    getStudentScoreRelatedWithCourseAndActorFunc={getStudentScoreRelatedWithCourseAndActorFunc}
                    setAddCourseTaskButtonNormalAndSaveCourseIdToState={this.setAddCourseTaskButtonNormalAndSaveCourseIdToState}
                    style={{marginTop:0}}
                />
                <Row className="markdown"><h3>成绩评分</h3></Row>

                <Table   columns={columnsOfStudentScore} dataSource={studentScoreRelatedWithCourseAndActor}/>
                <Modal
                    title={<h4 style={{textAlign:'center'}}>课程名：{this.state.taskListModalTitle}</h4>}
                    visible={this.state.taskListModalVisible}
                    closable={false}
                    footer={<Button type="primary" onClick={this.closeTaskListModalVisible}>关闭</Button>}
                >
                    <Table
                        pagination={false}
                        scroll={{ y: 240 }}
                        columns={columnsOfTaskList}
                        dataSource={courseTaskListOfSingleStudentByActor}
                        rowKey={record=>record.id}
                    />
                    <Row style={{marginTop:"20px"}} type="flex"  align="middle">
                        <label style={{marginRight:"15px",fontSize:"13px",fontWeight:"700"}}>评分</label>
                        <InputNumber style={{marginRight:"15px"}} onChange={this.scoreChange} value={this.state.companyScore} />
                        <Button type="primary" onClick={this.submitStudentScoreModified}>确定</Button>
                    </Row>
                </Modal>
            </Row>
        );
    }
}


export default EvaluateCourse;