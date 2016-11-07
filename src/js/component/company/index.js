/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Tabs,Row,Col} from 'antd';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cookie from 'react-cookie';

import ActorHeader from '../public/ActorHeader';
import ActorBody from '../public/ActorBody';
import MenuItem from '../public/MenuItem';
import SimpleTriggerModal from '../public/SimpleTriggerModal';
import ModifyPWDForm from '../public/ModifyPWDForm';
import SignOut from '../public/SignOut';
import OperationArea from '../public/OperationArea';
import CourseSummary from '../public/CourseSummary';

import EvaluateCourse from './evaluateCourse/index';


const TabPane = Tabs.TabPane;

let API = require('../../middleware/api');
let actor = Cookie.load('uactor');
class Company extends React.Component{
    componentDidMount(){
        const {getCourseRelatedWithActorFunc} = this.props;
        getCourseRelatedWithActorFunc?getCourseRelatedWithActorFunc():"";
    }

    render(){
        const {
            courseRelatedWithActor,
            studentScoreRelatedWithCourseAndActor,
            courseTaskListOfSingleStudentByActor,
            saveStudentScoreEvaluatedByActorFunc,
            getStudentScoreRelatedWithCourseAndActorFunc,
            getCourseTaskListOfSingleStudentByActorFunc
        }=this.props;

        const{
            getSummaryCourseListFunc,
            summaryCourseListByActor
        } = this.props;

        return(
            <Row>
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
                                <TabPane tab={<MenuItem>课程评分</MenuItem>} key="1">
                                    <OperationArea>
                                        <EvaluateCourse
                                            actor={actor}
                                            courseRelatedWithActor={courseRelatedWithActor}
                                            courseTaskListOfSingleStudentByActor={courseTaskListOfSingleStudentByActor}
                                            studentScoreRelatedWithCourseAndActor={studentScoreRelatedWithCourseAndActor}
                                            saveStudentScoreEvaluatedByActorFunc={saveStudentScoreEvaluatedByActorFunc}
                                            getCourseTaskListOfSingleStudentByActorFunc={getCourseTaskListOfSingleStudentByActorFunc}
                                            getStudentScoreRelatedWithCourseAndActorFunc={getStudentScoreRelatedWithCourseAndActorFunc}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>课程汇总</MenuItem>} key="2">
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
            </Row>
        )
    }
}

function mapStateToProps(state){
    return{
        courseRelatedWithActor:state.publicReducer.courseRelatedWithActor,
        studentScoreRelatedWithCourseAndActor:state.publicReducer.studentScoreRelatedWithCourseAndActor,
        courseTaskListOfSingleStudentByActor:state.publicReducer.courseTaskListOfSingleStudentByActor,
        summaryCourseListByActor:state.publicReducer.summaryCourseListByActor
    }
}

function mapDispatchToProps(dispatch){
    return{
        saveStudentScoreEvaluatedByActorFunc:bindActionCreators(API.saveStudentScoreEvaluatedByActor,dispatch),
        getCourseRelatedWithActorFunc:bindActionCreators(API.getCourseRelatedWithActor,dispatch),
        getStudentScoreRelatedWithCourseAndActorFunc:bindActionCreators(API.getStudentScoreRelatedWithCourseAndActor,dispatch),
        getCourseTaskListOfSingleStudentByActorFunc:bindActionCreators(API.getCourseTaskListOfSingleStudentByActor,dispatch),
        getSummaryCourseListFunc:bindActionCreators(API.getSummaryCourseList,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Company);