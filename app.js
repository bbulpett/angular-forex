var App = angular.module('App', []);

App.controller('ForexCtrl', function ($scope, $http) {
    $http.jsonp('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%22&format=jsonp&callback=JSON_CALLBACK').success(function (data) {
        $scope.data = data;
    });
});

// var App = angular.module('App', []);

// function jsonp_callback(data) {
// 	console.log(data.found);
// }

// var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%22&format=json&diagnostics=true&callback=jsonp_callback";

// App.controller('ScoreboardCtrl', function($scope, $http) {
//   $http.jsonp(url);
// });