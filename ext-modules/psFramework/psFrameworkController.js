/**
 * Created by marklovett on 7/2/15.
 */
"use strict";

angular.module('psFramework').controller('psFrameworkController',
    ['$scope','$window','$timeout', '$rootScope',
        function ($scope, $window, $timeout, $rootScope) {
            //use $window instead of window cause easier to test
            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true; //set a flag,keep var in framework & menu,need for screen refresh and standalone component

            //listen for message, when receive it, call func that gets passed evt and data
            $scope.$on('ps-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;//set routestring, from menu ctrl,shows the route in the screen using

                // {{routeString}} in framework template, when clk menu items the route attr's display,
                //proves we sent messages outside of menu, and set up subscribers to listen to those messages
                checkWidth(); //sets flags on scope for width
                broadcastMenuState();//broadcast out the menu state, will also hide menu when clk menu item?
            });
            //look for our orientatiochanged event
            $scope.$on('ps-menu-orientation-changed-event', function (evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
            })
            //SEVERAL CODE BLOCKS JUST TO REMOVE MENU BUTTON ABOVE 768PX SCREEN WIDTH
            //wrap $window as jQuery obj,call on() func to handle resize evt,added psFramework namespace to the evt so it doesnt conflict, resize evt is fired when window is resized,
            $($window).on('resize.psFramework', function () {
              //upon window resize call checkWidth()
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState(); //our menu state may chg on resize evt so call func here as well
                });
            });
            //when scope receives destroy message,release handler from the window
            $scope.$on('$destroy', function () {
                $($window).off('resize.psFramework');//remove the hand
            });
            //in checkWidth() setting the isMenuVisible variable to true if width > 768
            //need to call checkWidth() after current digest cycle
            var checkWidth = function () {
                //Math.max() takes the largest of 2 values,window.width and window.innerwidth
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width > 768); //true
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                //if open it will close, if closed it will open
                $scope.isMenuVisible = !$scope.isMenuVisible; //toggle the isMenuVisible flag
                broadcastMenuState();//menu btn is part of framework so need to communicate to our menu object so we'll broadcast on rootscope
                $scope.$apply();//since scope will change above
            };
            //broadcasting between menu and framework button
            var broadcastMenuState = function () {//any listener who cares bout menu visibilty will listen to ps-menu-show
                $rootScope.$broadcast('ps-menu-show',//message broadcasting is ps-menu-show, then pass it an obj, need to read in our menu
                    {//sending simple object, show property set to scope.isMenuVisible
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,//set show  and isVertical properties in object
                         allowHorizontalToggle: !$scope.isMenuButtonVisible //if isMenuBtnVisible is true allowHorizTog is false,so add flag to menuctrl
                    }); //broadcast allowHorizTog flag, allows frameworkctrl to ctrl if menu displays horiz or vertical
            };//set listener in menuctrlr
            //need to inject $timeout in frameworkcontroller so we can call checkWidth outside of the current digest cycle,A digest cycle is code that runs at an interval.
            $timeout(function () {//timeout schedules func calls
                checkWidth();//dont need scope.apply because not jquery
            }, 0);//0 means call immediately after the digest cycle

        }
    ]);



















