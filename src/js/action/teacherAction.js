/**
 * Created by jerry on 2016/9/23.
 */
/**
 * 老师获取自己某门课的所有任务action
 * */
const TEACHER_GET_SELF_COURSE_WHOLE_TASK='TEACHER_GET_SELF_COURSE_WHOLE_TASK';

function teacherGetSelfCourseWholeTask(data){
    return{
        type:TEACHER_GET_SELF_COURSE_WHOLE_TASK,
        text:data
    }
}

export function teacherGetSelfCourseWholeTaskAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data = {courseTaskReleased:responseData};
            dispatch(teacherGetSelfCourseWholeTask(data));
        }
    }
}

