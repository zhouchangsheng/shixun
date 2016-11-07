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
import MenuItem from '../public/MenuItem';
import OperationArea from '../public/OperationArea';
import AddTeacher from './addTeacher/index';
import AddStudent from './addStudent/index';
import AddCompany from './addCompany/index';
import ReleaseCourse from './releaseCourse/index';
import SimpleTriggerModal from '../public/SimpleTriggerModal';
import ModifyPWDForm from '../public/ModifyPWDForm';
import CourseSummary from '../public/CourseSummary';
import SignOut from '../public/SignOut';

let API = require('../../middleware/api');
let uploadFileUrlOfAddCompanyURL =API.serviceURL;
let uploadFileUrlOfAddStudentURL = API.serviceURL;
let uploadFileUrlOfAddTeacherURL = API.serviceURL;
let releaseCourseInfoWithFileURL = API.serviceURL;
let actor= Cookie.load('uactor');

const TabPane = Tabs.TabPane;

class Admin extends React.Component{
    componentDidMount(){
        const {
            getWholeProfessionFunc,
            getWholeCompanyFunc,
            getWholeTeacherFunc
        }= this.props;

        getWholeProfessionFunc(false);
        getWholeCompanyFunc(false);
        getWholeTeacherFunc(false);
    }

    render(){
        const {companyAdded,addCompanyViaFileFunc} = this.props;
        const {studentAdded,addStudentViaFileFunc}  = this.props;
        const {teacherAdded,addTeacherViaFileFunc}  = this.props;
        const {professionGot,teacherGot,courseReleased,companyGot,releaseCourseInfoWithFileFunc} = this.props;
        const {summaryCourseListByActor,getSummaryCourseListFunc} = this.props;
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
                        <Col lg={{span:23}} md={{span:24}} sm={{span:24}} xs={{span:24}}>
                            <Tabs tabPosition="left">
                                <TabPane tab={<MenuItem>导入教师</MenuItem>} key="1">
                                    <OperationArea>
                                        <AddTeacher
                                            teacherAdded ={teacherAdded}
                                            addTeacherViaFileFunc = {addTeacherViaFileFunc}
                                            uploadFileUrlOfAddTeacherURL={uploadFileUrlOfAddTeacherURL}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>导入学生</MenuItem>} key="2">
                                    <OperationArea>
                                        <AddStudent
                                            studentAdded={studentAdded}
                                            addStudentViaFileFunc={addStudentViaFileFunc}
                                            uploadFileUrlOfAddStudentURL={uploadFileUrlOfAddStudentURL}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>导入公司</MenuItem>} key="3">
                                    <OperationArea>
                                        <AddCompany
                                            addCompanyViaFileFunc={addCompanyViaFileFunc}
                                            companyAdded={companyAdded}
                                            uploadFileUrlOfAddCompanyURL={uploadFileUrlOfAddCompanyURL}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>发布课程</MenuItem>} key="4">
                                    <OperationArea>
                                        <ReleaseCourse
                                            teacherGot={teacherGot}
                                            companyGot={companyGot}
                                            professionGot={professionGot}
                                            courseReleased = {courseReleased}
                                            releaseCourseInfoWithFileURL ={releaseCourseInfoWithFileURL}
                                            releaseCourseInfoWithFileFunc={releaseCourseInfoWithFileFunc}
                                        />
                                    </OperationArea>
                                </TabPane>
                                <TabPane tab={<MenuItem>课程汇总</MenuItem>} key="5">
                                    <OperationArea>
                                        <CourseSummary
                                            actor={actor}
                                            getSummaryCourseListFunc={getSummaryCourseListFunc}
                                            summaryCourseListByActor={summaryCourseListByActor}
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
        professionGot:state.adminReducer.professionGot,
        companyAdded:state.adminReducer.companyAdded,
        teacherAdded:state.adminReducer.teacherAdded,
        studentAdded:state.adminReducer.studentAdded,
        teacherGot:state.adminReducer.teacherGot,
        companyGot:state.adminReducer.companyGot,
        courseReleased:state.adminReducer.courseReleased,
        summaryCourseListByActor:state.publicReducer.summaryCourseListByActor
    }
}

function mapDispatchToProps(dispatch){
    return{
        addCompanyViaFileFunc:bindActionCreators(API.addCompanyViaFile,dispatch),
        addStudentViaFileFunc:bindActionCreators(API.addStudentViaFile,dispatch),
        addTeacherViaFileFunc:bindActionCreators(API.addTeacherViaFile,dispatch),
        getWholeProfessionFunc:bindActionCreators(API.getWholeProfession,dispatch),
        getWholeCompanyFunc:bindActionCreators(API.getWholeCompany,dispatch),
        getWholeTeacherFunc:bindActionCreators(API.getWholeTeacher,dispatch),
        releaseCourseInfoWithFileFunc:bindActionCreators(API.releaseCourseInfoWithFile,dispatch),
        getSummaryCourseListFunc:bindActionCreators(API.getSummaryCourseList,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);