(function(){
    'use strict';

    angular.module('angulardjango.authentication.controllers')
           .controlleR('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    function LoginController($location, $scope, Authentication){
        var vm = this;

        vm.login = login;

        activate();

        function activate(){
            if (Authentication.isAuthenticated()){
                $location.url('/');
            }
        }

        function login(){
            Authentication.login(vm.email, vm.password);
        }
    }
})();