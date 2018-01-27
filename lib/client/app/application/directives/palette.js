'use strict';

var colorPalette = angular.module('colorPalette', [])

.controller('colorController', ['$rootScope', '$scope', function ($rootScope, $scope){
    


    // dynamic data item pulled from site configuration
    ///////////////////////////////////////////////////
    var color = { 
        primary: {
            hex: "#00a950", 
            rgb: "rgb(0, 169, 80)",
            rgba_light: "rgba(0, 169, 80, 0.3)",
            rgba_dark: "rgba(0, 169, 80, 0.7)"
        },
        primary_lighter: {
            hex: "#34BB74", 
            rgb: "rgb(52, 187, 116)",
            rgba_light: "rgba(52, 187, 116, 0.3)",
            rgba_dark: "rgba(52, 187, 116, 0.7)"
        },
        base_lightest: {
            hex: "#FAFAFA", 
            rgb: "rgb(245, 245, 245)",
            rgba_light: "rgba(250, 250, 250, 0.3)",
            rgba_dark: "rgba(245, 245, 245, 0.7)"
        },
        base_lighter: {
            hex: "#E0E0E0", 
            rgb: "rgb(224, 224, 224)",
            rgba_light: "rgba(224, 224, 224, 0.3)",
            rgba_dark: "rgba(224, 224, 224, 0.7)"
        },
        base_normal: {
            hex: "#BDBDBD", 
            rgb: "rgb(189, 189, 189)",
            rgba_light: "rgba(189, 189, 189, 0.3)",
            rgba_dark: "rgba(189, 189, 189, 0.7)"
        },
        base_darker: {
            hex: "#9E9E9E", 
            rgb: "rgb(158, 158, 158)",
            rgba_light: "rgba(158, 158, 158, 0.3)",
            rgba_dark: "rgba(158, 158, 158, 0.7)"
        },
        base_darkest: {
            hex: "#616161", 
            rgb: "rgb(97, 97, 97)",
            rgba_light: "rgba(97, 97, 97, 0.3)",
            rgba_dark: "rgba(97, 97, 97, 0.7)"
        }
    }
    // dynamic data item pulled from site configuration
    ///////////////////////////////////////////////////

    $scope.primary_hue_lighter = {name: "primary-hlr", value: color.primary_lighter.hex};
    $scope.primary_hue_normal = {name: "primary-hn", value: color.primary.hex};

    $scope.primary_hue_normal_lightest_opacity = {name: "primary-hn opacity-lightest", value: color.primary.rgba_light};
    $scope.primary_hue_normal_darkest_opacity = {name: "primary-hn opacity-darkest", value: color.primary.rgba_dark};
    
    $scope.base_hue_lightest = {name: "base-hlst", value: color.base_lightest.hex};
    $scope.base_hue_lighter = {name: "base-hlr", value: color.base_lighter.hex};
    $scope.base_hue_normal = {name: "base-hn", value: color.base_normal.hex};
    $scope.base_hue_darker = {name: "base-hdr", value: color.base_darker.hex};
    $scope.base_hue_darkest = {name: "base-hdst", value: color.base_darkest.hex};
    
    $scope.base_hue_lightest_lightest_opacity = {name: "base-hlst opacity-lightest", value: color.base_lightest.rgba_light};
    $scope.base_hue_darker_darkest_opacity = {name: "base-hdst opacity-darkest", value: color.base_darkest.rgba_dark};
    
    $scope.primary_hue_text__lighter = {name: "primary-hlr--text", value: color.primary_lighter.hex};
    $scope.primary_hue_text__normal = {name: "primary-hn--text", value: color.primary.hex};

    $scope.base_hue_text__lightest = {name: "base-hlst--text", value: color.base_lightest.hex};
    $scope.base_hue_text__lighter = {name: "base-hlr--text", value: color.base_lighter.hex};
    $scope.base_hue_text__normal = {name: "base-hn--text", value: color.base_normal.hex};
    $scope.base_hue_text__darker = {name: "base-hdr--text", value: color.base_darker.hex};
    $scope.base_hue_text__darkest = {name: "base-hdst--text", value: color.base_darkest.hex};
    
    $scope.primary_hue_border__lighter = {name: "primary-hlr--border opacity-lightest", value: color.primary.rgba_light};
    $scope.primary_hue_border__normal = {name: "primary-hn--border opacity-darkest", value: color.primary.rgba_dark};
    $scope.primary_hue_border__lighter_no_opacity = {name: "primary-hlr--border", value: color.primary_lighter.rgb};
    $scope.primary_hue_border__normal_no_opacity = {name: "primary-hn--border", value: color.primary.rgb};
    
    $scope.base_hue_border__lightest = "base-hlst--border";
    $scope.base_hue_border__lighter = "base-hlr--border";
    $scope.base_hue_border__normal = "base-hn--border";
    $scope.base_hue_border__darker = "base-hdr--border";
    $scope.base_hue_border__darkest = "base-hdst--border";
}]);
