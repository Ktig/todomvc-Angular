//服务模块   数据的添加,删除,修改,更新功能

/**
 * todoApp.service Module
 *
 * Description
 */
var serviceModule = angular.module('todoApp.service', []);

serviceModule.service('MainService', ['$window', function($window) {

    // console.log($window)

    //所有的列表数据  
    var todos = $window.localStorage['todoMvc'] ? angular.fromJson($window.localStorage['todoMvc']) : [];

    this.getTodos = function() {
        return todos;
    }

    this.save = function() {
        $window.localStorage['todoMvc'] = angular.toJson(todos);
    }

    //添加
    this.addTodo = function(text) {
        //获取当前的时间戳
        var id = new Date().getTime();

        todos.push({ text: text, completed: false, id: id });
        this.save();
    }

    //删除
    this.removeTodo = function(index) {
        todos.splice(index, 1);
        this.save();
    }

    //计算剩余的未完成个数
    this.leftCount = function() {
        var count = 0;
        for (var i = 0; i < todos.length; i++) {
            if (!todos[i].completed) {
                count++;
            }
        }
        return count;
    }

    this.toggleAllCompleted = function(status) {
        for (var i = 0; i < todos.length; i++) {

            //所有条目的完成状态根据全选按钮的状态来切换
            //如果全选按钮的状态是选中状态,那么此时点击时,应该将所有条目的状态改为未完成
            todos[i].completed = status;
        }
        this.save();
    }

    this.existCompleted = function() {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].completed) {
                return true;
            }
        }
        return false;
    }

    //清空已经完成
    this.clearCompleted = function() {

        /*
        var r = [];
        //清空已经完成的 找到所有未完成的
        for (var i = 0; i < todos.length; i++) {
            if (!todos[i].completed) {

                r.push(todos[i]);
            }
        }
        //
        todos = r;
        this.save();
        return todos;
        */

        /*       0 1,2
                [a,c,d]  
                 0,1,2,3    i = 2
        */


        for (var i = 0; i < todos.length; i++) {
            if (todos[i].completed) {
                todos.splice(i, 1);
                i--;
            }
        }
        this.save();

    }


}])
