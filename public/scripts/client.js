angular.module('fullStackApp', []);
angular.module('fullStackApp').controller('MainController', function($http){
  var vm = this;

  vm.grocery = {};
  vm.groceryList = [];
  var getGroceries = function(){
    $http.get('/groceries').then(function(response){
      if(response.status !== 200){
        console.log('Failed to get any groceries');
      }
      vm.grocery = {};
      vm.groceryList = response.data;
      response.data;
    })
  }
  vm.addItem = function(grocery){
    //test to see if button does anything
    // console.log('Yay!');

    var sendData = {};
    sendData.name = vm.name;
    sendData.qty = vm.qty;

    $http.post('/add', grocery).then(getGroceries);
  };

  // beginning to work on update
  vm.updateItem = function(grocery){
    $http.put('/editWithId', grocery).then(getGroceries);
  }

  //deleting an item, work in progress
  // vm.removeItem = function(){
  //
  //
  // }

  getGroceries();



});
