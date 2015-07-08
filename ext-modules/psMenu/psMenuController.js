/**
 * Created by marklovett on 7/2/15.
 */
"use strict";
angular.module('psMenu').controller('psMenuController',
    ['$scope', '$rootScope', //min safe
        function($scope, $rootScope) {

            $scope.isVertical = true;  //set a flag
            $scope.openMenuScope = null;
            $scope.showMenu = true; //set flag, add ng-show="showMenu" to MenuTemplate div class menu-area
            $scope.allowHorizontalToggle = true;

            //create a getter
            this.getActiveElement = function () {
                return $scope.activeElement;
            };
            //on 'this' obj, set the property to a func that receives the element
            this.setActiveElement = function (el) {//setting $scope.activeElement = our activeElement so we can do a comparison in our menuitem dir
                $scope.activeElement = el;//psmenu keep track of active el
            };

            this.isVertical = function () {
                return $scope.isVertical;
            }
            //communicate outside psmenu ctrl, calling broadcast on root scope
            this.setRoute = function (route) {
                $rootScope.$broadcast('ps-menu-item-selected-event',
                    {route: route});
            };

            this.setOpenMenuScope = function (scope) {//setting openMenuScope to menuctrl's own scope
                $scope.openMenuScope = scope; //called in groupdirectve
            }

            $scope.toggleMenuOrientation = function () {
                //close any open menu
                if($scope.openMenuScope)
                    $scope.openMenuScope.closeMenu();

                $scope.isVertical = !$scope.isVertical;

                $rootScope.$broadcast('ps-menu-orientation-changed-event',
                    { isMenuVertical: $scope.isVertical });
            };
            //looking for a clk event in entire doc, so get jquery version of document and bind click evt,
            // so a clk anywhere in the app will execute below code
            angular.element(document).bind('click', function (e) {//passing in the event
                if($scope.openMenuScope && !$scope.isVertical) {//looking at target of evt
                    if($(e.target).parent().hasClass('ps-selectable-item'))//if parent hasclass of ps-selectable-item
                    return; //we're clking in popup so return, else if not clking in popup continue to closeMenu
                $scope.$apply(function () {//must use $apply() because calling a bind obj on a jquery obj and angular wont recognize
                    $scope.openMenuScope.closeMenu();  //else close menu
                });
                    e.preventDefault();//make sure clk doent get passed outside popu menu that we clkd
                    e.stopPropagation();
                }
            });
            //look for the evt using $on
            $scope.$on('ps-menu-show', function (evt, data) {
                $scope.showMenu = data.show; //creating new scope property showMenu
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle; //gets value from data, add ng-show to menuTemplate
            });
        }
    ]);

//need unique message name to broadcast to avoid collisions,
// pass it an obj, call route and pass it the route param
//broadcasting on rootscope used to be inefficient, but now when
// a listener registers rootscope will know exactly where to send message
//need to listen for the message in the psframework ctrl
//must now inject rootscope in main func and min safe array