(function(){
    angular.module('angulardjango', ['angulardjango.routes',
                                     'angulardjango.authentication'
                                     ]);
    angular.module('angulardjango.routes', ['ngRoute']);

    angular.module('angulardjango.config', []);



    angular.module('angulardjango').run(run);

    // Updating xsrf headers to cope with Django csrf token protection
    function run($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCoolieName = 'csrftoken';
    }
})();

