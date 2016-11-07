/**
 * Created by jerry on 2016/9/18.
 */
import $ from 'jquery';
import Cookie from 'react-cookie';
import { Message,Modal } from 'antd';


/**
 * 登录注销action
 * */
import * as SignAction from '../action/signAction';
import * as SignOutAction from '../action/signOutAction';

/**
 * admin角色action集合
 * */
import * as AdminAction from '../action/adminAction';

/**
 * teacher角色action集合
 * */
import * as TeacherAction from '../action/teacherAction';

/**
 * student角色action集合
 * */
import * as StudentAction from '../action/studentAction';

/**
 * 公共action集合
 * */
import * as PublicAction from '../action/publicAction';



/**
 * 公共url
 * */

//开发环境
const IP = "http://192.168.31.37/";
const projectName ='shixun/shixun';

//生产环境
/*const IP = location.href.substring(0,location.href.lastIndexOf('/'));
const projectName = "";*/

const projectPath = "./";
export const serviceURL = IP + projectName+"/api/";


const timeout = 20000;



/**
 * post服务接口
 * @param spinTip 加载提示。默认true
 * @param spinTipText 加载提示内容
 * @param url 服务地址。不能为空
 * @param data 发送的数据json对象。不能为空
 * @param funcHandler 函数句柄
 * @param errorTipText 错误信息提示内容
 * */
function service(spinTip,spinTipText,url,data,funcHandler,errorTipText){
    if(url==undefined){
        Modal.warning({
            title: '错误提示',
            content: '服务地址没找到',
        });
        return;
    }

    spinTipText = spinTipText == undefined ? "请求服务中...":spinTipText;
    errorTipText = errorTipText==undefined?"请求服务失败":errorTipText;

    Message.destroy();
    spinTip?Message.loading(spinTipText,0):"";

    $.ajax({
        type:'POST',
        contentType:'application/json;charset=utf-8',
        url:url,
        data:JSON.stringify(data),
        timeout:timeout,
        dataType:'json',
        success:function(data){
            Message.destroy();
            funcHandler ? funcHandler(data):"";
        },
        error: function(xhr,status,error){
            Message.destroy();
            if(status=="timeout"){
                spinTip ? Message.warning(errorTipText+'，网络已超时', 3):"";
            }else if(status=="error"){
                spinTip ? Message.warning(errorTipText+"，网络错误", 3):"";
            }else if(status=="abort"){
                spinTip ? Message.warning(errorTipText+"，网络中断", 3):"";
            }else if(status=="parserrror"){
                spinTip ? Message.warning(errorTipText+"，解析错误", 3):"";
            }else{
                spinTip? Message.warning(errorTipText+'，其他错误！', 3):"";
            }

        }
    })
}

/**
 * 含文件的表单提交服务
 * @param spinTip 加载提示。默认true
 * @param spinTipText 加载提示内容
 * @param info 服务资源句柄
 * @param funcHandler 函数句柄
 * */
function serviceUpload(spinTip,spinTipText,info,funcHandler,errorTipText){
    errorTipText = errorTipText==undefined?"导入失败":errorTipText;
    Message.destroy();
    spinTip?Message.loading(spinTipText,0):'';
    if (info.file.status === 'done') {
        if(info.file.response!=undefined){
            if(info.file.response.status=='success'){
                funcHandler?funcHandler(info):"";
            }else{
                Message.destroy();
                Message.error(info.file.name+errorTipText);
            }
        }
    } else if (info.file.status === 'error') {
        Message.destroy();
        Message.error(info.file.name+ errorTipText+', 网络错误  或  地址以更改',3);
    }
}



/**
 * 检查用户并保存到store
 * @param loginForm 数据对象{username:value,password:value,actor,value}
 * @param spinTip 是否显示验证过程提示信息,默认提示
 * @return dispatch signAction 改变用户状态
 * */
