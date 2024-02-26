<?php 

add_action('rest_api_init', 'biogenesis_bago_register_rest_routes');

// Register Rest Route
function biogenesis_bago_register_rest_routes() {

	register_rest_route('bb/v1', 'veterinarias', array(
		'methods' => WP_REST_SERVER::READABLE,
		'callback' => 'vetesSearch',
		'permission_callback' => '__return_true',
	));

	register_rest_route('bb/v1', 'veterinaria', array(
		'methods' => WP_REST_SERVER::READABLE,
		'callback' => 'vetSearch',
		'permission_callback' => '__return_true',
	));

	register_rest_route('bb/v1', 'new_veterinarias', array(
		'methods' => WP_REST_SERVER::READABLE,
		'callback' => 'NewVetesSearch',
		'permission_callback' => '__return_true',
	));
}

// Get Veterinarias Data
function vetesSearch() {

	$veterinariasArray = [];
	$veterinariasArrayLocalitys = [];
	$veterinariasArrayProvinces = [];
	
	// Query Agents
	$veterinariasQuery = new WP_User_Query([
		'role' => 'Distributor',
	]);
    
    // User Loop
    if ( ! empty( $veterinariasQuery->get_results() ) ) {
        foreach ( $veterinariasQuery->get_results() as $user ) {
			$veterinariasArray[] = get_field('user_distributor_nombre_de_fantasia', 'user_'.$user->ID);
			$veterinariasArrayLocalitys[] = get_field('user_distributor_locality', 'user_'.$user->ID);
			$veterinariasArrayProvinces[] = get_field('user_distributor_province', 'user_'.$user->ID);
        }
    }
    
	// Return Data
	return array(
		'veterinarias' => $veterinariasArray,
		'veterinariasLocalitys' => $veterinariasArrayLocalitys,
		'veterinariasProvinces' => $veterinariasArrayProvinces,
	);
}

// Get Search Veterinaria Data
function vetSearch() {
	$type		= sanitize_text_field($_GET['type']);
	$search		= sanitize_text_field($_GET['search']);
	$province	= sanitize_text_field($_GET['province']);
	$locality	= sanitize_text_field($_GET['locality']);
	$distributor = sanitize_text_field($_GET['distributor']);

	// Type of Query
	if ($type === 'search') {
		// Search input
		$meta_query = array(
            'relation'  => 'AND',
            array( 
                'key'     => 'user_distributor_nombre_de_fantasia',
                'value'   => $search,
				'compare' => '='
            )
		);
	} else {
		// Selects Inputs
		$meta_query = array(
            'relation'  => 'AND',
            array( 
                'key'     => 'user_distributor_province',
                'value'   => $province,
				'compare' => '='
            ),
            array(
                'key'     => 'user_distributor_locality',
                'value'   => $locality,
                'compare' => '='
			),
			array(
				'key'     => 'user_distributor_nombre_de_fantasia',
				'value'   => $distributor,
				'compare' => '='
			),
        );
	}

	// Query Vetes
	$query = new WP_User_Query([
		'role'		=> 'Distributor',
		'number'	=> 1,
		'meta_query'    => $meta_query,
	]);
    
    // User Loop
    if ( ! empty( $query->get_results() ) ) {
        $user 		= $query->get_results()[0];
		$vet_id 	= $user->ID;
		$name		= get_field('user_distributor_nombre_de_fantasia', 'user_'.$user->ID);
		$locality	= get_field('user_distributor_locality', 'user_'.$user->ID);
		$province	= get_field('user_distributor_province', 'user_'.$user->ID);
		$address	= get_field('user_distributor_client_street', 'user_'.$user->ID);
		$phone		= get_field('user_distributor_telefono', 'user_'.$user->ID);
		$email		= get_field('email-notificaciones-veterinaria', 'user_'.$user->ID);
		$tecnico	= get_field('user_distributor_tecnico-vendedor', 'user_' . $user->ID);
		$emailAlt	= get_field('email-notificaciones-veterinaria-alternativo', 'user_' . $user->ID); 
    }

	// Send Error
	if (!$vet_id) wp_send_json_error(array('message' => 'Revisá que los datos ingresados sean correctos.'));

	// Return Data
	wp_send_json_success([
		'type'		=> $type,
		'vet_id' 	=> $vet_id,
		'distributor' => $name,
		'province'	=> $province,
		'locality'	=> $locality,
		'address'	=> $address,
		'phone'		=> $phone,
		'techID'	=> $tecnico->ID,
		'techName'	=> $tecnico->data->user_login,
		'email'		=> $email,
		'emailAlt'	=> $emailAlt,
	]);
}

// New Get Veterinarias Data
function NewVetesSearch() {

	$vetes = [];
	
	// Query Agents where name is equal to search
	$query = new WP_User_Query([
		'role' => 'Distributor',
		'meta_query' => array(
			array(
				'key'     => 'user_distributor_nombre_de_fantasia',
				'value'   => sanitize_text_field($_GET['search']),
				'compare' => 'LIKE'
			)
		)
	]);
    
    // User Loop
    if ( ! empty( $query->get_results() ) ) {
        foreach ( $query->get_results() as $user ) {
			$vetes[] = array(
				//'id' => $user->ID,
				'id' => get_field('user_distributor_nombre_de_fantasia', 'user_'.$user->ID),
				'name' => get_field('user_distributor_nombre_de_fantasia', 'user_'.$user->ID),
			);
        }
    }
    
	// Return Data
	return $vetes;
}