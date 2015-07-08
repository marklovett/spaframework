/**
 * Created by marklovett on 7/2/15.
 */
"use strict";
angular.module('psMenu').directive('psMenuItem', function() {

    return {
        require: '^psMenu', //must pass ctrl below in link func
        scope: {
            label: '@',//displays thru expression in menuitemtemplate
            icon: '@', //displays thru expression in menuitemtemplate
            route: '@' //added route as attribute to menu-item in index.html
        },
        templateUrl: 'ext-modules/psMenu/psMenuItemTemplate.html',
        link: function (scope, el, attr, ctrl) {
            //we dont have access to scope on the ctrlr only have access to ctrlr itself,
            // create isActive func on scope,
            scope.isActive = function () {//if active element, func returns true else false,
                return el === ctrl.getActiveElement();//since dont have access to scope call the func directly on ctrlr to find something already on the scope
            };
            //look at menuctrlr and call isVertical func on that, look at parents of the element,chk for parent of el with class of subitem-section will exist if length>0 and isVertical is true,
            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
                //dont have access to scope on the ctrlr therefore implement
                // it on the ctrlr, added to menuctrlr too, copied func to groupmenudirective as well
            }
        //do something when item is clicked, call jquery's on() function on the element, handle the clk evt,
        // specify a func being passed event
            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault(); //gives us exclusive access to this clik evt
                scope.$apply(function () {
                    ctrl.setActiveElement(el); //psmenu keep track of active el
                    ctrl.setRoute(scope.route);
                })
            });
        }

    }
});

//need to take route out of the scope and send it as a message somewhere,put logic in menu ctrl,
// call ctrl but wrap it in scope.$apply() to inform angular about changes to scope forthcoming,
// since we're handling evt with jquery,angular will not know about scope changing if we dont tell it