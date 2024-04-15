window.ListCategoryController = function($scope, $http) {
    var api = "http://localhost:3000/category/";
    var api2 = "http://localhost:3000/user/";
    $http.get(api).then(function(response) {
        $scope.cate = response.data;
        // console.log($scope.cate);
    }).catch(function(error) {
        console.log(error);
    });
    $http.get(api2)
        .then(function(response) {
            $scope.user = response.data;
        })
        .catch(function(error) {
            console.log(error);
        });
    $scope.checkAutur = (id_tg) => {
        if ($scope.user && id_tg != '') {
            $scope.user.forEach(function(user) {
                if (user.id == id_tg) {
                    $scope.hihi = user.name_user;

                }
            });
        }
        // console.log(id_tg);
        return true;
    }
    sapxep();
    function sapxep() {
        $scope.columnName = ''
        $scope.reserve = false;
        $scope.sortData = function(tenCot) {
            if ($scope.columnName != tenCot) {
                $scope.columnName = tenCot
                $scope.reserve = true
            } else {
                $scope.reserve = !$scope.reserve
            }
        }
    }
    $scope.deleteCate = function(id){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#99CC33",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Display a confirmation message for successful deletion
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    // Perform deletion only after the user clicks "OK" on the success message
                    $http.delete(api + id).then((res) => {
                        // Handle successful deletion response if needed
                    }).catch(function(error) {
                        console.log(error);
                    });
                });
            }
        });
    }
}