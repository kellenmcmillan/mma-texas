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
'$routeParams', 
function (
$rootScope, 
$scope, 
$compile, 
$location, 
$timeout, 
$window,
$routeParams)
{
    
    $scope.isOpen = false;
    
    var isTablet = function isTablet (){
        if($rootScope.window_width > 600){
            if($rootScope.window_width < 900){
                return true;
            }
        } else {
            return false;
        }
    }

    var param = $routeParams.category;
    var category = JSON.stringify(param);
    console.log("Category for projects is: " + category);

    var init = function(){
        if ($rootScope.pages){
            if ($rootScope.pages.length > 0){
                load_page();
            }
        }
    }

    var load_page = function(){
        switch(category){
            case "commercial":
                $rootScope.project_listings = $rootScope.projects_commercial;
                $rootScope.pageTitle = "Commercial";
                console.log("Category Selected");
                break;
            case "education":
                $rootScope.project_listings = $rootScope.projects_education;
                $rootScope.pageTitle = "Education";
                console.log("Category Selected");
                break;
            case "energy":
                $rootScope.project_listings = $rootScope.projects_energy;
                $rootScope.pageTitle = "Energy";
                console.log("Category Selected");
                break;
            case "entertainment":
                $rootScope.project_listings = $rootScope.projects_entertainment;
                $rootScope.pageTitle = "Entertainment";
                console.log("Category Selected");
                break;
            case "government":
                $rootScope.project_listings = $rootScope.projects_government;
                $rootScope.pageTitle = "Government";
                console.log("Category Selected");
                break;
            case "healthcare":
                $rootScope.project_listings = $rootScope.projects_healthcare;
                $rootScope.pageTitle = "Healthcare";
                console.log("Category Selected");
                break;
            case "multi-family-residential":
                $rootScope.project_listings = $rootScope.projects_multi_family_residential;
                $rootScope.pageTitle = "Multi-Family Residential";
                console.log("Category Selected");
                break;
            case "single-family-residential":
                $rootScope.project_listings = $rootScope.projects_single_family_residential;
                $rootScope.pageTitle = "Single Family Residential";
                console.log("Category Selected");
                break;
            default:
                return;
        }
    }

    init();

    $rootScope.$on('projects_loaded', function(event, args) {
        load_page();
    });

    $rootScope.tablet = isTablet();

    

    $(window).resize(function() {
        $timeout(function(){
            // create Specific Project Objects
            init();
            $rootScope.tablet = isTablet();
            // create Specific Project Objects
        }, 1000);
    }); 
     

}]);


