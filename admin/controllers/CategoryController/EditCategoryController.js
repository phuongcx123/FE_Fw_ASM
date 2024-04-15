window.EditCategoryController = function($scope, $http, $location, $routeParams) {
    var api = "http://localhost:3000/category/";
    let id = $routeParams.id 
    $http.get(api + id ).then(function(response) {
        $scope.cate_data = response.data ; 
    })
    $scope.SaveCate = () => {
        if (checkValidite()) {
            
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
                    title: "Edit Category successfully"
                }).then(() => {
                    $http.patch(api+id, angular.copy($scope.cate_data)).then(function() {
                        $location.path("/cate")
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
                title: "Error Edit Category "
            })
        }
    }
    $scope.validate = {
        name: false,
    }
    $scope.error = {
        name: "You cannot leave it blank",
    }

    function checkValidite() {
        $scope.validate.name = $scope.cate_data.name_cate.trim() == "" ? true : false

        if (!$scope.validate.name) {
            return true;
        } else {
            return false;
        }
    }
}