/**
 * Created by Rishabh on 2/21/2016.
 */
var url = "http://localhost:9000/";
var signup = angular.module("signup");

signup.controller("SignUp", function ($scope, $window, $localStorage, $location, $http) {

        $scope.message = "";
        $scope.signUp = function () {

            if ($window.sessionStorage.token) {
                $location.path('/user');
                return;
            }

            if (!$scope.username || !$scope.password || !$scope.name || !$scope.email || !$scope.confirmpassword) {
                $scope.message = "Please enter valid form data.";
                $('#myModal').modal('show', setTimeout(function () {
                    $('#myModal').modal('hide')
                }, 3000));
                return;
            }
            if ($scope.password != $scope.confirmpassword) {
                $scope.message = "Passwords do not match.";
                $('#myModal').modal('show', setTimeout(function () {
                    $('#myModal').modal('hide')
                }, 3000));
                return;

            }
            var userdata = $.param({
                "username": $scope.username, "password": $scope.password, "name": $scope.name, "email": $scope.email
            });
            $http({
                method: 'POST',
                url: url + 'api/signup',
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
    }
);
