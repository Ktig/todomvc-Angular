(function(window) {
    'use strict';

    /**
     * todoApp Module
     *
     * Description
     */
    var todoApp = angular.module('todoApp', ['ngRoute','todoApp.controllers']);
    //配置路由
    todoApp.config(['$routeProvider',function($routeProvider) {
        $routeProvider.
        when('/',{
            templateUrl:'todo.html',
            controller:'MainController'
        }).
        when('/:status',{
            templateUrl:'todo.html',
            controller:'MainController'
        }).
        otherwise({
            redirectTo:'/'
        })
    }])

})(window);
