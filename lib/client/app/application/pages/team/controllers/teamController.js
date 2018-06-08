'use strict';

var team = angular.module('team', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])

.controller('teamController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$routeParams', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$routeParams)
{
    $scope.show_dialog = false;
    $scope.member;
    $scope.select_member = function(member){
        if(member.call_to_action){
            return null;
        } else {
            $scope.member = member;
            $scope.show_dialog = true;
        }
    }

}]).directive('compile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.compile);
            }, function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            });
        }
    }
}])
.directive('contentAvailable', ['$location', function($location){
    return {
        link: link,
        restrict: 'A'
    };
    function link(scope, element, attrs){
        element.on("load", function(){
            $('#default-page-loading').fadeOut('slow');
        });
    }
}]);


