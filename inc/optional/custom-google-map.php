<?php

function my_acf_google_map_api( $api ){
	$mapsApiKey = get_field('bb-google_maps_api_key', 'option');
	$api['key'] = $mapsApiKey;
	return $api;
}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');