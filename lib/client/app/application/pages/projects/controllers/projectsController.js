'use strict';

angular.module('projects', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
])
.controller('projectsController', [
'$rootScope', 
'$scope', 
'$compile', 
'$location', 
'$timeout', 
'$window', 
'$anchorScroll', 
'$routeParams', 
function (
$rootScope, 
$scope, 
$compile, 
$location, 
$timeout, 
$window, 
$anchorScroll, 
$routeParams)
{
    
    $rootScope.pageTitle = "Projects";
    $scope.isOpen = false;
    

    

    /////////////////////////////////news panel
    // calculates how many panels
    var calculate_virtual_panels = function(items, defaultNumberOfItems){
        var numberOfPanels = Math.floor(items/defaultNumberOfItems)
        var remainder = Math.ceil(numberOfPanels%2);
        var val = numberOfPanels + remainder;
        if (val < 1) {val = 1; $rootScope.news_post_swipe = false;}
        return val;
    }
    // calculates how many panels

    // creates virtual panels
    var create_containers = function(list){

        var list_length = list.length;
        var returnObj = {};
        var panel_width;
        var slide_increment;
        var amount_to_slide;
        var max_swipe = 0;
        // var min_swipe = 0;

        var news_post_window = $timeout(function(){

            var value = 0;
            amount_to_slide = 0;
            if($rootScope.window_width > 960){
                panel_width = calculate_virtual_panels(list_length,3);
            } else if(600 < $rootScope.window_width && $rootScope.window_width < 960) {
                panel_width = calculate_virtual_panels(list_length,2);
            } else {
                panel_width = calculate_virtual_panels(list_length,1);
            }
            slide_increment = 100/panel_width;

            // controls
            var panel_swipe=function(a){max_swipe=panel_width-1,"left"===a?0===value?(value=Math.abs(value)+1,amount_to_slide=-value*slide_increment+"%"):0!=value&&value!=max_swipe?(value+=1,amount_to_slide=-value*slide_increment+"%"):(value=0,amount_to_slide=-value*slide_increment+"%"):0===value?(value=max_swipe,amount_to_slide=-value*slide_increment+"%"):(value-=1,amount_to_slide=-value*slide_increment+"%")};
            // controls

            returnObj.max_swipe = max_swipe;
            // returnObj.min_swipe = min_swipe;
            returnObj.slide_increment = slide_increment;
            returnObj.post_width = panel_width;
            returnObj.amount_to_slide = amount_to_slide;
            returnObj.panel_swipe = panel_swipe;

            return returnObj;

        }, 500);
    }
    // creates virtual panels
    
    // returns virtual panel properties and methods
    var compile_rows_of_projects = function(list){
        console.log("compilation function used");
        console.log(JSON.stringify(list));
        var container_results = create_containers(list);
        var container = {};
        container.min_swipe = 0;
        container.max_swipe = container_results.max_swipe;
        container.slide_increment = container_results.slide_increment;
        container.post_width = container_results.post_width;
        container.amount_to_slide = container_results.amount_to_slide;
        container.panel_swipe = container_results.panel_swipe;
        container.data = list;
        return container;
    }
    // returns virtual panel properties and methods
    $rootScope.$on('projects_loaded', function(event, args) {
        
        var civil_engineering_projects_exist = $rootScope.projects_civil_engineering.length ? $rootScope.projects_civil_engineering.length : false;
        var landscape_architecture_projects_exist = $rootScope.projects_landscape_architecture.length ? $rootScope.projects_landscape_architecture.length : false;
        var planning_projects_exist = $rootScope.projects_planning.length ? $rootScope.projects_planning.length : false;
        var surveying_projects_exist = $rootScope.projects_surveying.length ? $rootScope.projects_surveying.length : false;
        var gis_projects_exist = $rootScope.projects_gis.length ? $rootScope.projects_gis.length : false;
        var aerial_mapping_projects_exist = $rootScope.projects_aerial_mapping.length ? $rootScope.projects_aerial_mapping.length : false;

        // create Specific Project Objects
        if(civil_engineering_projects_exist){
            console.log("compilation started");
            $rootScope.civil_engineering_row = compile_rows_of_projects($rootScope.projects_civil_engineering);
        }
        if(landscape_architecture_projects_exist){
            $rootScope.landscape_architecture_row = compile_rows_of_projects($rootScope.projects_landscape_architecture);
        }
        if(planning_projects_exist){
            $rootScope.planning_row = compile_rows_of_projects($rootScope.projects_planning);
        }
        if(surveying_projects_exist){
            $rootScope.surveying_row = compile_rows_of_projects($rootScope.projects_surveying);
        }
        if(gis_projects_exist){
            $rootScope.gis_row = compile_rows_of_projects($rootScope.projects_gis);
        }
        if(aerial_mapping_projects_exist){
            $rootScope.aerial_mapping_row = compile_rows_of_projects($rootScope.projects_aerial_mapping);
        }

        // create Specific Project Objects
    });
    $rootScope.news_post_swipe = true;

    $(window).resize(function() {
        $timeout(function(){
            // create Specific Project Objects
            $rootScope.civil_engineering_row = compile_rows_of_projects($rootScope.projects_civil_engineering);
            $rootScope.landscape_architecture_row = compile_rows_of_projects($rootScope.projects_landscape_architecture);
            $rootScope.planning_row = compile_rows_of_projects($rootScope.projects_planning);
            $rootScope.surveying_row = compile_rows_of_projects($rootScope.projects_surveying);
            $rootScope.gis_row = compile_rows_of_projects($rootScope.projects_gis);
            $rootScope.aerial_mapping_row = compile_rows_of_projects($rootScope.aerial_mapping);
            // create Specific Project Objects
        }, 1000);
    }); 

     

}])
.directive('portfolioCloserLookOverlayContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
    var thumb_number = attrs.thumb;
    var thumb_class = '.thumb' + thumb_number;
    var thumbnail_size = angular.element('.thumb-' + thumb_number).height();
    var overlay_content = angular.element('.lightweight-portfolio--closer-look-overlay-container').height();
    var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
    element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
        var thumb_number = attrs.thumb;
        var thumb_class = '.thumb' + thumb_number;
        var thumbnail_size = angular.element('.thumb-' + thumb_number).height();
        var overlay_content = angular.element('.lightweight-portfolio--closer-look-overlay-container').height();
        var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
        element.css('margin-top', marginTopVariable + 'px');
        scope.$digest();
    });
  }
}]);


