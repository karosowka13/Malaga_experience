<?php

$files = array(
	'maps.js' => 'https://www.google.com/maps/d/u/1/embed?mid=1SZt7LdzEOpOgOArtDL5NYxELcxjvBW-s',
	'Open.css' => 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600&display=swap&subset=latin-ext',
  'Montserrat.css' => 'https://fonts.googleapis.com/css?family=Montserrat:500,700&display=swap&subset=latin-ext',
	'fareharbor.js' => 'https://fareharbor.com/embeds/script/calendar/southtours/items/148427/?fallback=simple&full-items=yes&flow=no',
	'ecommerce.js' => 'https://www.google-analytics.com/plugins/ua/ecommerce.js'
);

if(isset($files[$_GET['file']])) {
	if ($files[$_GET['file']] == 'Montserrat.css' || $files[$_GET['file']] == 'Open.css' || $files[$_GET['file']] == 'maps.js'){
		header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + ((60 * 60) * 48))); // 2 days for GA
	} else {
		header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + (60 * 60)*12)); // Default set to 12H
	}

	echo file_get_contents($files[$_GET['file']]);
}



?>