window.shopController = function($scope, $http) {
    var api = "http://localhost:3000/products/"
    var api1 = "http://localhost:3000/category/";

    $http.get(api1).then(function(response) {
        $scope.cate = response.data
    });
    $http.get(api).then(function(response) {
        $scope.listPro = response.data;
        console.log($scope.listPro.length);

    }).catch((err) => {
        console.log(err);
    })
    $scope.addCart = function(id) {
        let id_pro = id
        $scope.data_cart = {
            id_pro: id_pro,
            so_luong: 1,
            id_user: localStorage.getItem("id")
        };
        console.log(id_pro);
        var api_cart = "http://localhost:3000/cart/"
        if (localStorage.getItem("id") == undefined) {
            alert("Bạn Phải Đăng Nhập ")
        } else {
            $http.get(api_cart).then(function(response) {
                $scope.cart = response.data;
                if (check_cart(id_pro)) {
                    let updatedQuantity = $scope.sl_new +1;
                    console.log(updatedQuantity);
                    // Gửi yêu cầu PATCH để cập nhật số lượng sản phẩm
                    $http.patch(api_cart + $scope.id_cart, { so_luong: updatedQuantity }).then(function(response) {

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

    function check_cart(id) {
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