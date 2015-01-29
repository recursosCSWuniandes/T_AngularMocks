(function(){
	var mocksModule = angular.module('MockModule');
	
	mocksModule.provider('MockModule.urlValue', function(){
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
})();