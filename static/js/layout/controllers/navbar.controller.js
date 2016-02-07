(function(){
    'use strict';
    angular
        .module('angulardjango.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];

    function NavbarController($scope, Authentication){
        var vm = this;
        console.log("SMT");
        vm.logout = function(){
            console.log("Logging out!");
            Authentication.logout();
        };
    }
})();