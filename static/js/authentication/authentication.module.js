(function(){
    'use strict';

    angular.module('angulardjango.authentication', [
        'angulardjango.authentication.controllers',
        'angulardjango.authentication.services'
    ]);

    angular.module('angulardjango.authentication.controllers', []);
    angular.module('angulardjango.authentication.services', ['ngCookies']);

})();