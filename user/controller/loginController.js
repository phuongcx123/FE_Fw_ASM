window.loginController = function($scope, $http, $location) {
    $scope.username = "";
    $scope.password = "";
    var api = "http://localhost:3000/user/"
    $scope.login = function() {
        // checkLogin();
        if (checkLogin()) {
            $http.get(api + "?username=" + $scope.username + "&password=" + $scope.password).then(function(response) {
                if (response.data.length == 0) {
                    alert("Sai username hoặc password  ");

                } else {
                    localStorage.setItem("id", response.data[0].id)
                    localStorage.setItem("name", response.data[0].name_user)
                    localStorage.setItem("roles", response.data[0].roles)
                    window.location.href = "#!/";
                    window.location.reload();
                }
            })

        } else {
            console.log("Sai");
        }

    }
    $scope.validate = {
        name: false,
        pass: false,
    }
    $scope.user = "Bạn Ko Được Để Trống ";
    $scope.pass = "Bạn Ko Được Để Trống ";

    function checkLogin() {
        $scope.validate.name = $scope.username == "" ? true : false
        $scope.validate.pass = $scope.password == "" ? true : false
        if (!$scope.validate.name && !$scope.validate.pass) {
            return true;
        } else {

            return false;
        }
    }
}