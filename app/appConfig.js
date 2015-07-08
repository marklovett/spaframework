/**
 * Created by marklovett on 7/2/15.
 */

angular.module('app').config(function($provide) {
  $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
         return function(exception, cause) {
             $delegate(exception, cause);
             alert(exception.message);
         };
    }]);
 });

