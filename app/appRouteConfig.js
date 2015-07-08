/**
 * Created by marklovett on 7/7/15.
 */
"use strict";

angular.module('app').config(['$routeProvider', function($routeProvider) {
    var routes = [
        {
            url: '/dashboard',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>' //custom directive
            }
        },
        {
            url: '/location',
            config: {
                template: '<wwa-locations></wwa-locations>'
            }
        },
        {
            url: '/guides',
            config: {
                template: '<wwa-guides></wwa-guides>'
            }
        }
    ];
//looping thru above routes,call when func on routeprovider service,passing url and config info
    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });
//otherwise redirect to dashboard page
    $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);