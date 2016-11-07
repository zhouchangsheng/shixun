/**
 * Created by jerry on 2016/9/5.
 */

import  '../css/antd.modify.css';
import  '../css/essential.css';



import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Router from './router/Router';
import {hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import Cookie from 'react-cookie';

const getInitialState=()=>{
    if(Cookie.load('uid')){
        return {username:{name:Cookie.load('uid'),actor:Cookie.load('uactor')}};
    }else{
        return {username:{name:'anonymous',actor:''}}
    }

    };
const store = configureStore(getInitialState());


const render= ()=>ReactDOM.render(
    <Provider store={store} >
        <Router   history={hashHistory}/>
    </Provider>
    ,document.getElementById("react-content")
);


render();
store.subscribe(render);

