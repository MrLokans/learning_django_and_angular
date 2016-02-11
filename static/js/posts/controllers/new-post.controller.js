(function(){
    'use strict';

    angular
        .module('angulardjango.posts.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

    function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts){
        var vm = this;

        function submit(){
            $rootScope.$broadcast('post.created', {
                content: vm.content,
                author: {
                    username: Authentication.getAuthenticatedAccount().username
                }
            });
        }

        $scope.closeThisDialog();

        Posts.create(vm.content).then(createPostSuccessFn, createPostErrFn);

        function createPostSuccessFn(data, status, headers, config){
            Snackbar.show('Post created');
        }

        function createPostErrFn(data, status, headers, config){
            $rootScope.$broadcast('post.created.error');
            Snackbar.error(data.error);
        }


    }
})();