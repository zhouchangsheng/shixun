/**
 * Created by jerry on 2016/9/23.
 */
/**
 * 公共reducer
 * */
import $ from 'jquery';

const GET_COURSE_RELATED_WITH_ACTOR = 'GET_COURSE_RELATED_WITH_ACTOR';
const GET_STUDENT_SCORE_RELATED_WITH_COURSE_AND_ACTOR = 'GET_STUDENT_SCORE_RELATED_WITH_COURSE_AND_ACTOR';
const GET_COURSE_TASK_LIST_OF_SINGLE_STUDENT_BY_ACTOR = 'GET_COURSE_TASK_LIST_OF_SINGLE_STUDENT_BY_ACTOR';
const GET_SUMMARY_COURSE_LIST_BY_ACTOR = 'GET_SUMMARY_COURSE_LIST_BY_ACTOR';

const InitialState={
    courseRelatedWithActor:[],
    studentScoreRelatedWithCourseAndActor:[],
    courseTaskListOfSingleStudentByActor:[],
    summaryCourseListByActor:[]
};

export default (state=InitialState,action)=>{
    switch(action.type){
        case GET_COURSE_RELATED_WITH_ACTOR:
            return $.extend({},state,{courseRelatedWithActor:action.text.courseRelatedWithActor});
        case GET_STUDENT_SCORE_RELATED_WITH_COURSE_AND_ACTOR:
            return $.extend({},state,{studentScoreRelatedWithCourseAndActor:action.text.studentScoreRelatedWithCourseAndActor});
        case GET_COURSE_TASK_LIST_OF_SINGLE_STUDENT_BY_ACTOR:
            return $.extend({},state,{courseTaskListOfSingleStudentByActor:action.text.courseTaskListOfSingleStudentByActor});
        case GET_SUMMARY_COURSE_LIST_BY_ACTOR:
            return $.extend({},state,{summaryCourseListByActor:action.text.summaryCourseListByActor});
        default:
            return state;
    }
}