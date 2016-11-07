/**
 * Created by jerry on 2016/9/8.
 */
import React from 'react';
import {Row,Col,Button,Input,Form} from 'antd';

import $ from 'jquery';


const FormItem = Form.Item;
let defaultStyle = {backgroundColor:'#e9e9e9',minHeight:80,paddingTop:20,paddingBottom:20,borderRadius:4,marginTop:20,marginBottom:20};
let filter={courseName:'',teacherName:'',companyName:''};

function filterToGetParam(obj){
    let item;
    let getString ='';
    for(item in obj){
        getString+='&'+item+'='+obj[item];
    }
    return getString;
}
/**
 * 选课过滤组件
 * param : props.searchCourseWithFilter 父元素传递到该子元素的数据接收函数句柄
 * */
class CourseDropDown extends React.Component{
    constructor(){
        super();
        this.searchCourseWithFilter=this.searchCourseWithFilter.bind(this);
    }

    searchCourseWithFilter(){
        const {getCourseRelatedWithActorFunc} = this.props;
        getCourseRelatedWithActorFunc?getCourseRelatedWithActorFunc(filter,true):'';
    }

    courseNameChange(e){
        filter.courseName=e.target.value;
    }

    teacherNameChange(e){
        filter.teacherName = e.target.value;
    }
    companyNameChange(e){
        filter.companyName = e.target.value;
    }

    render(){
        let style = this.props.style?$.extend({},defaultStyle,this.props.style):defaultStyle;

        return(
            <Row style={style} type="flex" justify="center" align="middle">
                <Col>
                    <Form inline >
                        <Row>
                            <FormItem
                                label="课程名(选填)"
                            >
                                <Input placeholder="输入课程名"  onChange={this.courseNameChange}/>
                            </FormItem>
                        </Row>

                        <Row>
                            <FormItem
                                label="教师名(选填)"
                            >
                                <Input placeholder="输入教师名" onChange={this.teacherNameChange}/>
                            </FormItem>
                        </Row>

                        <Row>
                            <FormItem
                                label="公司名(选填)"
                            >
                                <Input placeholder="输入公司名" onChange={this.companyNameChange}/>
                            </FormItem>
                        </Row>
                        <Row style={{textAlign:'center'}}>
                            <Button type="primary" onClick={this.searchCourseWithFilter}>搜索</Button>
                        </Row>
                    </Form>
                </Col>

            </Row>
        )
    }
}



export default CourseDropDown;