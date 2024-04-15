window.signupController = function($scope, $http) {

    $scope.data = {
        name_user: "",
        bird: "",
        username: "",
        password: "",
        roles: "2"
    }

    var api = "http://localhost:3000/user/"
    $scope.signup = function() {
        if (check()) {
            let date = new Date().toISOString().split("T")[0];
            $scope.data1 = {
                name_user: $scope.data.name_user,
                bird: date,
                username: $scope.data.username,
                password: $scope.data.password,
                roles: "2"
            }
            $http.post(api, angular.copy($scope.data1)).then(function(response) {
                window.location.href = "index.html#!/login";
                alert('Đăng ký Thành Công ');
            })
        } else {
            console.log("hihihi");
        }
    }

    $scope.validate = {
        name: false,
        pass: false,
        user: false,

    }
    $scope.user = "Không được để trống ";
    $scope.pass = "Không được để trống ";
    $scope.name = "Không được để trống ";


    function check() {
        $scope.validate.user = $scope.data.username == "" ? true : false
        $scope.validate.pass = $scope.data.password == "" ? true : false
        $scope.validate.name = $scope.data.name_user == "" ? true : false

        if (!$scope.validate.name && !$scope.validate.pass && !$scope.validate.user) {
            return true;
        } else {

            return false;
        }
    }
}