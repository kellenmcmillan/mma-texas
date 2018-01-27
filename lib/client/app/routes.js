'use strict';

angular.module('routeController', [
  'ngRoute',
  'ngResource',
  'rootCtrl',
  'colorPalette',
  'landing'
])

.config(function ($routeProvider, $locationProvider) {

	$routeProvider

	// frontend routes
	.when('/', {
		templateUrl: 'application/landing/partials/landing.html',
		controller: 'landingPageController'
	});
	// frontend routes

	//fallback when no routes are matched
	// .otherwise({
	// 	redirectTo: '/'
	// });
	//fallback when no routes are matched

	$locationProvider.hashPrefix('');

	// use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});
});







