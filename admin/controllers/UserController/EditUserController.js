window.EditUserController = function($scope, $http, $routeParams , $location) {

    let id = $routeParams.id;
    var api = "http://localhost:3000/user/"
    $http.get(api+id).then(function(response) {
        $scope.data = response.data;
    })
   
    $scope.signup = function() {
        if (check()) {
           
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
                title: " successfully"
            }).then(() => {
             
                $http.patch(api+id, angular.copy($scope.data)).then(function() {
                    $location.path("/user")
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
                title: "Error User "
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

       
        if (!$scope.validate.name && !$scope.validate.pass && !$scope.validate.user && !$scope.validate.roles) {
            return true;
        } else {

            return false;
        }
    }
}