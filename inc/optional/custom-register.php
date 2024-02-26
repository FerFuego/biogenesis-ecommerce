<?php 
/**
 * Register User
 */
function st_handle_registration() {

	if ($_POST['action'] == 'register_action') {

		$error = '';
		$email = trim($_POST['mail_id']);
		$pswrd = trim($_POST['passwrd']);
		$termsAndConditions = $_POST['termsAndConditions'];
		$allUsers = get_users();

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

		if ($termsAndConditions === 'false') {
			$error .= '<p class="error"><img src="'.get_template_directory_uri().'/assets/img/elements/atention.svg;">Deben aceptarse los Términos y Condiciones</p>';
			$termsAndConditions = 'error';
		}

		foreach ($allUsers as $user) {
			if ($email == $user->user_email) {
				$error .= '<p class="error"><img src="'.get_template_directory_uri().'/assets/img/elements/atention.svg;">Este Correo ya se encuentra registrado</p>';
				$email = 'error';
			}
		}

		if (empty($error)) {
				wp_send_json_success(array('hasRegister' => true ));
		} else {
			wp_send_json_error(array(
				'hasRegister' => false,
				'message' => $error,
				'validation' => array(
					'email' => $email,
					'password' => $pswrd,
					'termsAndConditions' => $termsAndConditions,
				),
			));
		}
	}
}

add_action('wp_ajax_register_action', 'st_handle_registration');
add_action('wp_ajax_nopriv_register_action', 'st_handle_registration');