(function(window, angular, undefined){
    angular.module('app', ['ui.router'])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/client/components/home/home.html',
                controller: 'homeCtrl'
            })
            .state('main', {
                url: '/main',
                templateUrl: '/client/components/main/main.html',
                controller: 'mainCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '/client/components/profile/profile.html',
                controller: 'profileCtrl'
            })
        
        $urlRouterProvider.otherwise('/');
    }])
})(window, window.angular)