exports.checkAccountAndSave2Store =function(loginForm,spinTip=true){
    return (dispatch,getState)=>{
        var requestData = {method:"verifyUser",param:loginForm};
        service(true,"正在验证中...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                var date = new Date();
                date.setDate(date.getDate()+2);
                Cookie.save('uid',loginForm.username,{expires:date,path:'/'});
                Cookie.save('uactor',loginForm.actor,{expires:date,path:'/'});
                spinTip?Message.destroy():'';
                spinTip? Message.success('登录成功', 1):"";
                window.location = projectPath;
            }else{
                spinTip?Message.destroy():'';
                spinTip? Message.warning('验证失败，用户名或密码错误', 3):"";
            }
        },"验证失败");
    }
};

/**
 * 注销 （删除cookie）改变name状态
 * @return 执行dispatch  signOutAction改变state中用户状态
 * */
exports.signOut = function(){
    return (dispatch,getState)=>{
        Object.keys(Cookie.select(/^u.*/i)).forEach(name => Cookie.remove(name, { path: '/' }));
        dispatch(SignOutAction.signOutAction());
        window.location = projectPath;
    }
};

/**
 * 修改密码
 * @param modifyForm 数据对象{oldPassword: value,newPassword:value}
 * @param spinTip 可选参数，是否提示修改过程提示信息 默认提示
 * @return 无
 * */
exports.modifyPWD = function(modifyForm,spinTip=true){
    var requestData = {
        method:"modifyUserPwd",
        param:modifyForm
    };
    requestData.param.actor = Cookie.load("uactor");
    requestData.param.username = Cookie.load("uid");

    service(true,"正在修改中...",serviceURL,requestData,function(responseData){
        if(responseData.status=='success'){
            spinTip?Message.destroy():'';
            spinTip? Message.success('修改成功！', 1):"";
            console.log(responseData);
        }else{
            spinTip?Message.destroy():'';
            spinTip? Message.warning('验证失败，原始密码错误', 3):"";
        }
    });
};



/**
 * 导入公司
 * @param info 用到antd中Upload组件onChange函数中的网络资源信息
 * @param spinTip 是否显示导入过程提示信息,默认提示
 * @return  执行dispatch adminAddCompanyAction改变state中的添加的公司列表
 * */
exports.addCompanyViaFile = function(info,spinTip=true){
    return (dispatch,getState)=>{
        serviceUpload(spinTip,"正在导入...",info,function(info){
            let data = [];
            info.file.response.data.map(function (item) {
                data.push({
                    'key': item.id,
                    'name': item.name,
                    'contact': item.contact,
                    'address': item.address
                });
            });
            spinTip?Message.destroy():'';
            spinTip?Message.loading("导入成功",1):'';
            dispatch(AdminAction.adminAddCompanyAction('success',data));
            dispatch(getWholeCompany(false));
        });
    }
};

/**
 * 导入教师
 * @param info 用到antd中Upload组件onChange函数中的网络资源信息
 * @param spinTip 是否显示导入过程提示信息,默认提示
 * @return  执行dispatch adminAddTeacherAction改变state中的添加的教师列表
 * */
exports.addTeacherViaFile = function(info,spinTip=true){
    return (dispatch,getState)=>{
        serviceUpload(spinTip,"正在导入...",info,function(info){
            let data=[];
            info.file.response.data.map(function(item){
                data.push({
                    key:item.id,
                    workerId:item.workerId,
                    name:item.name,
                    profession:item.profession,
                    depart:item.depart});
            });
            spinTip?Message.destroy():'';
            spinTip?Message.loading("导入成功",1):'';
            dispatch(AdminAction.adminAddTeacherAction('success',data));
            dispatch(getWholeTeacher(false));
            dispatch(getWholeProfession(false));
        });


    }
};

/**
 * 导入学生
 * @param info 用到antd中Upload组件onChange函数中的网络资源信息
 * @param spinTip 是否显示导入过程提示信息,默认提示
 * @return  执行dispatch adminAddStudentAction改变state中的添加的学生列表
 * */
