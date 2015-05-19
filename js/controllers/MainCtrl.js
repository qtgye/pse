(function () {
	
	angular.module('pse')
		.controller('MainCtrl',function ($scope,stockMarketSvc) {

		// default stockFilter string
		$scope.stockFilter = '';
		// default sortType is securitySymbol
		$scope.sortType = 'securitySymbol';
		// default reverse is false
		$scope.reverse = false;
		// collapse toggle, default to false
		$scope.isCollapsed = false;
		
		// stockMarketSvc.test()
		// 	.then(
		// 		function (data) {
				
		// 			$scope.stocksList = data;

		// 		},
		// 		function (data) {
		// 			console.log('promise rejected');
		// 		}
		// 	);

		// generate a class for the percentage value
		$scope.getPercClass = function (p) {
			var perc = Number(p);
			return perc > 0  ? 'text-success' : ( perc < 0  ? 'text-danger' : 'text-warning' );
		}

		// 
		$scope.goToPSE = function (symbol) {

			stockMarketSvc.redirectToPSE(symbol);

		}

		// get a list of updated stock prices
		stockMarketSvc.getCurrentPrices()
			.then(
				function (data) {
					
					console.log(data)
					$scope.stocksList = data;

					// slide collapse
					$scope.isCollapsed = true;

				},
				function () {
					console.log('promise rejected');
				}
			);



	});

})();