(function() {
	var crud = angular.module('CrudModule');

	crud.provider('apiUrlFactory', function () {
		var config = false;
		this.setUrlParameters = function (value) {
			config = value;
		};
		this.$get = ['$location', function ($location) {
				if (config.host === 'localhost') {
					config.host = $location.host();
				}
				return 'http://' + config.host + ':' + config.port + config.context;
			}];
	});

	crud.factory('APIClient', ['$resource', 'apiUrlFactory', function ($resource, apiUrlFactory) {
		return $resource(apiUrlFactory + '/:id', {id: "@id"}, {
			update: {method: 'PUT'},
			query: {method: 'GET', isArray: false}
		});
	}]);
})();