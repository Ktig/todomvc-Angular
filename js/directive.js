(function(){
	angular.module('todoApp.directive',[]).directive('focus',['$timeout',function($timeout){
		return {
			link:function($scope,ele,attr){
				$scope.$watch(attr.focus,function (now) {
					if (now) {
						//延迟执行获取焦点的代码,等界面完全刷新后,再执行
						$timeout(function () {
							ele[0].focus();
						},0)
					}
				})

			}
		}
	}])

})()