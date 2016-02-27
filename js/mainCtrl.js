var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){

  $scope.gridOptions = {
      data: 'songData',
      enableColumnMenus: false,
      rowHeight: 75,
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']}
  };
  $scope.mediaType = "Song";

  $scope.getSongData = function(){
    itunesService.getData($scope.artist).then(function(data){$scope.songData = data;});
    $scope.artist = "";
  }
  $scope.buildGraph = function(){
    console.log("OMG DATA: " + $scope.gridOptions.columnDefs);
    $scope.gridOptions.columnDefs = itunesService.getGraphData($scope.mediaType);
    console.log("OMG DATA: " + $scope.gridOptions.columnDefs);
  }
  $scope.buildGraph();

});
