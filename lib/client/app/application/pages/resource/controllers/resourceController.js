'use strict';

var resource = angular.module('resource', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])

.controller('resourceController', [
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
    var param = $routeParams.pageId;
    var id = JSON.stringify(param);
    var continue_looping = true;
    var parameter = JSON.stringify($rootScope.params);

    var init = function(){
        console.log("controller init fired");
        if ($rootScope.resources){
            console.log("resources detected");
            if ($rootScope.resources.length > 0){
                console.log("secondary resources load event fired");
                console.log("number of resources found " + $rootScope.resources.length);
                load_page();
            }
        }
    }

    var load_page = function(){
        for(let i = 0, l = $rootScope.resources.length; i < l && continue_looping == true; i++) {
            var iframe_resource_id = $rootScope.resources[i].data.resource_id;
            var iframe_id = JSON.stringify(iframe_resource_id);
            console.log('here\'s the iframe id ' + iframe_id);
            console.log('here\'s the iframe id and various params ' + parameter + ', ' + id + ', ' + iframe_resource_id);
            if(iframe_id == id){
                $('#default-page-loading').fadeOut('slow');
                console.log("found resource");
                continue_looping = false;
                $scope.trusted_resource_iframe = $sce.trustAsResourceUrl($rootScope.resources[i].data.source);
                $rootScope.resourcePage = $rootScope.resources[i];
                $rootScope.pageTitle = $rootScope.resources[i].data.title;
            }
        }
    }
    init();
    $rootScope.$on('data_loaded', function(event, args) {
        load_page();
        console.log("primary resources load event fired");
        console.log("number of resources found " + $rootScope.resources.length);
    });

}])
.directive('compile', ['$compile', function ($compile) {
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


