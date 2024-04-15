window.AddUserController = function($scope, $http) {

    $scope.data = {
        name_user: "",
        bird: "",
        username: "",
        password: "",
        roles: ""
    }
    var api = "http://localhost:3000/user/"
    $http.get(api).then(function(response) {
        $scope.listUrer = response.data;
    })
    $scope.signup = function() {
        if (check()) {
            let date = new Date().toISOString().split("T")[0];
            $scope.data1 = {
                name_user: $scope.data.name_user,
                bird: date,
                username: $scope.data.username,
                password: $scope.data.password,
                roles: $scope.data.roles
            }
           
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Add User successfully"
                }).then(() => {
                    $http.post(api, angular.copy($scope.data1)).then(function() {
    
                    }).catch(function() {});
                })
           
              
            

        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Error Add User "
            })
        }
    }

    $scope.validate = {
        name: false,
        pass: false,
        user: false,
        roles: false,

    }
    $scope.user = "Không được để trống ";
    $scope.pass = "Không được để trống ";
    $scope.name = "Không được để trống ";
    $scope.roles = "Không được để trống ";


    function check() {
        $scope.validate.user = $scope.data.username == "" ? true : false
        $scope.validate.pass = $scope.data.password == "" ? true : false
        $scope.validate.name = $scope.data.name_user == "" ? true : false
        $scope.validate.roles = $scope.data.roles == "" ? true : false

        $scope.listUrer.forEach(value => {
            if (value.username == $scope.data.username ) {
                $scope.validate.user = true ; 
                $scope.user = "Tk Đã Có NGười Đăng Ký  ";
            }
        });
        if (!$scope.validate.name && !$scope.validate.pass && !$scope.validate.user && !$scope.validate.roles) {
            return true;
        } else {

            return false;
        }
    }
}