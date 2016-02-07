(function(){
    angular.module('angulardjango', ['angulardjango.config',
                                     'angulardjango.routes',
                                     'angulardjango.authentication',
                                     'angulardjango.layout',
                                     ]);
    angular.module('angulardjango.routes', ['ngRoute']);

    angular.module('angulardjango.config', []);



    angular.module('angulardjango').run(run);

    run.$inject = ["$http"];

    // Updating xsrf headers to cope with Django csrf token protection
    function run($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();

