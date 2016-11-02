//控制器模块
(function() {

    /**
     * todoApp.coontoller Module
     *
     * Description
     */
     var controllerModule = angular.module('todoApp.controllers', ['ngRoute','todoApp.service','todoApp.directive']);
    //控制器模块
    controllerModule.controller('MainController', ['$scope', '$location', '$routeParams','MainService', function($scope, $location, $routeParams,MainService) {

        //输入框中的数据
        $scope.text = "";

        //从模块中获取所有的数据
        $scope.todos = MainService.getTodos();

        //添加一项
        $scope.addTodo = function() {

            // console.log('添加内容');
            //获取一个不重复的 id  1.取随机数 2.获取当前时间 3.
            if ($scope.text.length == 0) {
                return
            }

            //使用服务向todos中添加一条数据`
            MainService.addTodo($scope.text);
            
            $scope.text = '';
        }

        //删除一项
        $scope.removeTodo = function( /*id*/ index) {
            MainService.removeTodo(index);
        }

        $scope.toggleCompleted = function () {
            MainService.save();
        }

        //当前编辑的条目的下标
        $scope.editIndex = -1;
        //编辑
        $scope.editTodo = function(e, index) {

            //双击条目时,保存当前点击的条目的下标
            $scope.editIndex = index;
        }

        //保存,修改完毕后保存
        $scope.saveTodo = function() {
            //回车键按下
            //if (event.keyCode == 13) {
                //所有条目设置为非完成状态
                $scope.editIndex = -1;
            //}

        }

        //计算个数
        $scope.leftCount = function() {

        	var count = MainService.leftCount();
            //与上面的判断等价,count=0时是 false,取反就是 true
            $scope.allChecked = !count;
            return count;
        }

        //选择全部
        // var all = true;
        $scope.toggleAll = function() {

        	MainService.toggleAllCompleted(!$scope.allChecked);
        }

       //是否显示清除按钮
        $scope.existCompleted = function() {

            return MainService.existCompleted();
        }
         //清除已经完成
        $scope.clearCompleted = function() {

            MainService.clearCompleted();
        }

        //路由
        $scope.status = $routeParams.status || '';
        switch ($routeParams.status) {
            case 'active':
                $scope.search = { completed: false }
                break;
            case 'completed':
                $scope.search = { completed: true }
                break;
            default:
                $scope.search = {};
                $scope.status = '';
                break;
        }

    }])

})()
