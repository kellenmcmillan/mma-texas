'use strict';

var loading = angular.module('loading', [])

.directive('loadingScreen', ['$window', function($window) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'loading.html',
    controller: ['$scope', '$window', '$sce', '$rootScope', '$location', '$timeout', function loadingController($scope, $window, $sce, $rootScope, $location, $timeout) {
          // App Loading Screen
          $scope.$on('$routeChangeStart', function(event, args) {
              
              $scope.page_is_loading = true;

              $timeout(function(){
                  $scope.page_is_loading = false;
              }, 2500);

          });
    }]
  }
}])
.directive('contentAvailable', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){

            $('#load_page').fadeOut('slow');

        });
    }
}]);