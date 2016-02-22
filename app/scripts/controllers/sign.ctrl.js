/**
 * Created by Rishabh on 2/13/2016.
 */

var url = "http://localhost:9000/";
var mod = angular.module('signin');

mod.controller("SignCtrl", function ($scope, $window, $localStorage, $location, $http) {
    $scope.message = "";
    $scope.signIn = function () {

        if ($window.sessionStorage.token) {
            $location.path('/user');
            return;
        }

        if (!$scope.username || !$scope.password || $scope.password.trim() == "" || $scope.username.trim() == "") {
            $scope.message = "Please enter valid form data.";
            $('#myModal').modal('show', setTimeout(function () {
                $('#myModal').modal('hide')
            }, 3000));
            return;
        }
        var userdata = $.param({
            "username": $scope.username, "password": $scope.password
        });
        $http({
            method: 'POST',
            url: url + 'api/signin',
            data: userdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            if (!data.message) {
                $window.sessionStorage.token = data.token;
                $window.sessionStorage.username = data.user.username;
                $localStorage.statusdata = data.status;
                $location.path('/user');
            } else {
                $scope.message = data.message;
                $('#myModal').modal('show', setTimeout(function () {
                    $('#myModal').modal('hide')
                }, 3000));
            }
        })
    }
});
















