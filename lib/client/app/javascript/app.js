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
    
    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging();

    messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        var device_token = messaging.getToken();
        console.log("device token " + JSON.stringify(device_token));
    }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(function() {
        messaging.getToken().then(function(refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            // ...
        }).catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
            // showToken('Unable to retrieve refreshed token ', err);
        });
    });

});



