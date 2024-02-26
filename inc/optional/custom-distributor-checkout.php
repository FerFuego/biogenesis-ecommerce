<?php 

// Get Distributor NickName
function getDistributorNickName($allDistributor, $province, $locality) {
	$allDistributorNickName = [];
	
	// Get Nick Name For Distributor
	foreach( $allDistributor as $distributor ) {	
		// Get All Locality & Province
		$localityField = get_field('user_distributor_locality', 'user_' . $distributor->ID);
		$provinceField = get_field('user_distributor_province', 'user_' . $distributor->ID);
		if ($localityField === $locality && $provinceField === $province) {

			// Get All Distributor NickName
			$localityField && array_push($allDistributorNickName, get_field('user_distributor_nombre_de_fantasia', 'user_' . $distributor->ID));
		}
	}

	return $allDistributorNickName;
}

// Select Province
function select_province_by_ajax_callback() {

	if ($_POST['action'] == 'select_province_action') {

		$error = '';

		$locality = trim($_POST['locality']);
		$province = trim($_POST['province']);
		$selectIsDisabled = trim($_POST['selectIsDisabled']);

		// Get All Distributor User 
		$allDistributor = get_users( 'role=distributor' );

		$allDistributorLocalities = [];
	
		// Get Nick Name For Distributor
		foreach( $allDistributor as $distributor ) {	
			// Get All Province
			$distributorProvinceField = get_field('user_distributor_province', 'user_' . $distributor->ID);
			if ($distributorProvinceField === $province) {	
				// Get All Localities
				$localityField = get_field('user_distributor_locality', 'user_' . $distributor->ID);
				$localityField && array_push($allDistributorLocalities, $localityField);
			}
		}

		if (empty($error) && !empty($allDistributorLocalities)) {
			wp_send_json_success(array(
				'hasLocalities' => true,
				'allLocalities' => $allDistributorLocalities,
				'disabledDistributorSelect' => ($selectIsDisabled === 'true') ? true : false,
			));

		} else {
			wp_send_json_error(array(
				'hasLocalities' => false,
				'message' => 'Error Ajax',
			));
		}

		

		die(1);
	}
}
add_action('wp_ajax_select_province_action', 'select_province_by_ajax_callback');
add_action('wp_ajax_nopriv_select_province_action', 'select_province_by_ajax_callback');

// Select Locality
function select_locality_by_ajax_callback() {

 
	if ($_POST['action'] == 'select_locality_action') {

		$error = '';

		$locality = trim($_POST['locality']);
		$province = trim($_POST['province']);

		// Get All Distributor User 
		$allDistributor = get_users( 'role=distributor' );

		// $allDistributorLocalities = [];
		$allDistributorNickName = getDistributorNickName($allDistributor, $province, $locality);

		if (empty($error) && !empty($allDistributorNickName)) {
			wp_send_json_success(array(
				'hasDistributor' => true,
				'allDistributor' => $allDistributorNickName,
			));

		} else {
			wp_send_json_error(array(
				'hasDistributor' => false,
				'message' => 'Error Ajax',
			));
		}

		die(1);
	}
}
add_action('wp_ajax_select_locality_action', 'select_locality_by_ajax_callback');
add_action('wp_ajax_nopriv_select_locality_action', 'select_locality_by_ajax_callback');