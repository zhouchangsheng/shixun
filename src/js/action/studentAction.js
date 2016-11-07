/**
 * Created by jerry on 2016/9/24.
 */
/**
 * 学生获取已选课程action
 * */
const STUDENT_GET_COURSE_SELECTED = 'STUDENT_GET_COURSE_SELECTED';

function studentGetCourseSelected(data){
    return{
        type:STUDENT_GET_COURSE_SELECTED,
        text:data
    }
}

export function studentGetCourseSelectedAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data ={courseSelected:responseData};
            dispatch(studentGetCourseSelected(data));
        }
    }
}


/**
 * 学生查看自己的成绩
 * */
const STUDENT_GET_COURSE_SCORE = 'STUDENT_GET_COURSE_SCORE';

function studentGetCourseScore(data){
    return {
        type:STUDENT_GET_COURSE_SCORE,
        text:data
    }
}

export function studentGetCourseScoreAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={courseScoreByStudent:responseData};
            dispatch(studentGetCourseScore(data));
        }
    }
}