exports.addStudentViaFile = function(info,spinTip=true){
    return (dispatch,getState)=>{
        serviceUpload(spinTip,"正在导入...",info,function(info){
            let data = [];
            info.file.response.data.map(function(item){
                data.push({
                    key:item.id,
                    studentId:item.studentId,
                    name:item.name,
                    profession:item.profession,
                    depart:item.depart});
            });
            spinTip?Message.destroy():'';
            spinTip?Message.loading("导入成功",1):'';
            dispatch(AdminAction.adminAddStudentAction('success',data));
        });
    }
};

/**
 * 获取所有专业,供admin发布课程使用
 * @param  spinTip 是否显示错误提示，默认显示
 * @return  返回值为 对象数组[{profession:value},{profession:value},..]或空数组[]
 * */
export function getWholeProfession(spinTip=false){
    return (dispatch,getState)=>{
        var requestData = {
            method: "selectAllProfession",
            param: {}
        };
        service(spinTip, "获取专业...", serviceURL, requestData, function (responseData) {
            if (responseData.status == 'success') {
                dispatch(AdminAction.adminGetProfessionAction('success',responseData.data));
            }
        },"获取专业失败");
    }

};


/**
 * 获取所有教师,供admin发布课程使用
 * @param  spinTip 是否显示错误提示，默认显示
 * @return 返回值得类型按照antd下cascader的options格式对象数组或空数组[]
 * */
export function getWholeTeacher(spinTip=false){
    return (dispatch,getState)=> {
        var requestData = {
            method: "selectAllDepart",
            param: {}
        };
        service(spinTip, "获取学院...", serviceURL, requestData, function (responseData) {
            if(responseData.status=='success'){
                let teacherGot=[];

                responseData.data.map(function(item){
                    var children1={value:item,label:item};
                    var children2box=[];

                    var requestData2={
                        method:"selectTeacherByCondition",
                        param:{depart:item}
                    };
                    service(spinTip,"获取教师...",serviceURL,requestData2,function(responseData2){
                        if(responseData2.status=='success'){
                            responseData2.data.map(function(item){
                                var children2 = {value:item.workerId,label:item.name};
                                children2box.push(children2);
                            });
                        }
                    });

                    children1.children=children2box;
                    teacherGot.push(children1);
                });
                dispatch(AdminAction.adminGetTeacherAction('success',teacherGot))
            }

        },"获取教师失败");
    };
};

/**
 * 获取所有公司，供admin发布课程使用
 * @param  spinTip 是否显示错误提示，默认显示
 * @return  返回对象数组[{title:value,value:value},{},...]或空数组
 * */
export function getWholeCompany(spinTip=false){
    return  (dispatch,getState)=>{
        var requestData = {
            method:"selectCompanyByCondition",
            param:{}
        };
        service(spinTip,"获取公司...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                dispatch(AdminAction.adminGetCompanyAction('success',responseData.data))
            }
        },"获取公司失败");
    }
};

/**
 * 上传发布课程信息
 * @param spinTip 是否显示上传过程提示信息,默认提示
 * @param info 用到antd中Upload组件onChange函数中的网络资源信息
 * @param infoFormData  调用者传递的表单数据对象
 * @return : 执行dispatch adminReleaseCourseAction更新state中的添加的课程列表
 * */
exports.releaseCourseInfoWithFile = function(info,infoFormData,spinTip=true){
    return (dispatch,getState)=>{
        serviceUpload(spinTip,"正在提交",info,function (info) {
            if(info.file.response.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.loading("导入成功",1):'';
                infoFormData.addition=info.file.response.data[0];
                dispatch(AdminAction.adminReleaseCourseAction('success',[infoFormData]));
            }else{

            }
        });

    }
};

/**
 * 不同身份的角色（教师、公司、学生）获取与自己相关课程
 * @param spinTip 是否显示获取过程提示信息,默认不提示
 * @param filter 为过滤参数，筛选出满足条件的课程,默认为空
 * @return 执行dispatch getCourseRelatedWithActorAction更新state中课程列表
 * */
