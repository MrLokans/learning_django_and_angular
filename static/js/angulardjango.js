(function(){
    angular.module('angulardjango', ['angulardjango.routes',
                                     'angulardjango.authentication'
                                     ]);
    angular.module('angulardjango.routes', ['ngRoute']);

    angular.module('angulardjango.config', []);

})();

