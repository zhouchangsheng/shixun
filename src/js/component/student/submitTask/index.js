/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Table,Row,Modal,Button,Form,Input,Icon,Upload} from 'antd';

let uploadTaskData={method:"insertTaskResultByForm",taskId:undefined,studentId:undefined,memo:''};
const name ='resultFile';
const pattern = /(\.doc$)|(\.docx$)|(\.pdf$)/;
const fileTypeTip = '只能上传.doc、.docx或.pdf 文件哦！';
const FormItem = Form.Item;

class SubmitTask extends React.Component{
    constructor(){
        super();
        this.state={
            tableLoadingOfCourseSelected:true,
            taskListModalVisible:false,
            taskListModalTitle:null,
            uploadTaskModalVisible:false,
            uploadTaskModalTitle:null,
        };

        this.showCourseTaskModalOfSingleStudent = this.showCourseTaskModalOfSingleStudent.bind(this);
        this.closeTaskListModal = this.closeTaskListModal.bind(this);
        this.uploadCourseTask = this.uploadCourseTask.bind(this);
        this.closeUploadTasModal = this.closeUploadTasModal.bind(this);
        this.uploadTaskHandleChange = this.uploadTaskHandleChange.bind(this);
    }

    showCourseTaskModalOfSingleStudent(e){
        /**
         * warning antd按钮Button点击事件中 e.target 会有两种结果
         * 一是button中的<span>text</span>
         * 二是button自身
         * */
        let courseName=e.target.getAttribute('data-course-name')||e.target.parentNode.getAttribute('data-course-name');
        let courseId=e.target.getAttribute('data-course-id')||e.target.parentNode.getAttribute('data-course-id');
        const {
            username,
            getCourseTaskListOfSingleStudentByActorFunc
        } = this.props;


        getCourseTaskListOfSingleStudentByActorFunc?getCourseTaskListOfSingleStudentByActorFunc(username,courseId):'';

        this.setState({taskListModalVisible:true,taskListModalTitle:courseName});
    }

    uploadCourseTask(e){
        /**
         * warning antd按钮Button点击事件中 e.target 会有两种结果
         * 一是button中的<span>text</span>
         * 二是button自身
         * */
        let taskId=e.target.getAttribute('data-task-id')||e.target.parentNode.getAttribute('data-task-id');
        let taskName=e.target.getAttribute('data-task-name')||e.target.parentNode.getAttribute('data-task-name');
        uploadTaskData.taskId = taskId;
        this.setState({uploadTaskModalVisible:true,uploadTaskModalTitle:taskName})
    }

    closeTaskListModal(){
        this.setState({taskListModalVisible:false});
    }

    closeUploadTasModal(){
        this.setState({uploadTaskModalVisible:false});
    }

    uploadTaskHandleChange(info){
        const {uploadCourseTaskByStudentFunc} = this.props;
        uploadCourseTaskByStudentFunc?uploadCourseTaskByStudentFunc(info):'';
    }

    memoChange(e) {
        uploadTaskData.memo=e.target.value;
    }



    componentDidMount(){
        this.setState({tableLoadingOfCourseSelected:false});
        uploadTaskData.studentId = this.props.username;
    }
    render(){
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
        },{
            title: '任务提交',
            key:'taskSubmit',
            render: (text, record)=>(
                <Button
                    type="ghost"
                    data-course-name={record.courseName}
                    data-course-id = {record.courseId}
                    onClick={this.showCourseTaskModalOfSingleStudent}
                >提交任务</Button>
            )
        }];
        const columnsOfTaskList = [{
            title:'任务名',
            dataIndex:'name',
            key:'name'
        },{
            title:'任务说明',
            dataIndex:'memo',
            key:'memo'
        },{
            title:'成果附件',
            dataIndex:'resultURL',
            render:(text,record)=>{
                if(record.content){
                    return <a href={record.content} key={record.id} target="_blank">附件</a>
                }else{
                    return <Button type="ghost" key={record.id} data-task-name={record.name} data-task-id={record.id} onClick={this.uploadCourseTask}>上传</Button>
                }
            }
        }];

        const {
            courseSelected,
            courseTaskListOfSingleStudentByActor,
            uploadCourseTaskByStudentURL,
        }=this.props;

        //console.log(courseTaskListOfSingleStudentByActor);


        const uploadTaskProps ={
            action:uploadCourseTaskByStudentURL,
            name:name,
            onChange: this.uploadTaskHandleChange,
            multiple: false,
            data:uploadTaskData,
            showUploadList:false,
            beforeUpload(file) {
                console.log(uploadTaskData);
                const fileType = pattern.test(file.name);
                if (!fileType) {
                    Modal.info({
                        title: '提示信息',
                        content: fileTypeTip,
                    });
                }
                return fileType;
            },
        };

        return(
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>任务提交</h2></Row>
                <Row className="markdown"><h3>已选课程</h3></Row>
                <Row>
                    <Table columns={columnsOfSelectedCourse} dataSource={courseSelected} loading={this.state.tableLoadingOfCourseSelected} />
                </Row>
                <Row>
                    <Modal
                        title={<h4 style={{textAlign:'center'}}>课程名：{this.state.taskListModalTitle}</h4>}
                        visible={this.state.taskListModalVisible}
                        closable={false}
                        footer={<Button type="primary" onClick={this.closeTaskListModal}>关闭</Button>}
                    >
                        <Table
                            pagination={false}
                            scroll={{ y: 240 }}
                            columns={columnsOfTaskList}
                            dataSource={courseTaskListOfSingleStudentByActor} />
                    </Modal>
                </Row>
                <Row>
                    <Modal
                        title={<h4 style={{textAlign:'center'}}>课程名：{this.state.taskListModalTitle}   ；任务名：{this.state.uploadTaskModalTitle}</h4>}
                        visible={this.state.uploadTaskModalVisible}
                        closable={false}
                        footer={<Button type="primary" onClick={this.closeUploadTasModal}>关闭</Button>}
                    >
                        <Form>
                            <FormItem
                                labelCol={{span:4,offset:2}}
                                wrapperCol={{span:15}}
                                label="成果说明"
                            >
                                <Input type="textarea" onChange={this.memoChange} autosize={{minRows:3,maxRows:3}}/>
                            </FormItem>
                            <FormItem
                                labelCol={{span:4,offset:2}}
                                wrapperCol={{span:15}}
                                label="上传提交"
                            >
                                <Upload {...uploadTaskProps}>
                                    <Button type="ghost">
                                        <Icon type="upload" /> 上传文件并提交
                                    </Button>
                                </Upload>
                            </FormItem>
                        </Form>
                    </Modal>
                </Row>
            </Row>
        )
    }
}

export default SubmitTask;