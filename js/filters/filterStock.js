(function () {
	
	angular.module('pse')
	.filter('filterStock',function () {
		return function (items,stockFilter) {

			if ( stockFilter )
			{
				return items.filter(function (item) {
									
					var filtered = stockFilter.trim().split(/[,\s\|]/gi).filter(function (txt) {
						var regex = new RegExp(txt,'gi');
						if (txt)
						{						
							return !!~item.securitySymbol.search(regex) || !!~item.securityAlias.search(regex);
						}
						else
						{
							return false
						}					
						
					});

					return filtered.length > 0;

				});
			}
			else
			{
				// return the original array if stockFilter is empty
				return items
			}

		}
	})

})();