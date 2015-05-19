<?php 

	$postdata = http_build_query(
	    array(
	        'start' => '0',
	        'limit' => '1',
	        'query'=> $_GET['symbol']
	    )
	);

	$opts = array('http' =>
	    array(
	        'method'  => 'POST',
	        'header'  => 'Content-type: application/x-www-form-urlencoded',
	        'content' => $postdata
	    )
	);

	$context  = stream_context_create($opts);
	$url = 'http://www.pse.com.ph/stockMarket/home.html?method=findSecurityOrCompany&ajax=true';

	$result = file_get_contents($url, false, $context);

	echo $result;

?>