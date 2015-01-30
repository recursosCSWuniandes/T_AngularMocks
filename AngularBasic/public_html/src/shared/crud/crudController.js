(function() {
	var crud = angular.module('CrudModule');

	crud.controller('CRUDController', ['APIClient', function (APIClient) {
			var self = this;
			this.currentRecord = {};
			this.editMode = false;
			this.records = [];
			this.fetchRecords = function () {
				APIClient.query(function (data) {
					self.records = data.records;
					self.currentRecord = {};
					self.editMode = false;
				});
			};
			this.fetchRecords();
			this.createRecord = function () {
				this.editMode = true;
				this.currentRecord = {};
			};
			this.saveRecord = function () {
				if (this.currentRecord.id) {
					APIClient.update({id: this.currentRecord.id}, this.currentRecord, function () {
						self.fetchRecords();
					});
				} else {
					APIClient.save(this.currentRecord, function () {
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
					self.currentRecord = data;
				});
			};
		}]);
})();