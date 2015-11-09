var app = angular.module('app', []);

app.controller('DataCtrl', function ($scope, $http) {
    $http.jsonp('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%22&format=json&diagnostics=true&callback=JSON_CALLBACK').success(function (data) {
		    $scope.data = data;
        // $scope.resources = data.query.results.list.resources;
		    $scope.elements = $scope.data.query.results.list.resources.map(function (res) {
				  var e = {};
				  e.name = res.resource.fields.name;
				  e.price = res.resource.fields.price;
				  e.utctime = res.resource.fields.utctime;

				  return e;
			});
    });
});

app.controller('TimeCtrl', function($scope, $interval) {
	var tick = function() {
		$scope.clock = Date.now();
	}
	tick();
	$interval(tick, 1000);
})
