/**
 * Created by marklovett on 7/2/15.
 */
"use strict";
angular.module('psMenu').directive('psMenuGroup', function() {

    return {
        require: '^psMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'ext-modules/psMenu/psMenuGroupTemplate.html',
        link: function (scope, el, attr, ctrl) {
            scope.isOpen = false; //flag-so everything is closed at start
            scope.closeMenu = function () { //supposed to close submenu if clk outside popup menu
                scope.isOpen = false;
            };
            //need to keep track when item is clkd on scope so do so in ctrl
            scope.clicked = function () { //if closed it will open and vice versa
                scope.isOpen = !scope.isOpen; //make sure .clicked() gets called

                if(el.parents('.ps-subitem-section').length == 0) //if parent of class' element (menu group directive) doesnt exist show popup menu top right
                    scope.setSubmenuPosition();
                //this way the menuctrl will always know the scope of the open popup menu so can call the scope.closeMenu() above
                ctrl.setOpenMenuScope(scope); //calls closeMenu() above if clk outside popup menu,this func in menuctrl

            };
            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
                //dont have access to scope on the ctrlr therefore implement
                // it on the ctrlr, added to menuctrlr too
            };

            scope.setSubmenuPosition = function () {
                var pos = el.offset();//grab the position of the element,offset() jquery func gives us left and top css styles
                $('.ps-subitem-section').css({'left': pos.left + 20, 'top': 36 });
            };//find subitem-section then call jquery css func on it and set the left position to the element's left position + 20, and top to 36
        }
    };
});

