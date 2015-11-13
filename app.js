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

	var utc = new Date().getUTCHours();
	var getMktSession = function(utc) {
		var mkt_sessions = [];

		switch(mkt_sessions.join(', ')) {
			case '22 23 0 1 2 3 4 5 6': mkt_sessions.push("Sydney");return mkt_sessions;
			case '22 23 0 1 2 3 4 5': mkt_sessions.push("Wellington");return mkt_sessions;
			case '0 1 2 3 4 5 6 7 8': mkt_sessions.push("Tokyo");return mkt_sessions;
			case '1 2 3 4 5 6 7 8 9': mkt_sessions.push("Hong Kong");return mkt_sessions;
			case '7 8 9 10 11 12 13 14 15': mkt_sessions.push("Frankfurt");return mkt_sessions;
			case '8 9 10 11 12 13 14 15 16': mkt_sessions.push("London");return mkt_sessions;
			case '13 14 15 16 17 18 19 20 21': mkt_sessions.push("New York");return mkt_sessions;
			case '14 15 16 17 18 19 20 21 22': mkt_sessions.push("Chicago");return mkt_sessions;
		}
	}
	$scope.mkt_sessions = getMktSession(utc);
	$interval(getMktSession, 60000);
});

