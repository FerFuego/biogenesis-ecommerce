jQuery(document).ready(function ($) {
    /* --- 1. Registration (AJAX) --- */
	jQuery("#register-me").on("click", function () {
		if ($(this).is("[disabled]")) {
			e.preventDefault();
		}
		const action = "register_action";
		const username = jQuery("#st-username").val();
		const mail_id = jQuery("#st-email").val();
		const passwrd = jQuery("#st-psw").val();
		const termsAndConditions = $('#st-terms-and-conditions').prop("checked");
		const errorRegisterContainer = $('.sign-up__first-step .error-message');

		$.ajax({
			type: "POST",
			dataType: "json",
			url: bio_vars.ajaxUrl,
			data: {
				action,
				mail_id,
				passwrd,
				username,
				termsAndConditions
			},
			beforeSend: function () {
				// remove the error message from the previous attempt
				const labels = document.querySelectorAll('#st-register-form label');
				labels.forEach(label => {
					label.classList.remove('error');
				});
				const input = document.querySelectorAll('#st-register-form input');
				input.forEach(input => {
					input.classList.remove('error');
				});
				// add loader btn submit
				$('#register-me').attr('disabled', true);
				$('#register-me').addClass('loading');
				$('#register-me').html('');
			},
			success: function ({ data }) {
				const { hasRegister, message } = data;
				if ( hasRegister ) {
					handleCreateUser(mail_id, passwrd);					
				} else {
					handleValidation(data);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$('#register-me').attr('disabled', false);
				$('#register-me').removeClass('loading');
				$('#register-me').html('Registrarse');
			}
		});
	});

	const handleValidation = (data) => {
		
		if ( data.validation.email == 'error' ) {
			$('#st-register-form .field-email label').addClass('error');
			$('#st-register-form .field-email input').addClass('error');
		} 
		if ( data.validation.password == 'error' ) {
			$('#st-register-form .field-password label').addClass('error');
			$('#st-register-form .field-password input').addClass('error');
		} 
		if ( data.validation.termsAndConditions == 'error' ) {
			$('.sign-up__terms-and-conditions-copy').addClass('error');
		}

		$('#register-me').attr('disabled', false);
		$('#register-me').removeClass('loading');
		$('#register-me').html('Registrarse');

		jQuery("#st-register-form .error-message").html(data.message);
	}

	/* -- Create User Ajax + Login -- */
	const handleCreateUser = (mail_id, password) => {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: bio_vars.ajaxUrl,
			data: {
				action: "create_user_action", //calls wp_ajax_nopriv_ajaxlogin
				mail_id,
				password,
			},
			success: function (response) {
				if (response.data.hasRegister === true) {
					jQuery("#st-register-form .error-message").html('<p class="success">Se ha registrado correctamente, redireccionando...</p>');
					setTimeout(function () {
						window.location.href = document.location.origin;
					}, 3000);
				} else {
					$('#register-me').prop('disabled', false);
					$('#register-me').removeClass('loading');
					$('#register-me').html('Registrarse');
					jQuery("#st-register-form .error-message").html(message);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log('Error handleCreateUser');
		 	}
		});
	}

	/* -- Change state password -- */
	jQuery("#js-change-view-password").on("click", function () {
		if (jQuery("#st-psw").attr("type") == "password") {
			jQuery("#st-psw").attr("type", "text");
			jQuery("#js-change-view-password").addClass("active");
		} else {
			jQuery("#st-psw").attr("type", "password");
			jQuery("#js-change-view-password").removeClass("active");
		}
	});
});