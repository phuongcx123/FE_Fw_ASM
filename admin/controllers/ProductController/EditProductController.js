window.EditProductController = function($scope, $http, $location, $routeParams) {
    var api = "http://localhost:3000/products/";
    var api1 = "http://localhost:3000/category/";
    $http.get(api1)
    .then(function(response) {
        $scope.cate = response.data;
    })
    .catch(function(error) {
        console.log(error);
    });
    var id = $routeParams.id ; 
    $http.get(api + id).then(function(response) {
        $scope.product_data = response.data;
        /// console.log($scope.product_data);
    }).catch(function(err) {
        console.log(err);
    });
    $scope.validate = {
        name: false,
        sale: false,
        content: false,
        price: false,
        cate: false,
        image: false,
    }
    $scope.error = {
        name: "You cannot leave it blank",
        sale: "You cannot leave it blank",
        content: "You cannot leave it blank",
        price: "You cannot leave it blank",
        cate: "You cannot leave it blank",
        image: "You cannot leave it blank",
    }

    function checkValidite() {
        $scope.validate.name = $scope.product_data.name == "" ? true : false
        $scope.validate.content = $scope.product_data.content == "" ? true : false
        $scope.validate.cate = $scope.product_data.cate == "" ? true : false
        $scope.validate.image = $scope.product_data.image == "" ? true : false
            // check price 
        if (Number($scope.product_data.price) < 0 || isNaN($scope.product_data.price)) {
            $scope.validate.price = true;
            $scope.error.price = "wrong format"
        } else if ($scope.product_data.price.trim() == "") {
            $scope.validate.price = true;
        } else {
            $scope.validate.price = false;
        }
        // check sale 
        if (Number($scope.product_data.sale)< 0 || isNaN($scope.product_data.sale) || Number($scope.product_data.sale) > 100 ) {
            $scope.error.sale = "wrong format"
            $scope.validate.sale = true;  
        } else if ($scope.product_data.sale.trim() == "") {
            $scope.validate.sale = true;
        } 
        else {
            $scope.validate.sale = false;
        }
        if (!$scope.validate.name && !$scope.validate.sale && !$scope.validate.content && !$scope.validate.price && !$scope.validate.cate && !$scope.validate.image) {
            return true;
        } else {
            return false;
        }
    }
    $scope.savePro = function() {
        if (checkValidite()) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Edit Product successfully"
            }).then(() => {
               // console.log( $scope.product_data);
                 $http.patch(api + id, angular.copy($scope.product_data)).then(function() {
                    $location.path("/list-product") ; 
                 }).catch(function() {});
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Error Edit Product successfully"
            })
        }
    }
}

