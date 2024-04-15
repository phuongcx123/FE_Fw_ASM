myApp.controller("header", function($scope, $http, $location) {
    $scope.userName = localStorage.getItem("name");
    let id = localStorage.getItem("id");
    $scope.roles = localStorage.getItem("roles");
    $scope.check = {
        userName: true,
        roles: false,
        hien: false,
    }
    check()

    function check() {
        if ($scope.userName != null) {
            if ($scope.roles == "1") {
                $scope.check.roles = true;
            }
            return $scope.check.userName = false, $scope.check.hien = true, $scope.check.roles;
        }
    }
    $scope.logout = function() {
        $scope.userName = localStorage.removeItem("name");
        $scope.roles = localStorage.removeItem("roles");
        $scope.roles = localStorage.removeItem("id");
        $location.path("/")
        window.location.reload();
    }
    $scope.logout1 = function() {
        $scope.userName = localStorage.removeItem("name");
        $scope.roles = localStorage.removeItem("roles");
        $scope.roles = localStorage.removeItem("id");
        window.location.href = "../../user/index.html#!/login";
    }

    if (id != undefined) {
        count_cart();
    }

    function count_cart() {
        var api_cart = "http://localhost:3000/cart/"
        $http.get(api_cart).then(function(response) {
            $scope.count = 0;
            response.data.forEach(val => {
                if (val.id_user == id) {
                    $scope.count++;
                }
            });
        })
    }


})