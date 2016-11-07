/**
 * Created by jerry on 2016/9/18.
 */
import React from 'react';
import {Row,Table,Col,Form,Input,Button} from 'antd';


const FormItem = Form.Item;
const columnsOfSummaryCourseList = [{
    title:'专业',
    dataIndex:'profession',
    key:'profession'
},{
    title:'课程名',
    dataIndex:'courseName',
    key:'courseName'
},{
    title:'学号',
    dataIndex:'studentId',
    key:'studentId'
},{
    title:'学生姓名',
    dataIndex:'studentName',
    key:'studentName'
}];
let filterComponentByActor=null;
let filter={courseName:'',profession:'',studentId:'',teacherName:'',companyName:''};

function filterToGetParam(obj){
    let item;
    let getString ='';
    for(item in obj){
        getString+='&'+item+'='+obj[item];
    }
    return getString;
}

class CourseSummary extends React.Component{
    constructor(){
        super();
        this.searchSummaryCourseWithFilter = this.searchSummaryCourseWithFilter.bind(this);
    }
    componentWillMount(){
        const {actor} = this.props;
        switch(actor){
            case 1:
                columnsOfSummaryCourseList.push({
                    title:'教师',
                    dataIndex:'teacherName',
                    key:'teacherName'
                },{
                    title:'公司',
                    dataIndex:'companyName',
                    key:'companyName'
                },{
                    title:'教师评分',
                    dataIndex:'teacherScore',
                    key:'teacherScore'
                },{
                    title:'公司评分',
                    dataIndex:'companyScore',
                    key:'companyScore'
                },{
                    title:'综合评分',
                    dataIndex:'score',
                    key:'score'
                });
                filterComponentByActor=<Row>
                    <Row>
                        <FormItem
                            label="教师(选填)"
                        >
                            <Input placeholder="输入教师" onChange={this.teacherNameChange}/>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem
                            label="公司(选填)"
                        >
                            <Input placeholder="输入公司"  onChange={this.companyNameChange}/>
                        </FormItem>
                    </Row>
                </Row>;
                break;
            case 3:
                columnsOfSummaryCourseList.push({
                    title:'评分',
                    dataIndex:'teacherScore',
                    key:'teacherScore'
                });
                break;
            case 2:
                columnsOfSummaryCourseList.push({
                    title:'评分',
                    dataIndex:'companyScore',
                    key:'companyScore'
                });
                break;
        }
    }

    professionChange(e){
        filter.profession = e.target.value;
    }

    courseNameChange(e){
        filter.courseName = e.target.value;
    }

    studentIdChange(e){
        filter.studentId = e.target.value;
    }

    teacherNameChange(e){
        filter.teacherName = e.target.value;
    }

    companyNameChange(e){
        filter.companyName=e.target.value
    }
    searchSummaryCourseWithFilter(){
        const {getSummaryCourseListFunc} = this.props;
        getSummaryCourseListFunc?getSummaryCourseListFunc(filter):'';
    }
    render(){
        const {summaryCourseListByActor} = this.props;
        return(
            <Row style={{minHeight:500}}>
                <Row className="markdown"><h2>课程汇总</h2></Row>
                <Row className="markdown"><h3>筛选课程</h3></Row>
                <Row style={{backgroundColor:"#e9e9e9",paddingTop:20,paddingBottom:20,borderRadius:5}} type="flex" justify="center" align="middle">
                    <Col>
                        <Form inline >
                            <Row>
                                <FormItem
                                    label="专业(选填)"
                                >
                                    <Input placeholder="输入专业" onChange={this.professionChange}/>
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem
                                    label="课程(选填)"
                                >
                                    <Input placeholder="输入课程名"  onChange={this.courseNameChange}/>
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem
                                    label="学号(选填)"
                                >
                                    <Input placeholder="输入学号"  onChange={this.studentIdChange}/>
                                </FormItem>
                            </Row>
                            {
                                filterComponentByActor
                            }
                            <Row style={{textAlign:'center'}}>
                                <Button type="primary" onClick={this.searchSummaryCourseWithFilter}>搜索</Button>
                            </Row>
                        </Form>
                    </Col>

                </Row>
                <Row>
                    <Table columns={columnsOfSummaryCourseList} dataSource={summaryCourseListByActor}/>
                </Row>
            </Row>
        )
    }
}

export default CourseSummary;