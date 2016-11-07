/**
 * Created by jerry on 2016/9/23.
 */
/**
 * 教师reducer
 * */
import $ from 'jquery';

/**
 * 教师获取某课程的所有任务
 * */
const TEACHER_GET_SELF_COURSE_WHOLE_TASK ='TEACHER_GET_SELF_COURSE_WHOLE_TASK';


const InitialState = {
    courseTaskReleased:[]
};

export default (state=InitialState,action)=>{
    switch(action.type){
        case TEACHER_GET_SELF_COURSE_WHOLE_TASK:
            return $.extend({},state,{courseTaskReleased:action.text.courseTaskReleased});
        default:
            return state;
    }
}