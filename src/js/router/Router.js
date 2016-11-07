/**
 * Created by jerry on 2016/9/16.
 */
import React from 'react';
import {Router ,Route,hashHistory,IndexRedirect} from 'react-router';
import Cookie from 'react-cookie';

import Anonymous from '../component/Anonymous/index'

import Admin from '../component/admin/index';

import Teacher from '../component/teacher/index';
import Student from '../component/student/index';
import Company from '../component/company/index';

const actor =Cookie.load('uactor');
const routeAnonymous = <Route path="/" ><IndexRedirect  to="anonymous"/><Route path="anonymous"  component={Anonymous} /></Route>;
const routeAdmin = <Route path="/" ><IndexRedirect  to="admin"/><Route path="admin" component={Admin} /></Route>;
const routeTeacher = <Route path="/" ><IndexRedirect  to="teacher"/><Route path="teacher" component={Teacher} /></Route>;
const routeStudent = <Route path="/" ><IndexRedirect  to="student"/><Route path="student" component={Student} /></Route>;
const routeCompany = <Route path="/" ><IndexRedirect  to="company"/><Route path="company" component={Company} /></Route>;

const route=(actor==""||actor==undefined)?routeAnonymous :actor=="3"?routeTeacher:actor=="1"?routeAdmin:actor=="2"?routeCompany:actor=="4"?routeStudent:"";

class RouteContainer extends React.Component{
    render() {
        return (
            <Router history={hashHistory} >
                {
                    route
                }
            </Router>
        )
    }
}

export  default RouteContainer;