exports.getCourseRelatedWithActor=function(filter={},spinTip=false){
    return (dispatch,getState)=>{
        filter.actor= ""+Cookie.load("uactor");
        filter.username = ""+Cookie.load("uid");
        var requestData={
            method:"selectCourseByCondition",
            param:filter
        };


        service(spinTip,"正在获取...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("获取成功！",1):'';
                dispatch(PublicAction.getCourseRelatedWithActorAction('success',responseData.data));
            }
        },"获取失败");

    }
};



/**
 * 教师获取某课程的所有任务
 * @param  courseId 指定获取课程任务的课程号
 * @param spinTip 是否显示获取过程提示信息,默认提示
 * @return  执行dispatch teacherGetSelfCourseWholeTaskAction 更新某个课程的任务列表
 * */
export function getCourseTaskReleased(courseId,spinTip=true){
    return (dispatch,getState)=>{

        console.log(courseId);

        var requestData = {
            method:"selectTaskByCondition",
            param:{
                courseId:courseId
            }
        };

        service(spinTip,"正在获取任务...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("加载成功！",1):'';
                dispatch(TeacherAction.teacherGetSelfCourseWholeTaskAction('success',responseData.data));
            }
        },"获取发布任务失败");

    }
};

/**
 * 教师添加某课程任务
 * @param info 用到antd中Upload组件onChange函数中的网络资源信息
 * @param spinTip 是否显示添加过程提示信息,默认提示
 * @param courseId 指定获取课程任务的课程号
 * @return  执行dispatch adminAddStudentAction改变state中的添加的学生列表
 * */
exports.addCourseTaskWithFile = function (info,courseId,spinTip=true){
    return (dispatch,getState)=>{
        serviceUpload(spinTip,"正在添加....",info,function(info){
            if(info.file.response.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success('任务发布成功',1):'';

                dispatch(getCourseTaskReleased(courseId,false));
            }else{
            }
        },"任务发布失败");


    }
};


/**
 *获取某角色（教师或公司）下某课程的所有学生分数列表
 * @param  spinTip 是否显示获取过程提示信息,默认提示
 * @param  courseId 必须参数，某个课程的ID
 * @return  执行dispatch getStudentScoreRelatedWithCourseAndActorAction 更新所有学生分数列表
 * */
export function getStudentScoreRelatedWithCourseAndActor(courseId,spinTip=true){
    return (dispatch,getState)=>{
        var requestData = {
            method:"selectScoreByCondition",
            param:{
                actor:""+Cookie.load("uactor"),
                username:""+Cookie.load("uid"),
                courseId:courseId
            }
        };
        service(spinTip,"正在加载学生成绩...",serviceURL,requestData,function (responseData) {
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("加载成功！",1):'';
                dispatch(PublicAction.getStudentScoreRelatedWithCourseAndActorAction('success',responseData.data));
            }
        },"获取学生成绩失败");

    }
}

/**
 * 保存老师或公司对学生评估的成绩
 * @param  spinTip 是否显示保存过程提示信息,默认提示
 * @param  scoreData 为修改的学生成绩对象数组
 * */
exports.saveStudentScoreEvaluatedByActor = function(scoreData,spinTip=true){
    return (dispatch,getState)=>{
        scoreData.actor=""+Cookie.load("uactor");
        var requestData={
            method:"updateScoreByCondition",
            param:scoreData
        };

        var courseId = scoreData.courseId;

        service(spinTip,"正在保存中...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("保存成功！",1):'';
                dispatch(getStudentScoreRelatedWithCourseAndActor(courseId,false));
            }
        },"保存失败");

    }
};


/**
 * 获取学生已选的课程
 * @param  spinTip 参数是否显示获取状态，默认不显示
 * @return  dispatch studentGetCourseSelectedAction 更新已选的课程
 * */
export function getCourseSelected(spinTip=false){
    return (dispatch,getState)=>{
        var requestData={
            method:"selectStudentCourseByCondition",
            param:{
                username:""+Cookie.load("uid"),
                actor:""+Cookie.load("uactor")
            }
        };

        service(spinTip,"正在获取...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("获取成功！",1):'';
                dispatch(StudentAction.studentGetCourseSelectedAction('success',responseData.data));
            }
        },"获取失败");

    }
}

