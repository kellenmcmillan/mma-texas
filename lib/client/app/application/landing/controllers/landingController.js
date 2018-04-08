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

    $scope.open_menu = function(item){
    	$scope.menu_title = item;
    	$scope.navigation_panel = true;
    };


    // Hero Simulated Typing Text
    $rootScope.valueStatements = ['Be Passionate', 'Be Accountable', 'Be Creative','Be Involved','Be Engaged', 'Be Responsive'];
    var valueStatementFactory = function(arr){
      	var orphanedText = arr.shift();
      	arr.push(orphanedText);
      	return arr;
    }
    var i
	for (i = 0; i < 100; i++) {
	  	$rootScope.valueStatements.push('Be Passionate');
	  	$rootScope.valueStatements.push('Be Accountable');
	  	$rootScope.valueStatements.push('Be Creative');
	  	$rootScope.valueStatements.push('Be Involved');
	  	$rootScope.valueStatements.push('Be Engaged');
	  	$rootScope.valueStatements.push('Be Responsive'); 
	}
	// Hero Simulated Typing Text


	//New Clock
    $scope.tickInterval = 1000 //ms
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
    //New Clock

    // Slider Logic
    var number_of_posts__news = 4;
    // Slider Logic

    var calculate_virtual_panels = function(items, defaultNumberOfItems){
    	var numberOfPanels = Math.floor(items/defaultNumberOfItems)
    	var remainder = Math.ceil(numberOfPanels%2);
    	var val = numberOfPanels + remainder;
    	return val;
    }

    //news panel
    var news_post_window = $timeout(function(){
    	if($rootScope.window_width > 840){
    		$scope.news_post_width = calculate_virtual_panels(number_of_posts__news,3);
    	} else {
    		$scope.news_post_width = calculate_virtual_panels(number_of_posts__news,1);
    	}
    }, 1000);

    $(window).resize(function() {
        news_post_window = $timeout(function(){
        	if($rootScope.window_width > 840){
	    		$scope.news_post_width = calculate_virtual_panels(number_of_posts__news,3);
	    	} else {
	    		$scope.news_post_width = calculate_virtual_panels(number_of_posts__news,1);
	    	}
        }, 1000);
    });
    //news panel


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



