'use strict';

var landing = angular.module('landing', [
'ngResource',
'ngMessages'
])
.controller('landingPageController', [
'$rootScope', 
'$scope',
'$timeout',
'$window',
function (
$rootScope, 
$scope,
$timeout,
$window
){
    //New Clock
    $scope.tickInterval = 1000 //ms

    $rootScope.valueStatements = ['Be Creative','Be Energized','Be Forward Thinking'];

    var valueStatementFactory = function(arr){
      	var orphanedText = arr.shift();
      	arr.push(orphanedText);
      	return arr;
    }

    var i
	for (i = 0; i < 100; i++) {
	  	$rootScope.valueStatements.push('Be Creative');
	  	$rootScope.valueStatements.push('Be Energized');
	  	$rootScope.valueStatements.push('Be Forward Thinking'); 
	}

    $rootScope.$on('clock-event', function(event, args) {
    	
    });

    var tick = function() {
        $rootScope.$broadcast('clock-event', {
            data:{
                message: "tick"
            }
        });
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);

    // listeners to broadcast on scope
    $rootScope.$on('server-event', function(event, args) {

    });
    // listeners to broadcast on scope

}])
.directive('heroElement', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
      element.css('height', $window.innerHeight + 'px');
      angular.element($window).bind('resize', function(){
        element.css('height', $window.innerHeight + 'px');
        scope.$digest();
       });
     }

}])
.directive('slideshowContainer', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var width = $window.innerWidth;
    element.css('width', width + 'px');
    angular.element($window).bind('resize', function(){
      var width = $window.innerWidth;
      element.css('width', width + 'px');
      scope.$digest();
    });
    
  }
}]);



