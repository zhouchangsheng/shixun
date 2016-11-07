/**
 * Created by jerry on 2016/9/7.
 */
import React from 'react';
import {Tabs,Row,Col} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cookie from 'react-cookie';

import ActorHeader from '../public/ActorHeader';
import ActorBody from '../public/ActorBody';
import SimpleTriggerModal from '../public/SimpleTriggerModal';
import ModifyPWDForm from '../public/ModifyPWDForm';
import SignOut from '../public/SignOut';
import MenuItem from '../public/MenuItem';
import OperationArea from '../public/OperationArea';
import ReleaseTask from './releaseTask/index';
import EvaluateCourse from './evaluateCourse/index';
import CourseSummary from '../public/CourseSummary';


const TabPane = Tabs.TabPane;

let API = require('../../middleware/api');
let releaseCourseTaskWithFileUrl =API.serviceURL;
let actor = Cookie.load('uactor');

class Teacher extends React.Component{
    componentDidMount(){
        const {getCourseRelatedWithActorFunc} = this.props;
        getCourseRelatedWithActorFunc();
    }
    render(){
        const {
            courseRelatedWithActor,
            courseTaskReleased,
            getCourseTaskReleasedFunc,
            addCourseTaskWithFileFunc
        } = this.props;

        const {
            studentScoreRelatedWithCourseAndActor,
            courseTaskListOfSingleStudentByActor,
            getCourseTaskListOfSingleStudentByActorFunc,
            getStudentScoreRelatedWithCourseAndActorFunc,
            saveStudentScoreEvaluatedByActorFunc,
        } = this.props;

        const {summaryCourseListByActor,getSummaryCourseListFunc} = this.props;
        return(
            <div>
                <ActorHeader>
                    <SimpleTriggerModal
                        modalTitle={<h3 style={{textAlign:'center'}}>修改密码</h3>}
                        triggerType="a"
                        triggerClassName="navItem"
                        triggerText="修改密码"
                        closable={false}
                        cancelText="关闭"
                    >
                        <ModifyPWDForm/>
                    </SimpleTriggerModal>
                    <SignOut triggerType="a" triggerClassName="navItem" triggerText="注销"/>
                </ActorHeader>
                <ActorBody>
                    <Row type="flex" justify="center" align="middle" style={{backgroundColor:"white",marginTop:30,paddingTop:30,paddingBottom:30}}>
                        <Col lg={{span:22}} md={{span:24}} sm={{span:24}} xs={{span:24}}>
                            <Tabs tabPosition="left">
                                <TabPane tab={<MenuItem>发布任务</MenuItem>} key="1">
                                    <OperationArea>
                                        <ReleaseTask
                                            courseRelatedWithActor={courseRelatedWithActor}
                                            courseTaskReleased={courseTaskReleased}
                                            getCourseTaskReleasedFunc={getCourseTaskReleasedFunc}
                                            addCourseTaskWithFileFunc={addCourseTaskWithFileFunc}
                                            releaseCourseTaskWithFileUrl={releaseCourseTaskWithFileUrl}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>课程评分</MenuItem>} key="2">
                                    <OperationArea>
                                        <EvaluateCourse
                                            actor={actor}
                                            courseRelatedWithActor={courseRelatedWithActor}
                                            courseTaskListOfSingleStudentByActor={courseTaskListOfSingleStudentByActor}
                                            getCourseTaskListOfSingleStudentByActorFunc={getCourseTaskListOfSingleStudentByActorFunc}
                                            studentScoreRelatedWithCourseAndActor={studentScoreRelatedWithCourseAndActor}
                                            saveStudentScoreEvaluatedByActorFunc={saveStudentScoreEvaluatedByActorFunc}
                                            getStudentScoreRelatedWithCourseAndActorFunc={getStudentScoreRelatedWithCourseAndActorFunc}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>课程汇总 </MenuItem>} key="3">
                                    <CourseSummary
                                        actor={actor}
                                        getSummaryCourseListFunc={getSummaryCourseListFunc}
                                        summaryCourseListByActor={summaryCourseListByActor}
                                    />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </ActorBody>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        courseRelatedWithActor:state.publicReducer.courseRelatedWithActor,
        courseTaskReleased:state.teacherReducer.courseTaskReleased,
        courseTaskListOfSingleStudentByActor:state.publicReducer.courseTaskListOfSingleStudentByActor,
        studentScoreRelatedWithCourseAndActor:state.publicReducer.studentScoreRelatedWithCourseAndActor,
        summaryCourseListByActor:state.publicReducer.summaryCourseListByActor
    }
}

function mapDispatchToProps(dispatch){
    return{
        getCourseTaskListOfSingleStudentByActorFunc:bindActionCreators(API.getCourseTaskListOfSingleStudentByActor,dispatch),
        getCourseRelatedWithActorFunc:bindActionCreators(API.getCourseRelatedWithActor,dispatch),
        getCourseTaskReleasedFunc:bindActionCreators(API.getCourseTaskReleased,dispatch),
        getStudentScoreRelatedWithCourseAndActorFunc:bindActionCreators(API.getStudentScoreRelatedWithCourseAndActor,dispatch),
        saveStudentScoreEvaluatedByActorFunc:bindActionCreators(API.saveStudentScoreEvaluatedByActor,dispatch),
        addCourseTaskWithFileFunc:bindActionCreators(API.addCourseTaskWithFile,dispatch),
        getSummaryCourseListFunc:bindActionCreators(API.getSummaryCourseList,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Teacher);