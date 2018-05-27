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
'$timeout', 
'$window', 
'$location', 
'$sce',  
'$route', 
'$q',
'$mdDialog',
'$mdToast',
'$firebaseAuth',
'$firebaseObject',
'$firebaseArray',
'fromAppDatabase',
'$routeParams',
'users_data',
'tag_data',
'fromImageStorage',
'fromGalleriesDatabase',
function (
$rootScope, 
$scope,  
$timeout, 
$window,  
$location, 
$sce,  
$route, 
$q,
$mdDialog,
$mdToast,
$firebaseAuth,
$firebaseObject,
$firebaseArray,
fromAppDatabase,
$routeParams,
users_data,
tag_data,
fromImageStorage,
fromGalleriesDatabase
){

 
    
    $rootScope.params = $routeParams;
    var ua=window.navigator.userAgent,iOS=!!ua.match(/iPad/i)||!!ua.match(/iPhone/i),webkit=!!ua.match(/WebKit/i),msie=ua.indexOf("MSIE "),ms_version=msie>0,trident=ua.indexOf("Trident/"),trident_ms=trident>0,edge=ua.indexOf("Edge/"),edge_ms=edge>0,iOSSafari=iOS&&webkit&&!/(Chrome|CriOS|OPiOS)/.test(ua);iOSSafari||iOS?($rootScope.scrollable=!1,$rootScope.apple_device=!0):ms_version?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):trident_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):edge_ms?($rootScope.scrollable=!1,$rootScope.microsoft_device=!0):$rootScope.scrollable=!0;
    $rootScope.taglist = [];
    $rootScope.app_pages = [];
    $rootScope.galleries = [];
    $rootScope.all_galleries = [];
    $rootScope.bloglist = [];
    $rootScope.mobile_menu = false;
    $rootScope.location = $location.path();
    $rootScope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {return {abbrev: state};});
    $rootScope.times = ('6:30AM 7:00AM 7:30AM 8:00AM 8:30AM 9:00AM 9:30AM 10:00AM 10:30AM 11:00AM 11:30AM 12:00PM 12:30PM 1:00PM 1:30PM 2:00PM 2:30PM 3:00PM 3:30PM 4:00PM 4:30PM 5:00PM 5:30PM 6:00PM 6:30PM 7:00PM 7:30PM 8:00PM').split(' ').map(function(time) {return {hour: time};});
    $rootScope.year = new Date().getFullYear();
    var featured_galleries = [];
    var all_galleries = [];
    $rootScope.pages = [];











    //////////////////////////////// Window Sizing Variable

    //////////////////////////////// calculate scroll bar width and a window aware of it
    function getScrollBarWidth() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) {
            w2 = outer.clientWidth;
        }
        document.body.removeChild(outer);
        return (w1 - w2);
    }

    $rootScope.window_height = $window.innerHeight;
    $rootScope.window_width = $window.innerWidth;
    $timeout(function(){
        var offset = getScrollBarWidth();
        $rootScope.scroll_bar_aware_window_width = $rootScope.window_width - offset;
    }, 100);
    
    angular.element($window).bind('resize', function() {
        $rootScope.window_width = $window.innerWidth;
        $rootScope.window_height = $window.innerHeight;
        $timeout(function(){
            var offset = getScrollBarWidth();
            $rootScope.scroll_bar_aware_window_width = $rootScope.window_width - offset;
        }, 100);
    });
    //////////////////////////////// calculate scroll bar width and a window aware of it
    
    //////////////////////////////// Window Sizing Variable



    // Enable Sorting
    $rootScope.sortableList = {
        axis: 'y',
        handle: '.list-handle',
        connectWith: '.lightweight-list-control',
        placeholder: 'sortable-placeholder', 
        forcePlaceholderSize: true,
        revert: false,
        tolerance: 'pointer',
        classes: {'ui-sortable': 'pickedUp'}
    };
    // Enable Sorting

    





    // Menu
    $scope.open_menu = function(item){
        $scope.menu_title = item.navigation.parent.name;
        $scope.sub_navigation_panel = true;
        $scope.child_items = item.navigation.child.data;
    };
    $scope.close_menu = function(){
        $scope.menu_title = null;
        $scope.sub_navigation_panel = false;
        $scope.child_items = null;
    };
    $scope.open_parent_menu = function(){
        $scope.navigation_panel = true;
    };
    $scope.close_parent_menu = function(){
        $scope.navigation_panel = null;
    };
    var originatorEv;
    $scope.openMenu = function($mdMenu, ev) {originatorEv = ev; $mdMenu.open(ev);};
    // Menu


    var ToastCtrl = function($scope, $mdToast){$scope.closeToast = function(){$mdToast.hide().then(function() {return;})}}

    






    fromImageStorage.getImages().then(function(result){

        if(result.length > 0){

            // assign image references arry to root scope
            $rootScope.imagelist = result;
            // assign image references arry to root scope

            // media vault variables
            $rootScope.pageSize = 12;
            $rootScope.currentPage = 0;
            $rootScope.numberOfPages = Math.ceil(result.length/$rootScope.pageSize);
            // media vault variables
        }

        // request galleries during images request
        fromGalleriesDatabase.getGalleries().then(function(result){
            if(result.length > 0){
                $rootScope.galleries = result;
                $rootScope.gallerySortObj = [];
                var gallerySortable = angular.forEach(result, function(value, key){
                    $rootScope.gallerySortObj.push(value);
                });
                var jsonPrint = JSON.stringify($rootScope.gallerySortObj);
                $rootScope.gallerySize = 9;
                $rootScope.currentGalleryPage = 0;
                $rootScope.numberOfGalleryPages = Math.ceil(result.length/$rootScope.gallerySize);
            }
            // Parse all galleries to find featured galleries
            for(let i = 0, l = $rootScope.galleries.length; i < l; i++) {
                if($rootScope.galleries[i].featured == true){
                    var gallery = $rootScope.galleries[i];
                    var gallery_images = [];
                    // parse all images
                    for(let i = 0, l = $rootScope.imagelist.length; i < l; i++) {
                        // to find images with the galleriy's tags
                        for(var key in $rootScope.imagelist[i].metadata.tags) {
                            // push images with the gallery's tag into gallery's array of images
                            var tag = $rootScope.imagelist[i].metadata.tags[key];
                            if(tag == gallery.tag){
                                gallery_images.push($rootScope.imagelist[i]);
                            }
                        }
                    }
                    // gallery's array of images
                    var images = gallery_images;
                    // find cover image in the gallery's array of images and
                    for (let i = 0, l = images.length; i < l; i++){
                        // construct the gallery object while pushing the object into the array of featured galleries
                        if(images[i].metadata.cover == true){
                            var gallery_package = {};
                            gallery_package.url = gallery.url;
                            gallery_package.name = gallery.name;
                            gallery_package.description = gallery.description;
                            gallery_package.source = images[i].source;
                            featured_galleries.push(gallery_package);
                        }
                    }
                }
            }
            $rootScope.featured_galleries = featured_galleries;
            // Parse all galleries to find featured galleries

            // Parse and compile all galleries
            for(let i = 0, l = $rootScope.galleries.length; i < l; i++) {

                var gallery_object = $rootScope.galleries[i];
                var gallery_objects_images = [];
                var gallery_object_compiled = {};
                var page_object_compiled = {};

                // parse all images
                for(let i = 0, l = $rootScope.imagelist.length; i < l; i++) {
                    // to find images with the galleriy's tags
                    for(var key in $rootScope.imagelist[i].metadata.tags) {
                        // push images with the gallery's tag into the gallery's array of images
                        var tag = $rootScope.imagelist[i].metadata.tags[key];
                        if(tag == gallery_object.tag){
                            if ($rootScope.imagelist[i].metadata.cover == true){
                                gallery_objects_images.push($rootScope.imagelist[i]);
                                gallery_object_compiled.cover = $rootScope.imagelist[i].source;
                            } else {
                                gallery_objects_images.push($rootScope.imagelist[i]); 
                            }
                        }
                    }
                }
                // parse all images

                // gallery's package
                gallery_object_compiled.url = gallery_object.url;
                page_object_compiled.url = "/gallery/" + gallery_object.url;
                gallery_object_compiled.name = gallery_object.name;
                page_object_compiled.name = gallery_object.name;
                gallery_object_compiled.description = gallery_object.description;
                gallery_object_compiled.images = gallery_objects_images;
                gallery_object_compiled.transition = gallery_object.transition;
                page_object_compiled.locked = true;
                all_galleries.push(gallery_object_compiled);
                // gallery's package

                //dynamic pages
                $rootScope.app_pages.push(page_object_compiled);

            }

            $rootScope.all_galleries = all_galleries;

            // Tiles

            $rootScope.random = function(min,max){
                return Math.floor(Math.random()*(max-min+1)+min);
            }
            // Tiles

            // Parse and compile all galleries

            $timeout(function(){
               $rootScope.$broadcast('galleries_loaded', {
                    data:{}
                });
            }, 500);

        });
        // request galleries during images request

    });






    tag_data.getTags().then(function(result){
        if(result.length > 0){
            $rootScope.taglist = result;     
        }
    });





    fromAppDatabase.getData().then(function(result){


        var app = result;


        $rootScope.settings = app.settings;
        $rootScope.editable_app_settings = app.settings;


        $rootScope.staffSortObj = [];
        var staffSortable = angular.forEach(app.settings.staff.members, function(value, key){
            $rootScope.staffSortObj.push(value);
        });



        // Create object for all galleries
        // var allGalleriesPage = {};
        // allGalleriesPage.name = "Galleries Page";
        // allGalleriesPage.url = "/gallery";
        // allGalleriesPage.locked = true;
        // $rootScope.app_pages.unshift(allGalleriesPage);

        // create object for staff page
        // var staffPage = {};
        // staffPage.name = "Staff Page";
        // staffPage.url = "/meet-our-team";
        // staffPage.locked = true;
        // $rootScope.app_pages.unshift(staffPage);



        // $rootScope.section_1 = app.section_1;
        // $rootScope.section_2 = app.section_2;
        // $rootScope.section_3 = app.section_3;
        // $rootScope.section_4 = app.section_4;
        // $rootScope.section_5 = app.section_5;



        if(app.pages) {
            $rootScope.pages = app.pages;
            var pages = angular.forEach(app.pages, function(value, key){
                // sift pages for blog post settings
                if(value.settings.page_type == "blog"){
                    $rootScope.bloglist.push(value);
                }
                $rootScope.app_pages.push(value.settings);
            });
        }

        



        $rootScope.miniAppName = app.settings.data.company_name;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl($rootScope.settings.data.address.google_map);



        $timeout(function(){
           $rootScope.$broadcast('data_loaded', {
                data:{}
            });
        }, 500);



    });







    $rootScope.$on('$locationChangeStart', function(event, args) {
        $scope.location = $location.path();
    });





    $scope.$on('server-event', function(event, args) {
        $mdToast.show({
            hideDelay   : 6000,
            position    : 'top right',
            controller  : function($scope, $mdToast){
                if(args.data.action){
                    $scope.action = args.data.action;
                }
                $scope.toastMessage = args.data.message;
                $scope.closeToast = function() {
                    $mdToast
                    .hide()
                    .then(function() {
                        return;
                    });
                };
            },
            templateUrl : 'toast-template.html'
        });
    });

}])

