/**
 * Created by Rishabh on 2/13/2016.
 */


var app = angular.module('app', ['ngRoute', 'signin', 'signup', 'user', 'ngStorage']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html'
        }).when('/home', {
            templateUrl: 'app/views/home.html'
        }).when('/signin', {
            templateUrl: 'app/views/signin.html',
            controller: 'SignCtrl',
            resolve: {
                status: function check($window, $location) {
                    if ($window.sessionStorage.token) {
                        $location.path('/user');
                    }
                }
            }
        }).when('/signup', {
            templateUrl: 'app/views/signup.html',
            controller: 'SignUp',
            resolve: {
                status: function check($window, $location) {
                    if ($window.sessionStorage.token) {
                        $location.path('/user');
                    }
                }
            }
        }).when('/user', {
            templateUrl: 'app/views/user.html',
            controller: 'UserCtrl',
            resolve: {
                status: function check($window, $location) {
                    if (!$window.sessionStorage.token) {
                        $location.path('/signin');
                    }
                }
            }

        }).when('/setting', {
            templateUrl: 'app/views/setting.html'
        }).otherwise({
            redirectTo: '/'
        });

});

app.run(function ($window, $location) {
});


app.controller('MainCtrl', function ($scope,$http, $rootScope, $window, $localStorage, $location) {
    $scope.user = {};
    $scope.islogin = function () {
        if ($window.sessionStorage.token && $window.sessionStorage.username != "") {
            $scope.user.name = $window.sessionStorage.username;
            return true;
        }
    }

    $scope.islogout = function () {
        var userdata = $.param({
            "message": "logout"
        });
        $http({
            method: 'POST',
            url:   'http://localhost:9000/api/signout',
            data: userdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            if (data.message) {
                $window.sessionStorage.token = "";
                $window.sessionStorage.username = "";
                $scope.message = data.message;
                $('#myModal').modal('show', setTimeout(function () {
                    $('#myModal').modal('hide')
                }, 3000));
                $location.path('/signin');
            }
        })
    }
});
