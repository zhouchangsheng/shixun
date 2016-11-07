/**
 * Created by jerry on 2016/9/23.
 */
/**
 * 管理员导入公司action
 * */

const ADMIN_ADD_COMPANY = 'ADMIN_ADD_COMPANY';

function adminAddCompany(data){
    return{
        type:ADMIN_ADD_COMPANY,
        text:data
    }
}

export function adminAddCompanyAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={companyAdded:responseData};
            dispatch(adminAddCompany(data))
        }
    }
}

/**
 * 管理员导入学生action
 * */
const ADMIN_ADD_STUDENT = 'ADMIN_ADD_STUDENT';

function adminAddStudent(data){
    return{
        type:ADMIN_ADD_STUDENT,
        text:data
    }
}

export function adminAddStudentAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={studentAdded:responseData};
            dispatch(adminAddStudent(data))
        }
    }
}

/**
 * 管理员导入教师action
 * */
const ADMIN_ADD_TEACHER = 'ADMIN_ADD_TEACHER';

function adminAddTeacher(data){
    return{
        type:ADMIN_ADD_TEACHER,
        text:data
    }
}

export function adminAddTeacherAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={teacherAdded:responseData};
            dispatch(adminAddTeacher(data))
        }
    }
}



/**
 * 管理员获取专业action
 * */
const ADMIN_GET_PROFESSION = "ADMIN_GET_PROFESSION";

function adminGetProfession(data) {
    return {
        type: ADMIN_GET_PROFESSION,
        text: data
    }
}

export function adminGetProfessionAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={professionGot:responseData};
            dispatch(adminGetProfession(data));
        }
    }
}

/**
 * 管理员获取教师action
 * */
const ADMIN_GET_TEACHER = "ADMIN_GET_TEACHER";

function adminGetTeacher(data) {
    return {
        type: ADMIN_GET_TEACHER,
        text: data
    }
}

export function adminGetTeacherAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={teacherGot:responseData};
            dispatch(adminGetTeacher(data));
        }
    }
}

/**
 * 管理员获取公司action
 * */
const ADMIN_GET_COMPANY = "ADMIN_GET_COMPANY";

function adminGetCompany(data) {
    return {
        type: ADMIN_GET_COMPANY,
        text: data
    }
}

export function adminGetCompanyAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data={companyGot:responseData};
            dispatch(adminGetCompany(data));
        }
    }
}

/**
 * 管理员发布课程action
 * */
const ADMIN_RELEASE_COURSE = 'ADMIN_RELEASE_COURSE';
function adminReleaseCourse(data){
    return{
        type:ADMIN_RELEASE_COURSE,
        text:data
    }
}

export function adminReleaseCourseAction(status,responseData){
    let data;
    return (dispatch,getState)=>{
        if(status=='success'){
            data = {courseReleased:responseData};
            dispatch(adminReleaseCourse(data));
        }
    }
}