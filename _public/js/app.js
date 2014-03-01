"use strict";var App;App=angular.module("app",["ngCookies","ngResource","ngRoute","app.controllers","app.directives","app.filters","app.services","partials"]),App.config(["$routeProvider","$locationProvider",function(e,t){return e.when("/todo",{templateUrl:"/partials/todo.html"}).when("/view1",{templateUrl:"/partials/partial1.html"}).when("/view2",{templateUrl:"/partials/partial2.html"}).otherwise({redirectTo:"/todo"}),t.html5Mode(!1)}]),angular.module("app.controllers",[]).controller("AppCtrl",["$scope","$location","$resource","$rootScope",function(e,t){return e.$location=t,e.$watch("$location.path()",function(t){return e.activeNavId=t||"/"}),e.getClass=function(t){return e.activeNavId.substring(0,t.length)===t?"active":""}}]).controller("MyCtrl1",["$scope",function(e){return e.onePlusOne=2}]).controller("MyCtrl2",["$scope",function(e){return e}]).controller("TodoCtrl",["$scope",function(e){return e.todos=[{text:"learn angular",done:!0},{text:"build an angular app",done:!1}],e.addTodo=function(){return e.todos.push({text:e.todoText,done:!1}),e.todoText=""},e.remaining=function(){var t;return t=0,angular.forEach(e.todos,function(e){return t+=e.done?0:1}),t},e.archive=function(){var t;return t=e.todos,e.todos=[],angular.forEach(t,function(t){return t.done?void 0:e.todos.push(t)})}}]);var DataStore,createDocumentStore,createRelationalStore,createSimpleStore;DataStore="undefined"!=typeof exports&&null!==exports&&exports||(this.DataStore={}),DataStore.create=function(e){switch(e){case"simple":return createSimpleStore();case"relational":return createRelationalStore();case"document":return createDocumentStore();default:return void 0}},createSimpleStore=function(){return{get:function(e){return JSON.parse(localStorage.getItem(JSON.stringify(e)))},set:function(e,t){return localStorage.setItem(JSON.stringify(e),JSON.stringify(t))},"delete":function(e){return localStorage.removeItem(JSON.stringify(e))},count:function(){return localStorage.length},clear:function(){return localStorage.clear()}}},createRelationalStore=function(){var e,t;return e=openDatabase("nwsqldb","1.0","embedded sql database",268435456),t={run:function(t,r){return e.transaction(function(e){return e.executeSql(t,[],function(e,t){var n;return"function"==typeof r?r(function(){var e,r,o;for(o=[],n=e=0,r=t.rows.length;r>=0?r>e:e>r;n=r>=0?++e:--e)o.push(t.rows.item(n));return o}()):void 0})})}}},createDocumentStore=function(){var e,t,r,n;try{return e=require("nedb"),t=require("nw.gui").App.dataPath+"/nedb",n={collection:function(t){return new e({filename:"/"+t,autoload:!0})}}}catch(o){return r=o,console.error("MODULE_NOT_FOUND"===r.code?"NeDB not found. Try `npm install nedb --save` inside of `/app/assets`.":r)}},angular.module("app.directives",["app.services"]).directive("appVersion",["version",function(e){return function(t,r){return r.text(e)}}]),angular.module("app.filters",[]).filter("interpolate",["version",function(e){return function(t){return String(t).replace(/\%VERSION\%/gm,e)}}]),angular.module("app.services",[]).factory("version",function(){return"0.1"});