window.ListUserControler = function($scope, $http) {
    var api = "http://localhost:3000/user/";
    $http.get(api).then(function(response) {
        $scope.listUrer = response.data;
    }).catch((err) => {
        console.log(err);
    })
    $scope.deleteUser = (id) => {
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