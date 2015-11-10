var app = angular.module('app', []);

var pairsArray = ['EURUSD', 'GBPJPY', 'AUDNZD'];
var pairsQuery = "'" + pairsArray.join(",") + "'";

app.controller('DataCtrl', function ($scope, $http, $timeout) {

	$scope.getData = function() {
		var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
		var yql_query = "select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("+pairsQuery+")";
		var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
			$http.jsonp(yql_query_url).success(function (data) {

			    $scope.data = data;
			    $scope.elements = $scope.data.query.results.rate.map(function (resource) {
					  var e = {};
					  e.name = resource.Name;
					  e.rate = resource.Rate;
					  e.bid = resource.Bid;
					  e.ask = resource.Ask;
					  e.updateTime = resource.Time;
	
					  return e;
				});
			});
		};

		$scope.intervalFunction = function(){
			$timeout(function() {
				$scope.getData();
				$scope.intervalFunction();
			}, 1000)
		};
    $scope.intervalFunction();
});

app.controller('TimeCtrl', function($scope, $interval) {
	var tick = function() {
		$scope.clock = Date.now();
	}
	tick();
	$interval(tick, 1000);
});
