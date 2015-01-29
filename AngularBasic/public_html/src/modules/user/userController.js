(function () {
	var app = angular.module('userModule', []);

	app.controller('userController', ['$scope', function ($scope) {
			$scope.user = {};
			$scope.showForm = false;
			this.showForm = function () {
				$scope.showForm = true;
			};
			this.save = function () {
				alert("Guardado: " + $scope.user.firstName + " " + $scope.user.lastName);
			};
		}]);

	app.directive('userForm', [function () {
			return {
				restrict: 'E',
				templateUrl: 'src/modules/user/userTemplates.html'
			};
		}]);
})();