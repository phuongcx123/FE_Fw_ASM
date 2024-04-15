window.ViewOderController = function($scope, $http, $routeParams, $location, $timeout) {
    $scope.id = $routeParams.id;
    var api = "http://localhost:3000/oder/";
    var api1 = "http://localhost:3000/products/";
    $http.get(api + $routeParams.id).then((res) => {
        $scope.data = res.data;

        $scope.so_luong = res.data.so_luong;
        // Lấy mảng id_pro từ dữ liệu
        var id_pro = res.data.id_pro;
        $scope.san_pham = [];
        // Duyệt qua mỗi phần tử trong mảng id_pro
        for (var i = 0; i < id_pro.length; i++) {
            $http.get(api1 + id_pro[i]).then((res) => {
                // console.log(res.data);
                $scope.san_pham.push(res.data);
            })
        }


        $scope.save = function() {
            let id = $scope.data.active;
            $http.patch(api + $routeParams.id, { active: id }).then((res) => {
               
              
                    $location.path("/oder");
            
            })
        }


        // console.log($scope.san_pham);
    })
}