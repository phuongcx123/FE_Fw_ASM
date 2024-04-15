window.cartController = function($scope, $http, $location) {
    var api_cart = "http://localhost:3000/cart/";
    var api_pro = "http://localhost:3000/products/";
    var api_oder = "http://localhost:3000/oder/";
    var id_user = localStorage.getItem("id");

    $scope.Tong = 0;
    $scope.tontai = false;
    $scope.khongtontai = true;


    if (id_user) {

        $http.get(api_cart + "?id_user=" + id_user).then(function(response) {
            $scope.Cart_list = response.data;
            if (response.data.length > 0) {
                $scope.tontai = true;
                $scope.khongtontai = false;
            }

            $scope.Cart_list.forEach(function(item) {
                $http.get(api_pro + item.id_pro).then(function(productResponse) {
                    item.productInfo = productResponse.data;
                    item.totalPrice = item.productInfo.price - (item.productInfo.price * item.productInfo.sale / 100);
                    item.price_tong = item.totalPrice * item.so_luong
                    $scope.Tong += item.price_tong;
                });
            });
        });
    } else {
        console.error('id_user không tồn tại trong localStorage');
    }

    $scope.updateCart = function() {

        $scope.Cart_list.forEach(function(item) {
            $http.patch(api_cart + item.id, angular.copy(item)).then(() => {

            })
        });

    }
    $scope.xoaCart = function(id) {
        let c = confirm("Bạn Muốn  Xóa Sản Phẩm Này  Chứ ? ");
        if (c) {
            $http.delete(api_cart + id).then(() => {
                alert("Xóa Thành Công ");
                $location.path("/cart")
            });
        }
    }
    $scope.xoaAllCart = function() {
        let c = confirm("Bạn Muốn  Xóa Tất Cả  ? ");
        if (c) {

            $scope.Cart_list.forEach(function(item) {
                $http.delete(api_cart + item.id).then(function() {

                });
            });


        }
    }
    $scope.name = "" ;
    $scope.address = "" ;
    $scope.sdt = "" ; 
    $scope.email = "" ; 
    $scope.BuyNow = function() {

       if (variable()) {
       
        $scope.oder = {
            name: $scope.name,
            id_pro: [],
            active: "1",
            so_luong: [],
            sdt: $scope.sdt,
            address: $scope.address,
            email: $scope.email,
            Tong: $scope.Tong + 3,
            date: new Date()
        };
        var promises = $scope.Cart_list.map(function(item) {
            return $http.get(api_cart + item.id).then(function(productResponse) {
                // Lưu thông tin sản phẩm vào item.productInfo
                item.productInfo = productResponse.data;
                // Push id_pro của sản phẩm vào mảng $scope.oder.id_pro
                $scope.oder.id_pro.push(item.productInfo.id_pro);
                $scope.oder.so_luong.push(item.productInfo.so_luong);
            });
        });

        // Sử dụng Promise.all để đợi tất cả các yêu cầu GET API hoàn thành
        Promise.all(promises).then(function() {
            // Sau khi tất cả các yêu cầu GET API đã hoàn thành, thực hiện yêu cầu POST để tạo đơn hàng
            $http.post(api_oder, $scope.oder).then(function(response) {
                // Xử lý khi yêu cầu POST hoàn thành thành công
                var orderId = response.data.id; // ID của đơn hàng được trả về từ server
                $scope.Cart_list.forEach(function(item) {
                    $http.delete(api_cart + item.id).then(function() {

                    });
                });
                // alert('Đã đặt hàng thành công! Mã đơn hàng của bạn là: ' + orderId);
                $location.path("/oder/" + orderId);
            }).catch(function(error) {
                // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu POST
                console.error('Lỗi khi đặt hàng:', error);
                alert('Đã xảy ra lỗi khi đặt hàng!');
            });
        });
       } else { 
        alert("vui lòng xem lại thông tin ")
       }

    };

    $scope.check = {
        name: false,
        sdt: false,
        email: false,
        address: false
    }
  

    function variable() {
        $scope.check.name = $scope.name.trim() == "" ? true : false;
        $scope.check.sdt = $scope.sdt.trim() == "" ? true : false;
        $scope.check.address = $scope.address.trim() == "" ? true : false;
        $scope.check.email = $scope.email.trim() == "" ? true : false;
        if (!$scope.check.name && !$scope.check.sdt && !$scope.check.address && !$scope.check.email) {
            return true;
        } else {
            return false;
        }
    }
};