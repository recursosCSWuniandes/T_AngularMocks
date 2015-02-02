(function() {
	var crud = angular.module('CrudModule');

	crud.controller('CRUDController', ['APIClient', '$scope', function (APIClient, $scope) {
			var self = this;
			$scope.currentRecord = {};
			this.editMode = false;
			this.records = [];
			this.fetchRecords = function () {
				APIClient.query(function (data) {
					self.records = data.records;
					console.log(data);
					$scope.currentRecord = {};
					self.editMode = false;
				});
			};
			this.fetchRecords();
			this.createRecord = function () {
				this.editMode = true;
				$scope.currentRecord = {};
			};
			this.saveRecord = function () {
				if ($scope.currentRecord.id) {
					APIClient.update({id: $scope.currentRecord.id}, $scope.currentRecord, function () {
						self.fetchRecords();
					});
				} else {
					APIClient.save($scope.currentRecord, function () {
						self.fetchRecords();
					});
				}
			};
			this.deleteRecord = function (id) {
				var record = new APIClient();
				record.id = id;
				record.$delete(function () {
					self.fetchRecords();
				});
			};
			this.editRecord = function (id) {
				APIClient.get({id: id}, function (data) {
					self.editMode = true;
					$scope.currentRecord = data;
				});
			};
		}]);
})();