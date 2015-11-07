var App = angular.module('App', []);

App.controller('ScoreboardCtrl', function($scope, $http) {
  $http.jsonp('http://data.nba.com/data//json/nbacom/2015/gameline/20151012/games.json')
    .then(function(res){
      // Storing the json data object as 'scores'
      $scope.games = res.data;
    });
});