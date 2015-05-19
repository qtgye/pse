;(function () {
	
	angular.module('pse').factory('stockMarketSvc',function ($http,$window) {
		
		var obj = {};


		obj.test = function () {

			return $http.get('ajax/test.php')
				.then(
					function (r) {
					
						return r.data

					},
					function (r) {						
						
						return $q.reject(r.data);

					});

		}

		obj.getCurrentPrices = function () {
			
			return $http.get('ajax/currentPrices.php')
				.then(
					function (r) {
					
						return r.data

					},
					function (r) {						
						
						return $q.reject(r.data);

					});

		}

		obj.redirectToPSE = function (symbol) {

			$http({
				method: 'GET',
				url: 'ajax/getStockInfo.php?symbol='+symbol
				})
				.success(function (r) {					
						
					$window.open('http://www.pse.com.ph/stockMarket/companyInfo.html?id='+r.records[0].listedCompany_companyId+'&security='+r.records[0].securityId+'&tab=0');					

				});

		}


		return obj;

	});

})();