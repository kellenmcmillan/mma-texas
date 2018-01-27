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
    
	// angular.element(document.querySelector('.page')).bind('scroll', function(){
 //      	if (angular.element(document.querySelector('.page')).scrollTop() > 100) {
	// 		$scope.slide_nav = true;
	// 		$scope.$apply();
	// 	} else {
	// 	    $scope.slide_nav = false;
	// 	    $scope.$apply();
	// 	}
 //    });
    // Slideshow Data

	var slideshow_data = {
		"configs": {
			"name": "Slideshow Hero",
			"type": "slideshow",
			"url": null,
			"layout": null,
			"columns": false,
			"rows": false,
			"tabs": false,
			"panels": false,
			"lists": true,
			"editable_features": ["lists", "color", "settings"]
		},
		"data": [
			{
				"content": {
					"lists": [
		            	{
		            		"settings":{
		            			"name": null,
		            			"param": null,
		            			"transition_speed": 6000,
			            		"controls": false,
				            	"featured": null,
			            		"description": null
			            	},
			            	"details":{
		            			"name": null,
		            			"param": null,
		            			"transition_speed": null,
			            		"controls": null,
				            	"featured": false,
			            		"description": null
			            	},	            		
		            		"content": [
		            			{
					                "description": null,				                
					                "location": "Lewisville, TX",
					                "name": "Wayne Ferguson Plaza",
					                "alt": "Wayne Ferguson Plaza",
					                "type": "image",
					                "source": "/media/GettyImages-543574716.jpg",
					                "call_to_action": null
					            },
					            {				                
					                "description": null,				                
					                "location": "Dallas, TX",
					                "name": "R + D Kitchen",
					                "alt": "An image of R + D Kitchen",
					                "type": "image",
					                "source": "/media/GettyImages-639361218.jpg",
					                "call_to_action": null
					            },
					            {				                
					                "description": null,				                
					                "location": "Farmers Branch, TX",
					                "name": "Brickyard",
					                "alt": "An image of landscaping at Brickyard Apartments in Farmers Branch",
					                "type": "image",
					                "source": "/media/GettyImages-689331626.jpg",
					                "call_to_action": null
					            }
		            		]
		            	}
		            ]
				}
			}
		]
	}


    // Slideshow Data

    // Slideshow Configs
    var slideshow_timeout;
    var visible_slide = -1;
    var slideshowStarting = true;
    var slideshow_hero = slideshow_data;
    var slideshow_length = slideshow_hero.data[0].content.lists[0].content.length;
    var slideshow_speed = slideshow_hero.data[0].content.lists[0].settings.transition_speed;
    $scope.slideshow = slideshow_hero;
    // Slideshow Configs

    //slideshow Controls
    $scope.left_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        visible_slide = visible_slide - 2;
        slideshowEngineRev();
    }
    $scope.right_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
    }
    //slideshow Controls      

    // Slideshow Timer
    $scope.end_vertical_animate = false;
    var slideshowEngineRev=function(){$scope.end_vertical_animate=!1,$timeout(function(){$scope.end_vertical_animate=!0},4e3),slideshow_timeout=$timeout(function(){slideshowEngineRev()},slideshow_speed),visible_slide++,slideshowStarting&&-1!==visible_slide?(slideshowStarting=!1,$scope.visible_slide=0):visible_slide<slideshow_length&&!slideshowStarting&&visible_slide>0?$scope.visible_slide=visible_slide:visible_slide<0?(visible_slide=slideshow_length-1,$scope.visible_slide=visible_slide):(visible_slide=0,$scope.visible_slide=0)};
    slideshowEngineRev();
    // Slideshow Timer



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
      element.css('height', $window.innerHeight - 100 + 'px');
      angular.element($window).bind('resize', function(){
        element.css('height', $window.innerHeight - 100 + 'px');
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
}])
.directive('deadCenter', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){

    
    $timeout(function(){
      var containerHeight = angular.element('.dead-center-container').height();
      var containerWidth = angular.element('.dead-center-container').width();
      var elementHeight = angular.element('.dead-center-content').height();
      var elementWidth = angular.element('.dead-center-content').width();
      var top = (containerHeight/2) - (elementHeight/2);
      var left = (containerWidth/2) - (elementWidth/2);
      element.css('margin-top', top + 'px');
      element.css('margin-left', left + 'px');
    }, 100);
    angular.element($window).bind('resize', function(){
      $timeout(function(){
        var containerHeight = angular.element('.dead-center-container').height();
      	var containerWidth = angular.element('.dead-center-container').width();
      	var elementHeight = angular.element('.dead-center-content').height();
      	var elementWidth = angular.element('.dead-center-content').width();
        var top = (containerHeight/2) - (elementHeight/2);
      	var left = (containerWidth/2) - (elementWidth/2);
        element.css('margin-top', top + 'px');
      	element.css('margin-left', left + 'px');
        scope.$digest();
      }, 100);
    });

  }
}]);



