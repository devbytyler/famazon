angular.module('famazon',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.products = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/products').success(function(data){
				angular.copy(data, $scope.products);
			});
    };
    $scope.getAll();
    $scope.create = function(product) {
			return $http.post('/products', product).success(function(data){
				$scope.products.push(data);
			});
    };
    $scope.doOrder = function() {
      console.log("In DoOrder");
      angular.forEach($scope.products, function(value,key) {
        if(value.selected) {
          $scope.order(value);
          $scope.cart.push(value);
        }
      });
    }

    $scope.order = function(product) {
      return $http.put('/products/' + product._id + '/order')
        .success(function(data){
          console.log("order worked");
          product.orders += 1;
        });
    };

    $scope.addProduct = function() {
      var newObj = {name:$scope.name, orders:0, price:$scope.price, imageUrl: $scope.url};
      $scope.create(newObj);
      $scope.name = '';
      $scope.price = '';
      $scope.url = '';
    }

    $scope.incrementOrder = function(product) {
      $scope.order(product);
    };
 
    $scope.delete = function(product) {
      console.log("Deleting Name "+product.Name+" ID "+product._id);
      $http.delete('/products/'+product._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
