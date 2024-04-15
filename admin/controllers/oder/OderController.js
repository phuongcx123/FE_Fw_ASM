window.OderController = function($scope, $http) {
    var api = "http://localhost:3000/oder/";

    // Lấy dữ liệu từ API
    $http.get(api).then(function(response) {
        $scope.listOder = response.data;

        // Chuẩn bị dữ liệu cho biểu đồ
        const labels = [];
        const data = [];
        $scope.tongTienTong = 0; 
        // Lặp qua dữ liệu đơn hàng để tạo labels và data cho biểu đồ
        response.data.forEach(function(oder) {
            var date = new Date(oder.date); // Đây là thời gian UTC
            var vnTime = date.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });




            $scope.tongTienTong += oder.Tong;
         
            labels.push(vnTime); // Giả sử month là thuộc tính chứa tên tháng
            data.push(oder.Tong); // Giả sử quantity là thuộc tính chứa số lượng đơn hàng
        });
        console.log($scope.tongTienTong);
        // Cấu hình cho biểu đồ
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tổng Tiền : ' +'$ '+ $scope.tongTienTong ,
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        };

        // Lấy tham chiếu đến canvas
        var ctx = document.getElementById('myChart').getContext('2d');
        // Tạo một biểu đồ dạng đường
        var myChart = new Chart(ctx, config);
    });

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