jQuery(document).ready(function ($) {

	function validarEmail(valor) {
		var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
		if (emailRegex.test(valor)){
			return true;
		}

		return false;
	}

	function debounce(callback, wait) {
		let timerId;
		return (...args) => {
		  clearTimeout(timerId);
		  timerId = setTimeout(() => {
			callback(...args);
		  }, wait);
		};
	}

    /* --- Lost Password (AJAX) --- */
	$(".js-recovery-mail").on("keyup", debounce(() => {
		
		var email = $(".js-recovery-mail").val();

		if (!validarEmail(email)) return;

		$.ajax({
			type: "POST",
			dataType: "json",
			url: bio_vars.ajaxUrl,
			data: {
				action: "check_lost_password",
				email: email
			},
			beforeSend: function() {
				$('#js-lost-password-submit-btn').addClass('loading');
				$('#js-lost-password-submit-btn').html('');
			},
			success: function (data) {
				$('#js-lost-password-submit-btn').removeClass('loading');
				$('#js-lost-password-submit-btn').html('Enviar');
				if (data.success == true) {
					$('#js-recovery-modal').removeClass('error');
					$('.recovery__btn--inverted').attr('disabled', false);
					$('#js-lostpass-message').html('');
				} else {
					$('#js-lostpass-message').html(data.data.message);
					$('#js-recovery-modal').addClass('error');
					$('.recovery__btn--inverted').attr('disabled', true);
				}
			},
		});	

	}, 250));

	$('#js-lost-password-submit-btn').on('click', function (e) {
		$('#js-lost-password-submit-btn').addClass('loading');
		$('#js-lost-password-submit-btn').html('');

		var email = $(".js-recovery-mail").val();
		if (email == "") {
			event.preventDefault();
			$('#js-lostpass-message').html('<p class="text-danger">Por favor, ingrese su email.</p>');
			$('#js-recovery-modal').addClass('error');
			$('#js-lost-password-submit-btn').removeClass('loading');
			$('#js-lost-password-submit-btn').html('Enviar');
			return;
		}
	});

});