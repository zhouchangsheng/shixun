/**
 * Created by jerry on 2016/9/8.
 */
import React from 'react';
import {Upload,Button,Icon,Form,Input,DatePicker,Modal,Row,Col} from 'antd';


const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const createForm = Form.create;

/**
 * 文件上传
 * */

let name= 'content';
let pattern = /(\.doc$)|(\.docx$)|(\.pdf$)/;
let fileTypeTip = '只能上传.doc、.docx或.pdf 文件哦！';

let courseTaskInfo ={
    method:"insertTaskByForm",
    courseId:undefined,
    name:undefined,
    memo:undefined,
    startTime:undefined,
    endTime:undefined,
};

let courseTaskInfoValidating =()=>{
    if( courseTaskInfo.courseId==undefined||courseTaskInfo.name==undefined|| courseTaskInfo.startTime==undefined|| courseTaskInfo.endTime==undefined){
        let courseId = courseTaskInfo.courseId? "":"课程号 ";
        let name = courseTaskInfo.name? "":"任务名 ";
        let startTime = courseTaskInfo.startTime? "":"开始时间 ";
        let endTime = courseTaskInfo.endTime||courseTaskInfo.endTime==''?"":"结束时间 ";

        Modal.info({
            title: '提示信息',
            content: name+courseId+startTime+endTime+'不能为空',
        });
        return false;
    }else{
        return true;
    }
};

let AddCourseTaskForm = React.createClass({
    onDateRangeChange(value, dateString){
            if(value[0]!==null){
                let startTime = new Date(value[0]).getTime();
                let endTime = new Date(value[1]).getTime();
                courseTaskInfo.startTime = startTime;
                courseTaskInfo.endTime = endTime;
            }
    },

    nameChange(e){
        courseTaskInfo.name = e.target.value;
    },

    memoChange(e){
        courseTaskInfo.memo =e.target.value;
    },


    resetForm(){
        this.props.form.resetFields();
        courseTaskInfo.courseId=undefined;
        courseTaskInfo.name=undefined;
        courseTaskInfo.memo=undefined;
        courseTaskInfo.startTime=undefined;
        courseTaskInfo.endTime=undefined;
    },


    handleChange(info){
        const {addCourseTaskWithFileFunc} = this.props;
        addCourseTaskWithFileFunc?addCourseTaskWithFileFunc(info,courseTaskInfo.courseId):'';
    },
    componentWillMount(){
        courseTaskInfo.courseId = this.props.courseId;
    },

    componentWillReceiveProps(nextProps){
        if(this.props.courseId!=nextProps.courseId){
            courseTaskInfo.courseId = nextProps.courseId;
        }
    },


    render(){
        const {getFieldDecorator} = this.props.form;
        const {releaseCourseTaskWithFileUrl} = this.props;
        const props = {
            action: releaseCourseTaskWithFileUrl,
            name:name,
            onChange: this.handleChange,
            multiple: false,
            data:courseTaskInfo,
            showUploadList:false,
            beforeUpload(file) {
                if(!courseTaskInfoValidating()){
                    return false;
                }
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
            <Form horizontal>
                <FormItem
                    id="control-taskName"
                    label="任务名称"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    {
                        getFieldDecorator("taskName",{
                            rules:[{required:true,whitespace:true,message:"任务名不能为空"}]
                        })(
                            <Input
                                id="name"
                                placeholder="必填"
                                onChange={this.nameChange}
                            />
                        )
                    }
                </FormItem>

                <FormItem
                    id="control-taskMemo"
                    label="任务说明"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    {
                        getFieldDecorator("taskMemo",{
                            rules:[{whitespace:true}]
                        })(
                            <Input
                                type="textarea"
                                onChange={this.memoChange}
                                id="memo"
                                placeholder="选填"
                                autosize={{minRows:3,maxRows:4}}
                            />
                        )
                    }
                </FormItem>

                <FormItem
                    label="截止时间"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    {
                        getFieldDecorator("rangeTime",{
                            rules:[{required:true,type:'array',whitespace:true,message:"截止时间不能为空"}]
                        })(
                            <RangePicker
                                onChange={this.onDateRangeChange}
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    label="任务内容"
                    labelCol={{span:6}}
                    wrapperCol={{span:15}}
                >
                    <Upload {...props} >
                        <Button type="ghost">
                            <Icon type="upload" /> 上传文件并提交
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem
                >
                    <Row type="flex" justify="center" align="middle">
                        <Col>
                            <Button type="ghost" onClick={this.resetForm}>重置</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        )
    }
});

AddCourseTaskForm =createForm()(AddCourseTaskForm);
export default AddCourseTaskForm;