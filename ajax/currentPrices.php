<?php 

	$obj = array(
		'info' => null,
		'index' => null,
		'all' => null,
		'stocks' => array(),
		'market_categories' => array()
	);

	$response = file_get_contents('http://www.pse.com.ph/stockMarket/home.html?method=getSecuritiesAndIndicesForPublic&ajax=true&_dc='.time());

	// process response
	$arr = json_decode($response);

	foreach ($arr as $key => $item) {

		// format numbers
		if ( !preg_match('/(Stock Update As of)/i', $item->securitySymbol) )
		{
			$item->lastTradedPrice = (float) str_replace(',', '', $item->lastTradedPrice);
			$item->percChangeClose = (float) str_replace(',', '', $item->percChangeClose);
			$item->totalVolume = (float) str_replace(',', '', $item->totalVolume);
		}

		// sort each item
		if ( preg_match('/PSEi/', $item->securityAlias) )
		{
			$obj['index'] = $item;
		}
		elseif ( preg_match('/(All Shares)/', $item->securityAlias) )
		{
			$obj['all'] = $item;
		}
		elseif ( preg_match('/^(Financials|Industrial|Holding Firms|Property|Services|Mining and Oil)$/i', $item->securityAlias) )
		{
			$obj['market_categories'][] = $item;
		}
		elseif ( preg_match('/(Stock Update As of)/i', $item->securitySymbol) )
		{
			$obj['info'] = $item;
		}
		else
		{
			$obj['stocks'][] = $item;
		}

	}

	echo json_encode($obj);


?>