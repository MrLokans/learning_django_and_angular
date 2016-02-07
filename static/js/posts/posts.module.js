(function(){
    'use strict';

    angular
        .module('angulardjango.posts', [
            'angulardjango.posts.controllers',
            'angulardjango.posts.directives',
            'angulardjango.posts.services'
        ]);
    angular
        .module('angulardjango.posts.controllers', []);
    angular
        .module('angulardjango.posts.directives', []);
    angular
        .module('angulardjango.posts.services', []);


})();