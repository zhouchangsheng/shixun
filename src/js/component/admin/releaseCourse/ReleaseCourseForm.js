/**
 * Created by jerry on 2016/9/12.
 */
import React from 'react';
import {Modal,Button,Form,Input,Select,Row,Col,Icon,Cascader,Upload} from 'antd';


const FormItem = Form.Item;
const SelectOption = Select.Option;
const createForm = Form.create;

/**
 * 文件上传
 * */
let name= 'addition';
let pattern = /(\.pdf$)|(\.doc)|(\.docx)/;
let fileTypeTip = '只能上传***.doc、***.docx、***.pdf 文件哦！';

let courseInfo ={method:"insertCourseByForm",profession:undefined,teacher:undefined,company:undefined,name:undefined,memo:undefined};
let courseInfoValidating=()=>{
    if( courseInfo.profession==undefined||courseInfo.teacher==undefined|| courseInfo.company==undefined|| courseInfo.name==undefined){
        let profession = courseInfo.profession? "":"专业 ";
        let teacher = courseInfo.teacher? "":"教师 ";
        let company = courseInfo.company? "":"公司 ";
        let name = courseInfo.name||courseInfo.name==''?"":"课程名 ";

        Modal.info({
            title: '提示信息',
            content: profession+teacher+company+name+'不能为空',
        });
        return false;
    }else{
        return true;
    }
};


let ReleaseCourseForm = React.createClass({
    nameChange(e){
        courseInfo.name=e.target.value;
    },

    professionChange(value){
        courseInfo.profession = value.toString().replace(/,/g,";");
    },

    companyChange(value){
        courseInfo.company = value;
    },

    teacherChange(value){
        courseInfo.teacher = value[value.length-1];
    },

    memoChange(e){
        courseInfo.memo = e.target.value;
    },

    resetForm(){
        this.props.form.resetFields();
        courseInfo.profession=undefined;
        courseInfo.name=undefined;
        courseInfo.teacher=undefined;
        courseInfo.memo=undefined;
        courseInfo.company=undefined;
    },

    handleChange(info){
        const {releaseCourseInfoWithFileFunc} = this.props;
        releaseCourseInfoWithFileFunc(info,courseInfo);
    },

    render(){
        const displayItemLayout = {
            /*labelCol:{lg:{span:1},xs:{span:3},sm:{span:2},md:{span:1}},
             wrapperCol:{lg:{span:5},xs:{span:14},sm:{span:10},md:{span:8}}*/
            labelCol:{span:8},
            wrapperCol:{span:10}
        };

        const {getFieldDecorator} = this.props.form;
        const {professionGot,teacherGot,companyGot,releaseCourseInfoWithFileURL} = this.props;
        const props = {
            action: releaseCourseInfoWithFileURL,
            name:name,
            data:courseInfo,
            onChange:this.handleChange,
            showUploadList:false,
            beforeUpload(file) {
                if(!courseInfoValidating()){
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
            <Form  id="form-release-course">
                <FormItem
                    {...displayItemLayout}
                    label="名称"
                >
                    {
                        getFieldDecorator('name',{
                            rules:[{whitespace:true,message:"课程名不能为空"}]
                        })(
                            <Input  name="name" type="text" placeholder="请输入课程名" onChange={this.nameChange}/>
                        )
                    }
                </FormItem>
                <FormItem
                    {...displayItemLayout}
                    label="专业"
                >
                    {
                        getFieldDecorator("profession",{
                            rules:[{whitespace:true,type:'array',message:"专业不能为空"}]
                        })(
                            <Select
                                multiple
                                style={{width:'100%'}}
                                placeholder="请选择可选专业（多选）"
                                onChange={this.professionChange}
                            >
                                {
                                    professionGot.map((item)=>{
                                        return <SelectOption key={item}>{item}</SelectOption>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem
                    {...displayItemLayout}
                    label="教师"
                >
                    {
                        getFieldDecorator("teacher",{
                            rules:[{whitespace:true,type:'array',message:"教师不能为空"}]
                        })(
                            <Cascader
                                onChange={this.teacherChange}
                                placeholder="请选择教师"
                                options={teacherGot}

                            />
                        )
                    }
                </FormItem>
                <FormItem
                    {...displayItemLayout}
                    label="公司"
                >
                    {
                        getFieldDecorator("company",{
                            rules:[{whitespace:true,message:"公司不能为空"}]
                        })(
                            <Select
                                onChange={this.companyChange}
                                placeholder="请选择公司"

                            >
                                {
                                    companyGot.map((item,index)=>{
                                        return <SelectOption  key={item.id+index} title={'地址：'+item.address+", 联系人："+item.contact} value={item.name}>{item.name}</SelectOption>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem
                    {...displayItemLayout}
                    label="描述"
                >
                    {
                        getFieldDecorator("memo",{
                            rules:[{whitespace:true,message:"简单说明"}]
                        })(
                            <Input name="memo"    type="textarea" onChange={this.memoChange} autosize={{ minRows: 1, maxRows: 4 }} />
                        )
                    }
                </FormItem>
                <FormItem
                    {...displayItemLayout}
                    label="附件"
                >
                    <Upload {...props}>
                        <Button type="ghost"><Icon type="upload" />上传文件并提交</Button>
                    </Upload>
                </FormItem>
                <FormItem >
                    <Row type="flex" justify="center" align="middle">
                        <Col span={4} offset={2}><Button type="ghost" onClick={this.resetForm}>重置</Button></Col>
                    </Row>
                </FormItem>
            </Form>
        )
    }
});

ReleaseCourseForm =createForm()(ReleaseCourseForm);
export default ReleaseCourseForm;
