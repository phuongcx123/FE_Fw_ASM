window.detailProContronler = function($scope, $http, $routeParams) {
    var api = "http://localhost:3000/products/"
    var api1 = "http://localhost:3000/category/";
    var id = $routeParams.id;
    $http.get(api1).then(function(response) {
        $scope.cate = response.data
    });
    $http.get(api + id).then(function(response) {
        $scope.listPro = response.data;
        // console.log($scope.listPro);
    }).catch((err) => {
        console.log(err);
    })
    $scope.checkCondition = function(id) {
        $scope.namecate = '';
        if ($scope.cate && id != '') {
            var found = false;
            $scope.cate.forEach(function(val) {
                if (val.id === id) {
                    $scope.namecate = val.name_cate;
                    found = true;
                }
            });
            return found;
        }
        return false;
    };
    $http.get(api).then(function(response) {
        $scope.listPro1 = response.data;
    }).catch((err) => {
        console.log(err);
    })
    $scope.sl = 1;
    if ($scope.sl < 0) {
        $scope.sl = 1;
    }
    $scope.tang = function() {
        $scope.sl++;
    };

    $scope.giam = function() {
        if ($scope.sl > 1) { // Đảm bảo giá trị không âm
            $scope.sl--;
        }
    };

    // add giỏ hàng 
    $scope.addCart = function() {
        $scope.data_cart = {
            id_pro: id,
            so_luong: $scope.sl,
            id_user: localStorage.getItem("id")
        };
        var api_cart = "http://localhost:3000/cart/"
        if (localStorage.getItem("id") == undefined) {
            alert("Bạn Phải Đăng Nhập ")
        } else {
            $http.get(api_cart).then(function(response) {
                $scope.cart = response.data;
                if (check_cart()) {
                    let updatedQuantity = $scope.sl_new + $scope.sl;
                    console.log(updatedQuantity);
                    // Gửi yêu cầu PATCH để cập nhật số lượng sản phẩm
                    $http.patch(api_cart + $scope.id_cart, { so_luong: updatedQuantity }).then(function(response) {
                        alert("cập nhật số lượng thành công ")
                    })
                } else {
                    $http.post(api_cart, angular.copy($scope.data_cart)).then(function(response) {
                        alert("Thêm Vào Giỏ Thành Công");
                    }).catch(function(error) {
                        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
                    });
                }
            });
        }
    }

    function check_cart() {
        if (!$scope.cart) {
            return false;
        }
        let kq = false;
        $scope.cart.forEach(val => {
            if (val.id_pro == id) {
                $scope.id_cart = val.id;
                $scope.sl_new = val.so_luong;
                kq = true;
            }
        })
        return kq;
    }

}