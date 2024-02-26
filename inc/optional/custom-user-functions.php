<?php
function st_handle_create_user() {

	if ($_POST['action'] == 'create_user_action') {

		$email = sanitize_text_field(trim($_POST['mail_id']));
		$pswrd = sanitize_text_field($_POST['password']);
		
		// Create a new user
		$user_id = wp_create_user($email, $pswrd, $email);

		// Login user
		if (!is_wp_error($user_id)) {
			$user = get_user_by( 'id', $user_id );
			wp_set_current_user( $user_id, $user->user_login );
			wp_set_auth_cookie( $user_id );
			do_action( 'wp_login', $user->user_login, $user );
			
			// Redirect the user
			wp_send_json_success(array(
				'hasRegister' => true,
			));
		} else {
			wp_send_json_error(array(
				'hasRegister' => false,
				'message' => $user_id->get_error_message(),
			));
		}
	}
}

add_action('wp_ajax_create_user_action', 'st_handle_create_user');
add_action('wp_ajax_nopriv_create_user_action', 'st_handle_create_user');


/**
 * AJAX: Update User Contact Information
 */
function st_handle_update_user_contact_information() {

	if ($_POST['action'] == 'update_user_contact_information_action') {

		//$establishmentName = htmlspecialchars(trim($_POST['establishmentName']));
		$address = htmlspecialchars(trim($_POST['adress']));
		$province = htmlspecialchars(trim($_POST['province']));
		$locality = htmlspecialchars(trim($_POST['locality']));
		//$cuit = htmlspecialchars(trim($_POST['cuit']));
		//$renspa = htmlspecialchars(trim($_POST['renspa']));
		$userId = get_current_user_id();

		$errors = '';

		if (empty($province) || $province == 'Provincia') {
			$errors .= '<p class="error">El campo "Provincia" es obligatorio</p>';
		}

		/*if (empty($establishmentName)) {
			$errors .= '<p class="error">El campo "Nombre de establecimiento / Razón Social" es obligatorio</p>';
		}*/

		if (empty($locality)) {
			$errors .= '<p class="error">El campo "Departamento/Localidad" es obligatorio</p>';
		}

		/* if ( mb_strlen($cuit,'UTF-8') !== 11) {
			$errors .= '<p class="error">El CUIT debe contener 11 números</p>';
		} */

		/* if ( !is_numeric($cuit) ) {
			$errors .= '<p class="error">El CUIT debe ser un número</p>';
		} */

		/* if ( mb_strlen($renspa,'UTF-8') !== 13 ) {
			$errors .= '<p class="error">El RENSPA debe contener 13 números</p>';
		} */

		/* if ( !is_numeric($renspa) ) {
			$errors .= '<p class="error">El RENSPA debe ser un número</p>';
		} */

		if ($errors) {
			wp_send_json_error(array(
				'loggedIn'=> false, 
				'errors' => $errors,
			));

		} else {
			// Success	
			//update_user_meta( $userId, 'billing_company', sanitize_text_field( $establishmentName ) );
			//update_user_meta( $userId, 'billing_address_1', sanitize_text_field( $address ) );
			//update_user_meta( $userId, 'billing_cuit', sanitize_text_field( $cuit ) );
			//update_user_meta( $userId, 'billing_renspa', sanitize_text_field( $renspa ) );
			//update_user_meta( $userId, 'billing_province', sanitize_text_field( $province ) );
			//update_user_meta( $userId, 'billing_locality', sanitize_text_field( $locality ) );

			wp_send_json_success(array(
				'loggedIn' => true,
			));
		}
	}
}
add_action('wp_ajax_update_user_contact_information_action', 'st_handle_update_user_contact_information');
add_action('wp_ajax_nopriv_update_user_contact_information_action', 'st_handle_update_user_contact_information');