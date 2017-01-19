interface Window {
	skyMapApiLoaded():void;
}
(function() {
	'use strict';

	angular.module('skyMap').service('skyMapGoogleApi', skyMapGoogleApi);

	skyMapGoogleApi.$inject = ['$q'];

	function skyMapGoogleApi($q) {

		var _this = this,
			startedLoading = false,
			defer = $q.defer();

		_this.load = function() {
			loadApi();
			return defer.promise;
		};

		window.skyMapApiLoaded = function() {

			/* also load the infoBox alternative */
			var script = document.createElement('script');
			script.src = 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js';
			

			script.onload = function() {
				defer.resolve();
			};

			document.body.appendChild(script);
			
		};

		function loadApi() {
			if(!startedLoading) {
				var script = document.createElement('script');
				script.src = 'https://maps.googleapis.com/maps/api/js?callback=skyMapApiLoaded';
				document.body.appendChild(script);	

				startedLoading=true;
			}
		}




	}



})();
