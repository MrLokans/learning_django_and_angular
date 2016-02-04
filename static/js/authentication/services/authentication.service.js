(function(){
    'use strict';

    angular.module('angulardjango.authentication.services')
           .factory('Authentication', Authentication);
    Authentication.$inject = ['$cookies', '$http'];


    function Authentication($cookies, $http){
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };
        return Authentication;


        function register(email, password, username){
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            });
        }

        function loginSuccessFn(data, status, headers, config){
            Authentication.setAuthenticatedAccount(data.data);

            window.location = '/';
        }

        function loginErrorFn(data, status, headers, config){
            console.log('Login went wrong.');
        }

        function login(email, password){
            return $http.post('/api/v1/auth/login', {
                email: email, password: password
            }).then(loginSuccessFn, loginErrFn);
        }

        function getAuthenticatedAccount(){
            if (!$cookies.authenticatedAccount){
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated(){
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account){
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate(){
            delete $cookies.authenticatedAccount;
        }
    }

})();