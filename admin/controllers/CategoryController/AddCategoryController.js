window.AddCategoryController = function($scope, $http) {
    var api = "http://localhost:3000/category/";
    $scope.cate_data = {
        name_cate: "",
        author: localStorage.getItem("id")
    }

    $scope.addCate = () => {
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
                    title: "Add Category successfully"
                }).then(() => {
                    $http.post(api, angular.copy($scope.cate_data)).then(function() {
    
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
                title: "Error Add Category "
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