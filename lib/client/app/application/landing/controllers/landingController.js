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

    // Hero Simulated Typing Text
    $rootScope.valueStatements = ['be passionate', 'be accountable', 'be creative', 'be involved', 'be engaged', 'be responsive'];
    var valueStatementFactory = function(arr){
      	var orphanedText = arr.shift();
      	arr.push(orphanedText);
      	return arr;
    }
    var i
	for (i = 0; i < 100; i++) {
	  	$rootScope.valueStatements.push('be passionate');
	  	$rootScope.valueStatements.push('be accountable');
	  	$rootScope.valueStatements.push('be creative');
	  	$rootScope.valueStatements.push('be involved');
	  	$rootScope.valueStatements.push('be engaged');
	  	$rootScope.valueStatements.push('be responsive'); 
	}
	// Hero Simulated Typing Text


    // operational timeouts 
    var item;
    // operational timeouts

    // Hero Slideshow Variables
    var continue_looping = true;
    // Hero Slideshow Variables

    // var slideshowInit = function(){
    //     if ($rootScope.all_galleries){
    //         if ($rootScope.all_galleries.length > 0){
    //             load_slideshow();
    //         }
    //     }
    // }
    // var load_slideshow = function(){
        
    //     for(let i = 0, l = $rootScope.all_galleries.length; i < l && continue_looping == true; i++) {
    //         var raw_name = $rootScope.all_galleries[i].name;
    //         var name = JSON.stringify(raw_name);
    //         if(name.indexOf("Slideshow") > 0){
    //             continue_looping = false;
    //             item = $rootScope.all_galleries[i];
    //             $rootScope.secondary_slideshow_hero = item;
    //         }
    //     }

    // }
    // slideshowInit();
    $rootScope.slick_breakpoints = [
        {
            breakpoint: 768,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, 
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];

    // $rootScope.$on('galleries_loaded', function(event, args) {
    //     load_slideshow();
    // });

    // $rootScope.$on('locationChangeSuccess', function(event, args) {
    //     load_slidehshow();
    // });


    /////////////////////////////////news panel
    var number_of_posts__news = $rootScope.bloglist.length;
    $rootScope.news_post_swipe = true;
    var calculate_virtual_panels = function(items, defaultNumberOfItems){
    	var numberOfPanels = Math.floor(items/defaultNumberOfItems)
    	var remainder = Math.ceil(numberOfPanels%2);
    	var val = numberOfPanels + remainder;
        if (val < 1) {val = 1; $rootScope.news_post_swipe = false;}
    	return val;
    }

    var news_post_window = $timeout(function(){
    	var value = 0;
    	var max_swipe = 0;
        var min_swipe = 0;
        $scope.amount_to_slide = 0;
    	if($rootScope.window_width > 960){
    		$scope.news_post_width = calculate_virtual_panels(number_of_posts__news,3);
    	} else if(600 < $rootScope.window_width && $rootScope.window_width < 960) {
    		$scope.news_post_width = calculate_virtual_panels(number_of_posts__news,2);
    	} else {
            $scope.news_post_width = calculate_virtual_panels(number_of_posts__news,1);
        }
    	$scope.news_panel_slide_increment = 100/$scope.news_post_width;

        // controls
    	$scope.panel_swipe=function(a){max_swipe=$scope.news_post_width-1,"left"===a?0===value?(value=Math.abs(value)+1,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):0!=value&&value!=max_swipe?(value+=1,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):(value=0,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):0===value?(value=max_swipe,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):(value-=1,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%")};
        // controls

    }, 1000);

    $(window).resize(function() {
        news_post_window = $timeout(function(){
        	var value = 0;
        	var max_swipe = 0;
        	var min_swipe = 0;
        	$scope.amount_to_slide = 0;
        	if($rootScope.window_width > 960){
                $scope.news_post_width = calculate_virtual_panels(number_of_posts__news,3);
            } else if(600 < $rootScope.window_width && $rootScope.window_width < 960) {
                $scope.news_post_width = calculate_virtual_panels(number_of_posts__news,2);
            } else {
                $scope.news_post_width = calculate_virtual_panels(number_of_posts__news,1);
            }
	    	$scope.news_panel_slide_increment = 100/$scope.news_post_width;
	    	$scope.panel_swipe=function(a){max_swipe=$scope.news_post_width-1,"left"===a?0===value?(value=Math.abs(value)+1,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):0!=value&&value!=max_swipe?(value+=1,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):(value=0,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):0===value?(value=max_swipe,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%"):(value-=1,$scope.amount_to_slide=-value*$scope.news_panel_slide_increment+"%")};
        }, 1000);
    });
    /////////////////////////////////news panel

}])
.directive('heroElement', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
        var header = 90;
        var screen = $window.innerHeight;
        var offset = screen - header;
        element.css('height', offset + 'px');
        angular.element($window).bind('resize', function(){
            header = 90;
            screen = $window.innerHeight;
            offset = screen - header;
            element.css('height', offset + 'px');
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



