/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Tabs,Row,Col} from 'antd';
/*
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';*/
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cookie from 'react-cookie';

import ActorHeader from '../public/ActorHeader';
import ActorBody from '../public/ActorBody';
import ModifyPWDForm from '../public/ModifyPWDForm';
import SignOut from '../public/SignOut';
import MenuItem from '../public/MenuItem';
import OperationArea from '../public/OperationArea';
import SimpleTriggerModal from '../public/SimpleTriggerModal';

import SelectCourse from './selectCourse/index';
import SubmitTask from './submitTask/index';
import QueryScore from './queryScore/index';

let API = require('../../middleware/api');
let username = Cookie.load('uid');
const TabPane = Tabs.TabPane;
const uploadCourseTaskByStudentURL = API.serviceURL;

class Student extends React.Component{
    componentDidMount(){
        const {getCourseSelectedFunc} = this.props;
        getCourseSelectedFunc?getCourseSelectedFunc():'';
    }
    render(){
        const {
            courseRelatedWithActor,
            courseSelected,
            getCourseRelatedWithActorFunc,
            removeCourseSelectedFunc,
            submitSelectCourseFunc
        } = this.props;

        const {
            getCourseScoreByStudentFunc,
            getCourseTaskListOfSingleStudentByActorFunc,
            courseScoreByStudent,
            courseTaskListOfSingleStudentByActor,
            uploadCourseTaskByStudentFunc
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
                                <TabPane tab={<MenuItem>选择课程</MenuItem>} key="1">
                                    <OperationArea>
                                        <SelectCourse
                                            courseRelatedWithActor={courseRelatedWithActor}
                                            courseSelected={courseSelected}
                                            getCourseRelatedWithActorFunc={getCourseRelatedWithActorFunc}
                                            removeCourseSelectedFunc={removeCourseSelectedFunc}
                                            submitSelectCourseFunc={submitSelectCourseFunc}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>任务提交</MenuItem>} key="2">
                                    <OperationArea>
                                        <SubmitTask
                                            courseSelected={courseSelected}
                                            uploadCourseTaskByStudentURL={uploadCourseTaskByStudentURL}
                                            username={username}
                                            uploadCourseTaskByStudentFunc={uploadCourseTaskByStudentFunc}
                                            courseTaskListOfSingleStudentByActor={courseTaskListOfSingleStudentByActor}
                                            getCourseTaskListOfSingleStudentByActorFunc={getCourseTaskListOfSingleStudentByActorFunc}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>成绩查询</MenuItem>} key="3">
                                    <OperationArea>
                                        <QueryScore
                                            getCourseScoreByStudentFunc={getCourseScoreByStudentFunc}
                                            courseScoreByStudent={courseScoreByStudent}
                                        />
                                    </OperationArea>
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
        courseSelected:state.studentReducer.courseSelected,
        courseScoreByStudent:state.studentReducer.courseScoreByStudent,
        courseTaskListOfSingleStudentByActor:state.publicReducer.courseTaskListOfSingleStudentByActor,
    }
}

function mapDispatchToProps(dispatch){
    return{
        getCourseRelatedWithActorFunc:bindActionCreators(API.getCourseRelatedWithActor,dispatch),
        getCourseSelectedFunc:bindActionCreators(API.getCourseSelected,dispatch),
        removeCourseSelectedFunc:bindActionCreators(API.removeCourseSelected,dispatch),
        uploadCourseTaskByStudentFunc:bindActionCreators(API.uploadCourseTaskByStudent,dispatch),
        submitSelectCourseFunc:bindActionCreators(API.submitSelectCourse,dispatch),
        getCourseScoreByStudentFunc:bindActionCreators(API.getCourseScoreByStudent,dispatch),
        getCourseTaskListOfSingleStudentByActorFunc:bindActionCreators(API.getCourseTaskListOfSingleStudentByActor,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Student);