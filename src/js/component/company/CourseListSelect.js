/**
 * Created by jerry on 2016/9/8.
 */
import React from 'react';
import {Select,Row,Col} from 'antd';

import $ from 'jquery';

const Option = Select.Option;

let style={backgroundColor:'#e9e9e9',minHeight:80,borderRadius:5,marginTop:20,marginBottom:20};
class CourseListSelect extends React.Component{
    constructor(){
        super();
        this.courseChange=this.courseChange.bind(this);
    }


    courseChange(value){
        const {
            setAddCourseTaskButtonNormalAndSaveCourseIdToState,
            getCourseTaskReleasedFunc,
            getStudentScoreRelatedWithCourseAndActorFunc
        } = this.props;

        setAddCourseTaskButtonNormalAndSaveCourseIdToState?setAddCourseTaskButtonNormalAndSaveCourseIdToState(value):'';
        getCourseTaskReleasedFunc?getCourseTaskReleasedFunc(value):'';
        getStudentScoreRelatedWithCourseAndActorFunc?getStudentScoreRelatedWithCourseAndActorFunc(value):'';
    }


    render(){
        let styleTemp=(this.props.style==undefined||typeof this.props.style !='object')?null:this.props.style;
        style=$.extend({},style,styleTemp);

        const {courseRelatedWithActor} = this.props;
        return(
        <Row type="flex" justify="center" align="middle" style={style}>
            <Col lg={{span:4}} md={{span:5}} sm={{span:5}} >
                <Select showSearch
                        style={{width:"100%"}}
                        placeholder="请选择课程！"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={this.courseChange}
                >
                    {
                        courseRelatedWithActor.map((item)=>{
                            return <Option key={item.id} title={'课程号：'+item.id} value={''+item.id}>{item.name}</Option>;
                        })
                    }
                </Select>
            </Col>
        </Row>

        )
    }
}



export default CourseListSelect;