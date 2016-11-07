/**
 * Created by jerry on 2016/9/24.
 */
/**
 * 学生reducer
 * */
import $ from 'jquery';

const STUDENT_GET_COURSE_SELECTED= 'STUDENT_GET_COURSE_SELECTED';
const STUDENT_GET_COURSE_SCORE = 'STUDENT_GET_COURSE_SCORE';

const InitialState ={
    courseSelected:[],
    courseScoreByStudent:[]
};

export default (state=InitialState,action)=>{
    switch(action.type){
        case STUDENT_GET_COURSE_SELECTED:
            return $.extend({},state,{courseSelected:action.text.courseSelected});
        case STUDENT_GET_COURSE_SCORE:
            return $.extend({},state,{courseScoreByStudent:action.text.courseScoreByStudent});
        default:
            return state;
    }
}