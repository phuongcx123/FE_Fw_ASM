window.homeController = function ($scope , $http) { 
    var api = "http://localhost:3000/products/" 
    $http.get(api).then(function (response) {
        $scope.listPro = response.data ;
     } ).catch((err) => {
        console.log(err);
    })
}