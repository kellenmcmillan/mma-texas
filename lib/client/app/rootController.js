'use strict';

var rootCtrl = angular.module('rootCtrl', [
'ngResource',
'ngAnimate',
'colorPalette',
'ngFileUpload'
])
.controller('rootController', [
'$rootScope', 
'$scope',
'$window',
'$timeout',
'$mdDialog',
'$mdSidenav',
'$firebaseAuth',
function (
$rootScope, 
$scope,
$window,
$timeout,
$mdDialog,
$mdSidenav,
$firebaseAuth
){

    $scope.auth = $firebaseAuth();
    $rootScope.navigation = [
    	{'name': "Home"},
    	{'name': "Projects"},
    	{'name': "Services"},
    	{'name': "Resources"},
    	{'name': "About"}
    ];
    
    // Login Dialog
    $scope.showLoginDialog = function(ev) {
        $mdDialog.show({
            controller: manageUserController,
            templateUrl: 'application/templates/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            multiple: true,
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };
    // Login Dialog

    //////////////////////////////////////////// authentication handler
    function manageUserController($scope, $mdDialog, $firebaseAuth, $firebaseObject) {
        $scope.auth = $firebaseAuth();
        //Delete
        $scope.deleteUser = function() {
            $scope.message = null;
            $scope.error = null;
            // Delete the currently signed-in user
            $scope.auth.$deleteUser().then(function() {
                $scope.message = "User deleted";
            }).catch(function(error) {
                $scope.error = error;
            });
        };
        
        //Sign In
        $scope.signIn = function(){
            $scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(user) {
                // Close Dialog
                $mdDialog.hide();
            }).catch(function(error) {
                // Cancel Dialog
                $mdDialog.cancel(error);
            });
        };
        
    }

    // Sign Up Dialog
    $scope.showSignUpDialog = function(ev) {
        $mdDialog.show({
            controller: signupController,
            templateUrl: 'application/templates/signup.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };

    function signupController($scope, $mdDialog, $firebaseAuth, $firebaseArray) {
        $scope.auth = $firebaseAuth();

        //State Abbreviate Select Field
        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
        //State Abbreviate Select Field

        //Create New User In Authentication Database
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;
            //Create New User In Authentication Database Using Email + Password Combination
            $scope.auth.$createUserWithEmailAndPassword(
                $scope.newUser.email, 
                $scope.newUser.password
            )
            .then(function(user) {
                // Add Successfully Signed Up User To User Profile Database
                storeUser(user);
                // Close Dialog
                $mdDialog.hide();
            }).catch(function(error) {
                //Log Signup Error
                console.error("Error: ", error);
                // Cancel Dialog
                $mdDialog.cancel(error);
            });
        };
        //Create New User In Authentication Database

        // Add Successfully Signed Up User To Database
        var storeUser = function(user){
            var ref = firebase.database().ref("users");
            var userList = $firebaseArray(ref);
            userList.$add({
                key: user.uid,
                firstname: $scope.newUser.firstname,
                email: $scope.newUser.email
            }).then(function(val){
                //Work On Success Callback
                console.log("Success!");
            }).catch(function(error){
                //Work On Fail Callback
                console.error(error);
            });
        }
        // Add Successfully Signed Up User To Database
    }
    //////////////////////////////////////////// authentication handler

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(user) {
        if (user) {
            $rootScope.user = user;
        } else {
            $rootScope.user = null;
        }
    });
    // any time auth state changes, add the user data to scope

    // Window Sizing Variable
    $rootScope.window_height = $window.innerHeight;
    $rootScope.window_width = $window.innerWidth;
    $rootScope.scroll_bar_aware_window_width = angular.element('.header');
    angular.element($window).bind('resize', function() {
        $rootScope.window_width = $window.innerWidth;
        $rootScope.window_height = $window.innerHeight;
    });
    // Window Sizing Variable

}]);



