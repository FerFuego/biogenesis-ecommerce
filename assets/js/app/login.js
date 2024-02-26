jQuery(document).ready(function ($) {

    /* --- 2. Login (AJAX) --- */
	$("#js-login-submit-btn").on("click", function (e) {
		if ($(this).is("[disabled]")) {
			e.preventDefault();
		}
		$.ajax({
			type: "POST",
			dataType: "json",
			url: bio_vars.ajaxUrl,
			data: {
				action: "ajax_login", //calls wp_ajax_nopriv_ajaxlogin
				mail_id: $("form#login #username").val(),
				password: $("form#login #password").val(),
				security: $("form#login #security").val(),
			},
			beforeSend: function() {
				// remove the error message from the previous attempt
				const labels = document.querySelectorAll('#login label');
				labels.forEach(label => {
					label.classList.remove('error');
				});
				const input = document.querySelectorAll('#login input');
				input.forEach(input => {
					input.classList.remove('error');
				});
				// add loader btn submit
				$('#js-login-submit-btn').attr('disabled', true);
				$('#js-login-submit-btn').addClass('loading');
				$('#js-login-submit-btn').html('');
			},
			success: function (data) {
				if (data.data.loggedin == true) {
					$("#login .error-message").html(data.data.message);
					window.location.href = document.location.origin;
				} else {
					handleValidation(data.data)
				}
			},
		});
		e.preventDefault();
	});

	const handleValidation = (data) => {
		if ( data.validation.email == 'error' ) {
			$('#login .field-email label').addClass('error');
			$('#login .field-email input').addClass('error');
		} 
		if ( data.validation.password == 'error' ) {
			$('#login .field-password label').addClass('error');
			$('#login .field-password input').addClass('error');
		} 
		if ( data.validation.termsAndConditions == 'error' ) {
			$('.sign-up__terms-and-conditions-copy').addClass('error');
		}

		$('#js-login-submit-btn').attr('disabled', false);
		$('#js-login-submit-btn').removeClass('loading');
		$('#js-login-submit-btn').html('Ingresar');

		$("#login .error-message").html(data.message);
	}

	/* -- Change state password -- */
	jQuery("#js-change-btn-password").on("click", function () {
		if (jQuery("#password").attr("type") == "password") {
			jQuery("#password").attr("type", "text");
			jQuery("#js-change-btn-password").addClass("active");
		} else {
			jQuery("#password").attr("type", "password");
			jQuery("#js-change-btn-password").removeClass("active");
		}
	});
});