/**
 * 学生退课
 * @param spinTip 参数是否显示退课状态，默认显示
 * @param removeCourseData 要退课的对象数据
 * @return  dispatch getCourseSelected 更新已选的课程
 * */
exports.removeCourseSelected = function(removeCourseData,spinTip=true){
    return (dispatch,getState)=>{
        var requestData ={
            method:"deleteStudentCourseById",
            param:{
                stuCourseId:removeCourseData
            }
        };

        service(spinTip,"正在退选...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("退选成功",1):'';
                dispatch(getCourseSelected(false));
            }
        },"退选失败");

    }
};

/**
 * 学生选课
 * @param spinTip 参数是否显示退课状态，默认显示
 * @param  submitCourseData 要退课的对象数据
 * */
exports.submitSelectCourse = function(submitCourseData=[],spinTip = true){
    return (dispatch,getState)=>{
        var requestData ={
            method:"insertStudentCourse",
            param:{
                studentId:""+Cookie.load("uid"),
                actor:""+Cookie.load("uactor"),
                courseId:submitCourseData
            }
        };

        service(spinTip,"正在提交...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("提交成功",1):'';
                dispatch(getCourseSelected(false));
            }
        },"提交失败");

    }
};

/**
 * 获取某课程下某学生所提交的所有任务
 * @param spinTip 参数是否显示获取状态，默认显示
 * @param  courseId 必须参数 该课程的ID
 * @param  studentId 必须参数 该课程学生的学号
 * */
exports.getCourseTaskListOfSingleStudentByActor = function(studentId,courseId,spinTip=true){
    return (dispatch,getState)=>{
        var requestData = {
            method:"selectTaskByCondition",
            param:{
                courseId:courseId,
                studentId:studentId
            }
        };

        service(spinTip,"正在加载任务...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("加载成功",1):'';
                dispatch(PublicAction.getCourseTaskListOfSingleStudentByActorAction('success',responseData.data));
            }
        },"加载任务失败");

    }
};

/**
 * 课程汇总（教师、公司、管理员）
 * @param spinTip 参数是否显示获取状态，默认显示
 * @param filter 过滤参数例如（?filter1=value1&filter2=value2）
 * */
exports.getSummaryCourseList = function(filter={},spinTip=true){
    return (dispatch,getState)=>{

        filter.actor=Cookie.load("uactor");
        filter.username=Cookie.load("uid");
        var requestData={method:"selectSummaryByCondition",param:filter};
        service(spinTip,"正在加载...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                Message.destroy();
                spinTip?Message.success("加载成功",1):'';
                dispatch(PublicAction.getSummaryCourseListByActorAction('success',responseData.data));
            }
        },"获取失败");

    }
};

/**
 * 学生查看成绩
 * @param spinTip 参数是否显示获取状态，默认显示
 * @return  dispatch studentGetCourseScoreAction 更新成绩列表
 * */
exports.getCourseScoreByStudent=function(spinTip=true){
    return (dispatch,getState)=>{
        var requestData = {
            method:"selectScoreByCondition",
            param:{
                username:""+Cookie.load("uid"),
                actor:""+Cookie.load("uactor")
            }
        };
        service(spinTip,"正在获取...",serviceURL,requestData,function(responseData){
            if(responseData.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.success("加载成功",1):'';
                dispatch(StudentAction.studentGetCourseScoreAction('success',responseData.data));
            }
        },"获取失败");
    }
};


/**
 * 学生上传课程任务
 * @param info 用到antd中Upload组件onChange函数中的网络资源信息
 * @param spinTip 是否显示导入过程提示信息,默认提示
 * */
exports.uploadCourseTaskByStudent = function(info,spinTip=true){
    return (dispatch,getState)=>{
        serviceUpload(spinTip,"正在上传...",info,function(info){
            if(info.file.response.status=='success'){
                spinTip?Message.destroy():'';
                spinTip?Message.loading("上传成功",1):'';
            }else{

            }
        },"上传失败");
    }
};
