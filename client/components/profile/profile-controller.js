(function(window, angular, undefined){
    angular.module('app')
    .controller('profileCtrl', ['$scope', '$http', '$state', 'userSvc', function($scope, $http, $state, userSvc){
        var vm = this;
        vm.user = undefined;
        var cachedUser  = localStorage.getItem('user');
        
        if (cachedUser){
            vm.user = JSON.parse(cachedUser);
        }
        $scope.modifyUser = {id:vm.user.id, username:vm.user.username, email: vm.user.email, age: vm.user.age, origin: vm.user.origin,
            famille: vm.user.famille
            , race: vm.user.race
            , nourriture: vm.user.nourriture };

        $scope.modifyingUser = function(user){
            $http.post('/api/user/modifyUser', user).then(function(response){
                console.log(response)
            }, function(err){
                console.error(err);
            })
        };
        $scope.retour = function(){
            $state.go('main');
        }
    }])

})(window, window.angular);