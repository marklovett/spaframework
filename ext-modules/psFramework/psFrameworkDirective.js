/**
 * Created by marklovett on 7/2/15.
 */
"use strict";

angular.module("psFramework").directive("psFramework", function () {
    return {
        transclude: true,
        scope: { //isolate scope
            title: '@', //'@'binds a string once
            subtitle: '@',
            iconFile: '@'  //must use camel case in js and snake case (icon-file) in html
        },
        controller: "psFrameworkController",
        templateUrl: 'ext-modules/psFramework/psFrameworkTemplate.html'
    };
});