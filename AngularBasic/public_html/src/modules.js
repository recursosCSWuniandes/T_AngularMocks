(function () {
	var userModule = angular.module('userModule', ['MockModule','CrudModule']);

	userModule.constant('myConfig', {
		host: "localhost",
		port: "8383",
		context: "/AngularBasic/webresources/User"
	});
	
	userModule.config(['myConfig', 'apiUrlFactoryProvider', function (myConfig, apiUrlFactoryProvider) {
			apiUrlFactoryProvider.setUrlParameters(myConfig);
		}]);

	userModule.config(['myConfig', 'MockModule.urlValueProvider', function (myConfig, mockURLProvider) {
			mockURLProvider.setUrlParameters(myConfig);
		}]);
})();