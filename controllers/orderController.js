application.controller('orderController', function($scope, ordersService, statusService) {
  $scope.lstStatus = statusService.get();
  $scope.statusSelected = 0;
  $scope.lstOrders = [];
  $scope.changeStatus = function(id){
    getOrdersByIdStatus(id);
  }
  $scope.getStatusSiguiente = function(idStatus){
    return $scope.lstStatus[idStatus].name;
  }
  $scope.cancel = function(idStatus, idOrder){
    if(idStatus<3){
      let body = {idOrder, idStatus:5};
      ordersService.patch(idOrder,body).success(function(data){
        console.log(data);
        getOrdersByIdStatus($scope.statusSelected);
        alert('successful operation');
      }).error(function(e){
        console.error(e);
      });
    }else{
      alert(`this order can no longer be canceled`);
    }
  }
  $scope.updateStatus = function(idStatus, idOrder){
    if(idStatus<4){
      let idSiguiente = $scope.lstStatus[idStatus].idStatus;
      let body = {idOrder, idStatus:idSiguiente};
      ordersService.patch(idOrder,body).success(function(data){
        console.log(data);
        getOrdersByIdStatus($scope.statusSelected);
        alert('successful operation');
      }).error(function(e){
        console.error(e);
      });
    }else{
      alert(`this order can no longer be changed in status`);
    }
  }
  function getOrdersByIdStatus(id){
    $scope.statusSelected = id;
    ordersService.getByIdStatus(id).success(function(data){
      $scope.lstOrders = data;
      console.log(data);
    }).error(function(e){
      console.error(e);
    });
  }
  getOrdersByIdStatus(1);
});