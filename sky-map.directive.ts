declare var google:any;
(function() {
	'use strict';

	angular.module('skyMap').directive('skyMap', skyMapDirective);

	skyMapDirective.$inject = [];

	function skyMapDirective() {
		var directive = {
			restrict:'E',
			controller:skyMapCtrl
		};

		var apiLoaded = false,
			loadingApi = false;

		skyMapCtrl.$inject = ['$element','skyMapGoogleApi','$window'];

		function skyMapCtrl($element, skyMapGoogleApi, $window) {
			var map,
				mapEle = document.createElement('div'),
				point,
				mapOptions:any = {
					disableDefaultUI:true,
					scrollwheel:false,
					zoomControl:true,
					zoomControlOptions: {},
					styles:[{
						"featureType": "administrative.province",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [
							{
								"hue": "#FFA800"
							},{
								"gamma": 1
							}
						]
					},{
						"featureType": "landscape.man_made",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"gamma": "0.8"
							},{
								"weight": "1.00"
							}
						]
					},{
						"featureType": "landscape.natural",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"gamma": "1.8"
							}
						]
					},{
						"featureType": "poi",
						"elementType": "all",
						"stylers": [
							{
								"hue": "#679714"
							},{
								"saturation": 33.4
							},{
								"lightness": -25.4
							},{
								"gamma": 1
							}
						]
					},{
						"featureType": "road.highway",
						"elementType": "all",
						"stylers": [
							{
								"hue": "#53FF00"
							},{
								"saturation": -73
							},{
								"lightness": 40
							},{
								"gamma": 1
							}
						]
					},{
						"featureType": "road.arterial",
						"elementType": "all",
						"stylers": [
							{
								"hue": "#FBFF00"
							},{
								"gamma": 1
							}
						]
					},{
						"featureType": "road.local",
						"elementType": "all",
						"stylers": [
							{
								"hue": "#00FFFD"
							},{
								"lightness": 30
							},{
								"gamma": 1
							}
						]
					},{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"hue": "#00BFFF"
							},{
								"saturation": 6
							},{
								"lightness": 8
							},{
								"gamma": 1
							}
						]
					}
				]
			};

			init();

			function init() {
				// Append the mapcontainer element
				$element[0].appendChild(mapEle);

				// Load the api
				skyMapGoogleApi.load().then(function() {

					// Then set options
					mapOptions.center = new google.maps.LatLng(parseFloat($element[0].getAttribute('lat') || 55.672796),parseFloat($element[0].getAttribute('lng') || 12.547549));
					mapOptions.zoom = parseInt($element[0].getAttribute('zoom')) || 14;
					mapOptions.zoomControlOptions.position = google.maps.ControlPosition.TOP_RIGHT;

					// And initiate the map
					map = new google.maps.Map(mapEle,mapOptions);

					point = new google.maps.Marker({
						position: new google.maps.LatLng($element[0].getAttribute('lat'),$element[0].getAttribute('lng')),
						icon: {
							url: $window.location.origin+'/img/6138na/point.png',
							scaledSize: new google.maps.Size(54, 54),
							origin: new google.maps.Point(0,0),
							anchor: new google.maps.Point(27,27)
						},
						map: map
					});




				});

			}

		}

		return directive;
	}
})();

