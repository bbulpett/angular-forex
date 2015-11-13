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
	var mkt_session = [];
	var getMktSession = function(utc) {

		switch(true) {
			case ( 22 <= utc || utc < 7):
			mkt_session << "Sydney";
				return mkt_session;
			case ( 22 <= utc || utc < 6):
			mkt_session << "Wellington";
				return mkt_session;
			case ( 0 <= utc < 9):
			mkt_session << "Tokyo";
				return mkt_session;
			case ( 1 <= utc < 10):
			mkt_session << "Hong Kong";
				return mkt_session;
			case ( 7 <= utc < 16):
			mkt_session << "Frankfurt";
				return mkt_session;
			case ( 8 <= utc < 17):
			mkt_session << "London";
				return mkt_session;
			case ( 13 <= utc < 22):
			mkt_session << "New York";
				return mkt_session;
			case ( 14 <= utc < 23):
			mkt_session << "Chicago";
				return mkt_session;
		}
	}
	$scope.mkt_session = getMktSession(utc);
	$interval(getMktSession, 60000);
});