//////////////////////////////////////////// App Data
.factory('fromAppDatabase', function($q){
    var realtimeDatabase = firebase.database();
    var appDatabase = realtimeDatabase.ref().child('data');
    var getData = function(){
        var defer = $q.defer();
        appDatabase.once('value')
        .then(function(snapshot) {

            var data = snapshot.val();
            var app = {};

            app.settings = data["settings"];

            // index object
            // app.section_1 = data["index"]["section_1"];
            // app.section_2 = data["index"]["section_2"];
            // app.section_3 = data["index"]["section_3"];
            // index object

            // app.index = data["index"];
            app.pages = data["pages"];

            defer.resolve(app);

        });
        return defer.promise;
    }
    return {
        getData: getData
    }
})
.factory('users_data', function($q){
    var realtimeDatabase = firebase.database();
    var usersDatabase = realtimeDatabase.ref().child('users');
    var getMe = function(id){
        var defer = $q.defer();
        var user = {};
        usersDatabase.child(id).once('value')
        .then(function(snapshot) {
            var childData = snapshot.val();
            childData.id = id;
            defer.resolve(childData); 
        });
        return defer.promise;
    }
    return {
        getMe: getMe
    }
})
.factory('tag_data', function($q){
    var realtimeDatabase = firebase.database();
    var tagDatabase = realtimeDatabase.ref().child('tags');
    var getTags = function(){
        var defer = $q.defer();
        var taglist = [];
        tagDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                taglist.push(childDataValue);
            });
            defer.resolve(taglist); 
        });
        return defer.promise;
    }
    return {
        getTags: getTags
    }
})
.factory('fromImageStorage', function($q){
    var realtimeDatabase = firebase.database();
    var imageDatabase = realtimeDatabase.ref().child('media/images');
    var getImages = function(){
        var defer = $q.defer();
        var imagelist = [];
        imageDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                imagelist.push(childDataValue);
            });
            defer.resolve(imagelist); 
        });
        return defer.promise;
    }
    return {
        getImages: getImages
    }
})
.factory('video_data', function($q){
    var realtimeDatabase = firebase.database();
    var videoDatabase = realtimeDatabase.ref().child('media/video');
    var getVideos = function(){
        var defer = $q.defer();
        var videolist = [];
        videoDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                videolist.push(childDataValue);
            });
            defer.resolve(videolist); 
        });
        return defer.promise;
    }
    return {
        getVideos: getVideos
    }
})
.factory('fromGalleriesDatabase', function($q){
    var realtimeDatabase = firebase.database();
    var galleryDatabase = realtimeDatabase.ref().child('galleries');
    var getGalleries = function(){
        var defer = $q.defer();
        var galleries = [];
        galleryDatabase.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                galleries.push(childDataValue);
            });
            defer.resolve(galleries); 
        });
        return defer.promise;
    }
    return {
        getGalleries: getGalleries
    }
})
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start;
            return input.slice(start);
        }
    }
})
.directive('passwordVerify', function(){
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, elem, attrs, ngModel) {
        if (!ngModel) return;
        scope.$watch(attrs.ngModel, function() {
          validate();
        });
        attrs.$observe('passwordVerify', function(val) {
          validate();
        });
        var validate = function() {
          var val1 = ngModel.$viewValue;
          var val2 = attrs.passwordVerify;
          ngModel.$setValidity('passwordVerify', val1 === val2);
        };
      }
    }
})
.directive('ngConfirmClick', [function() {
    // Create Custom Confirmation
    // Needs to handle forms -- knowing if they are 'dirty' or 'touched'
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var condition = scope.$eval(attrs.ngConfirmCondition);
                if(condition){
                    var message = attrs.ngConfirmMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngConfirmClick);
                    }
                }
                else{
                    scope.$apply(attrs.ngConfirmClick);
                }
            });
        }
    }
}])
.directive('goBackAngular', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                $window.history.back();
            });
        }
    };
}])
.directive('menuClose', function() {
    return {
        restrict: 'AC',
        link: function($scope, $element) {
            $element.bind('click', function() {
                var drawer = angular.element('.mdl-layout__drawer');
                var obfuscator = angular.element('.mdl-layout__obfuscator');
                if(drawer) {
                    drawer.toggleClass('is-visible');
                    obfuscator.toggleClass('is-visible');
                }
            });
            angular.element(document).ready( 
                function() {
                    componentHandler.upgradeAllRegistered();
                }
            );
        }
    };
});