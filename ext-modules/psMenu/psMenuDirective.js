/**
 * Created by marklovett on 7/2/15.
 */
"use strict";

angular.module('psMenu').directive('psMenu', ['$timeout', function($timeout) {
    return {
        scope: {

        },
        //restrict: 'AE', //is default so dont need to write it,best to leave at default
        transclude: true,
        templateUrl: 'ext-modules/psMenu/psMenuTemplate.html',
        controller: 'psMenuController',
        link: function (scope, el, attr) {//sets a default menu item
            var item = el.find('.ps-selectable-item:first');//jquery grabs 1st selectable item in menu
            $timeout(function() { //use angular's timeout service to call func after the current digest cycle
                item.trigger('click');//trigger the clk evt on the item,guarantees 1st menu item is selected at start
            });
        }
    };
}]);