<?php
/* 
 * Login
 */
add_action('wp_ajax_ajax_login', 'ajax_login');
add_action( 'wp_ajax_nopriv_ajax_login', 'ajax_login' );
function ajax_login() {

	$error = '';
	$email = trim($_POST['mail_id']);
	$pswrd = trim($_POST['password']);

	if (empty($_POST['mail_id'])) {
		$error .= '<p class="error"><img src="'.get_template_directory_uri().'/assets/img/elements/atention.svg;">Ingrese una dirección de email.</p>';
		$email = 'error';
	} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$error .= '<p class="error"><img src="'.get_template_directory_uri().'/assets/img/elements/atention.svg;">Ingrese una dirección de email válida.</p>';
		$email = 'error';
	}

	if (empty($pswrd)) {
		$error .= '<p class="error"><img src="'.get_template_directory_uri().'/assets/img/elements/atention.svg;">Ingrese una contraseña.</p>';
		$pswrd = 'error';
	}

	if (empty($error)) {
		// First check the nonce, if it fails the function will break
		check_ajax_referer('ajax-login-nonce', 'security');

		// Nonce is checked, get the POST data and sign user on
		$info = array();
		$info['user_login'] = $_POST['mail_id'];
		$info['user_password'] = $_POST['password'];
		$info['remember'] = true;

		$user_signon = wp_signon($info, true);

		if (is_wp_error($user_signon)) {
			wp_send_json_error(array(
				'loggedin'	=> false,
				'message'	=> '<p class="error"><img src="'.get_template_directory_uri().'/assets/img/elements/atention.svg;">Usuario o contraseña incorrectos.</p>',
				'validation'	=> array(
					'email'		=> true,
					'password'	=> true
				),
			));
		} else {
			wp_send_json_success(array(
				'loggedin'	=> true,
				'message'	=> '<p class="success">Inicio de sesión exitoso, redirigiendo al sitio...</p>' 
			));
		}
	} else {
		wp_send_json_error(array(
			'loggedin'	=> false,
			'message'	=> $error,
			'validation'	=> array(
				'email'		=> $email,
				'password'	=> $pswrd
			),
		));
	}
}
