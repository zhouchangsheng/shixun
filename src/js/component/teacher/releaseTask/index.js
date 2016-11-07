/**
 * Created by jerry on 2016/9/7.
 */
import React from 'react';

import {Table,Row,Col} from 'antd';

import CourseListSelect from '../CourseListSelect';
import SimpleTriggerModal from '../../public/SimpleTriggerModal';
import AddCourseTaskForm from './AddCourseTaskForm';

const columns = [{
    title: '课程号',
    dataIndex: 'courseId',
}, {
    title: '任务名',
    dataIndex: 'name',
}, {
    title: '开始时间',
    dataIndex: 'startTime',
}, {
    title: '结束时间',
    dataIndex: 'endTime',
}];


class ReleaseTask extends React.Component{
    constructor() {
        super();

        this.state = {
            courseId:null,
            addCourseTaskButtonIsDisabled:true
        };

        this.setAddCourseTaskButtonNormalAndSaveCourseIdToState = this.setAddCourseTaskButtonNormalAndSaveCourseIdToState.bind(this);
    }

    setAddCourseTaskButtonNormalAndSaveCourseIdToState(value){
        this.setState({addCourseTaskButtonIsDisabled:false,courseId:value});
    }



    render() {
        const {
            courseRelatedWithActor,
            courseTaskReleased,
            getCourseTaskReleasedFunc,
            addCourseTaskWithFileFunc,
            releaseCourseTaskWithFileUrl
        } = this.props;

        return (
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>发布任务</h2></Row>
                <Row className="markdown"><h3>选择课程</h3></Row>
                <CourseListSelect
                    courseRelatedWithActor={courseRelatedWithActor}
                    setAddCourseTaskButtonNormalAndSaveCourseIdToState={this.setAddCourseTaskButtonNormalAndSaveCourseIdToState}
                    getCourseTaskReleasedFunc={getCourseTaskReleasedFunc}
                    style={{marginTop:0}}
                />
                <Row className="markdown"><h3>发布成功记录</h3></Row>
                <Row style={{paddingBottom:10}}>
                    <Col span={3} >
                        <SimpleTriggerModal
                            modalTitle={<h3 style={{textAlign:'center'}}>添加任务</h3>}
                            triggerType="button"
                            triggerText="添加任务"
                            closable ={false}
                            disabled={this.state.addCourseTaskButtonIsDisabled}>
                            <AddCourseTaskForm
                                courseId = {this.state.courseId}
                                addCourseTaskWithFileFunc ={addCourseTaskWithFileFunc}
                                releaseCourseTaskWithFileUrl={releaseCourseTaskWithFileUrl}
                            />
                        </SimpleTriggerModal>
                    </Col>

                </Row>

                <Table  columns={columns} dataSource={courseTaskReleased} />
            </Row>
        );
    }
}




export default ReleaseTask;