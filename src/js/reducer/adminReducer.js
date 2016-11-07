/**
 * Created by jerry on 2016/9/23.
 */
/**
* 管理员reducer
* */
import $ from 'jquery';

const ADMIN_ADD_COMPANY = 'ADMIN_ADD_COMPANY';
const ADMIN_ADD_STUDENT = 'ADMIN_ADD_STUDENT';
const ADMIN_ADD_TEACHER = 'ADMIN_ADD_TEACHER';
const ADMIN_GET_PROFESSION = 'ADMIN_GET_PROFESSION';
const ADMIN_RELEASE_COURSE = 'ADMIN_RELEASE_COURSE';
const ADMIN_GET_TEACHER = 'ADMIN_GET_TEACHER';
const ADMIN_GET_COMPANY = 'ADMIN_GET_COMPANY';

const InitialState = {
    professionGot:[],
    teacherGot:[],
    companyGot:[],
    companyAdded:[],
    teacherAdded:[],
    studentAdded:[],
    courseReleased:[],
};

export default (state=InitialState,action)=>{
    switch(action.type){
        case ADMIN_ADD_COMPANY:
            return $.extend({},state,{companyAdded:action.text.companyAdded});
        case ADMIN_ADD_STUDENT:
            return $.extend({},state,{studentAdded:action.text.studentAdded});
        case ADMIN_ADD_TEACHER:
            return $.extend({},state,{teacherAdded:action.text.teacherAdded});
        case ADMIN_GET_PROFESSION:
            return $.extend({},state,{professionGot:action.text.professionGot});
        case ADMIN_GET_TEACHER:
            return $.extend({},state,{teacherGot:action.text.teacherGot});
        case ADMIN_GET_COMPANY:
            return $.extend({},state,{companyGot:action.text.companyGot});
        case ADMIN_RELEASE_COURSE:
            return $.extend({},state,{courseReleased:action.text.courseReleased});
        default :
            return state;
    }
}