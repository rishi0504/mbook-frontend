/**
 * Created by Rishabh on 2/14/2016.
 */

var url = "http://localhost:9000/";
var user = angular.module('user');


user.factory('authInterceptor', function ($q, $window) {


    return {
        "request": function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['x-access-token'] = "" + $window.sessionStorage.token;
                config.headers['username'] = "" + $window.sessionStorage.username;
            }
            return config;
        },
        "response": function (response) {
            return response;
        },
        "responseError": function (reject) {
            return reject;
        }
    }
});

user.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});


user.controller("UserCtrl", function ($scope, $http, $window, $rootScope, $location) {
    $scope.allOnlineUsers = {};
    $scope.allOfflineUsers = {};

    if (!$window.sessionStorage.token) {
        $location.path('/sign');
        return;
    }
    $scope.userdata = {};
    $http.get('http://localhost:9000/user/getdetail').success(function (response) {
        $scope.userdata.name = response[0]['name'];
        $scope.userdata.email = response[0]['email'];
        $rootScope.userdata = $scope.userdata;
    });

    $http.get('http://localhost:9000/user/allusers').success(function (response) {
        console.log(response);
        for (var userindex = 0; userindex < response.length; userindex++) {
            if(response[userindex].isOnline){
                $scope.allOnlineUsers[userindex] = response[userindex].name;
                console.log($scope.allOnlineUsers);
            }else {
                $scope.allOfflineUsers[userindex] = response[userindex].name;
            }

        }
    })
});
