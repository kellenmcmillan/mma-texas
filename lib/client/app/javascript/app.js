'use strict';

var lightweightApp = angular.module('lightweightApp', ['ngMaterial', 'ngTouch', 'ngAnimate', 'firebase', 'angular-uuid', 'angularTypewrite', 'routeController', 'ui.sortable'])

.run(function ($rootScope, $timeout, $route, $window, $location) {
	

    angular.element(window).on("resize", function() {
        $rootScope.$apply();
    });


    ////////////////////////////////// Google Global Site Tag
    $rootScope.$on('$routeChangeSuccess', function() {
        $window.gtag('config', 'UA-122175355-1', {'page_path': $location.path()});
        $window.gtag('event', 'page_view');
    });
    ////////////////////////////////// Google Global Site Tag


})
.config(function(){
    var config = {
        apiKey: "AIzaSyDXG0JIjeg_YRG__rFYpgER--aWJjf2xws",
        authDomain: "mma-texas.firebaseapp.com",
        databaseURL: "https://mma-texas.firebaseio.com",
        projectId: "mma-texas",
        storageBucket: "mma-texas.appspot.com",
        messagingSenderId: "275941114436"
    };
    firebase.initializeApp(config);
});



