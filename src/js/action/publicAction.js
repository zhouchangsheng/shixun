/**
 * Created by jerry on 2016/9/23.
 */
/**
 * 不同身份的角色（教师、公司、学生）获取与自己相关课程的action
 * */
const GET_COURSE_RELATED_WITH_ACTOR = 'GET_COURSE_RELATED_WITH_ACTOR';

function getCourseRelatedWithActor(data){
    return{
        type:GET_COURSE_RELATED_WITH_ACTOR,
        text:data
    }
}

export function getCourseRelatedWithActorAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data = {courseRelatedWithActor:responseData};
            dispatch(getCourseRelatedWithActor(data));
        }
    }
}

/**
 * 不同身份（教师、公司）获取选择自己某课程的所有学生成绩列表action
 * */

const GET_STUDENT_SCORE_RELATED_WITH_COURSE_AND_ACTOR = 'GET_STUDENT_SCORE_RELATED_WITH_COURSE_AND_ACTOR';

function getStudentScoreRelatedWithCourseAndActor (data){
    return{
        type:GET_STUDENT_SCORE_RELATED_WITH_COURSE_AND_ACTOR,
        text:data
    }
}

export function getStudentScoreRelatedWithCourseAndActorAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={studentScoreRelatedWithCourseAndActor:responseData};
            dispatch(getStudentScoreRelatedWithCourseAndActor(data));
        }
    }
}

/**
 * 某课程下某人的提交的所有任务列表 action
 * */
const GET_COURSE_TASK_LIST_OF_SINGLE_STUDENT_BY_ACTOR ='GET_COURSE_TASK_LIST_OF_SINGLE_STUDENT_BY_ACTOR';

function getCourseTaskListOfSingleStudentByActor(data){
    return{
        type:GET_COURSE_TASK_LIST_OF_SINGLE_STUDENT_BY_ACTOR,
        text:data
    }
}

export function getCourseTaskListOfSingleStudentByActorAction(status,responseData){
    let data;
    return(dispatch,getState)=>{
        if(status=='success'){
            data={courseTaskListOfSingleStudentByActor:responseData};
            dispatch(getCourseTaskListOfSingleStudentByActor(data));
        }
    }
}

/**
 * 不同身份（教师、公司、管理员）获取课程汇总 action
 * */
const GET_SUMMARY_COURSE_LIST_BY_ACTOR = 'GET_SUMMARY_COURSE_LIST_BY_ACTOR';

function getSummaryCourseListByActor(data){
    return{
        type:GET_SUMMARY_COURSE_LIST_BY_ACTOR,
        text:data
    }
}

export function getSummaryCourseListByActorAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={summaryCourseListByActor:responseData};
            dispatch(getSummaryCourseListByActor(data));
        }
    }
}
