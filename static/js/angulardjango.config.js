(function(){
    'use strict';

    angular.module('angulardjango.config')
           .confif(config);

    config.$inject = ['$locationProvider'];

    function $config($locationProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();