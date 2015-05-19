(function () {
	
	angular.module('pse')
		.controller('MainCtrl',function ($scope,stockMarketSvc) {

		// default stockUpdate status
		$scope.stockUpdating = false;
		// default stockFilter string
		$scope.stockFilter = '';
		// default sortType is securitySymbol
		$scope.sortType = 'securitySymbol';
		// default reverse is false
		$scope.reverse = false;
		// collapse toggle, default to false
		$scope.isCollapsed = false;
		
		// update stock prices
		$scope.updateStocks = function () {

			if ( !$scope.stockUpdating ) {

				$scope.stockUpdating = true;
			
				// generate a class for the percentage value
				$scope.getPercClass = function (p) {
					var perc = Number(p);
					return perc > 0  ? 'text-success' : ( perc < 0  ? 'text-danger' : 'text-warning' );
				}

				// open a new window redirecting to pse link of the a stock
				$scope.goToPSE = function (symbol) {

					stockMarketSvc.redirectToPSE(symbol);

				}

				// get a list of updated stock prices
				stockMarketSvc.getCurrentPrices()
				.then(
					function (data) {
						
						// console.log(data);
						$scope.stocksList = data;					

						$scope.stockUpdating = false;

					},
					function () {
						$scope.stockUpdating = false;
						console.warn('promise rejected');
					}
				);

			}
			

		}

		



	});

})();