'use strict';

angular.module('routeController', [
  'ngRoute',
  'ngResource',
  'rootCtrl',
  'colorPalette',
  'landing',
  // ,
  // 'info',
  'announcement',
  // 'spotlight',
  'login',
  'lightweight',
  'userVault'
])

.config(function ($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'application/landing/partials/landing.html',
		controller: 'landingPageController'
	})
	// .when('/gallery/:url_param', {
	// 	templateUrl: 'spa/pages/gallery/partials/folder.html',
	// 	controller: 'folderController'
	// })
	// .when('/gallery', {
	// 	templateUrl: 'spa/pages/gallery/partials/folders.html',
	// 	controller: 'directoryController'
	// })
	// .when('/projects/:url_param', {
	// 	templateUrl: 'spa/pages/projects/partials/projects.html',
	// 	controller: 'projectsController'
	// })
	// .when('/info/:pageId', {
	// 	templateUrl: 'spa/pages/info/partials/info-template.html',
	// 	controller: 'infoController'
	// })
	.when('/announcement/:pageId', {
		templateUrl: 'spa/pages/announcement/partials/announcement-template.html',
		controller: 'announcementController'
	})
	// .when('/spotlight/:pageId', {
	// 	templateUrl: 'spa/pages/spotlight/partials/spotlight-template.html',
	// 	controller: 'spotlightController'
	// })
	.when('/login', {
		templateUrl: 'application/pages/authentication/partials/login.html',
		controller: 'loginController',
		resolve: {
            is_logged_in: function(firebase, $rootScope, $route, $location, $q) {
            	var deferred = $q.defer();
            	$rootScope.auth.$onAuthStateChanged(function(user) {
            		if (user != null) {
            			$location.path("/");
            			$rootScope.$on('$locationChangeSuccess', function (next, current) {
                    		deferred.resolve();
                		});
            		} else {
            			deferred.resolve();
            		};
            	});
            },
        }
	})

	//fallback when no routes are matched
	.otherwise({
		redirectTo: '/'
	});
	//fallback when no routes are matched


	$locationProvider.hashPrefix('');

	// use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});
});







