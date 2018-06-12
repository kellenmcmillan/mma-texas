'use strict';

var lightweightApp = angular.module('lightweightApp', ['ngMaterial', 'ngTouch', 'ngAnimate', 'firebase', 'angular-uuid', 'angularTypewrite', 'routeController', 'ui.sortable'])

.run(function ($rootScope, $timeout, $route, $window) {
	angular.element(window).on("resize", function() {
        $rootScope.$apply();
    });
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



