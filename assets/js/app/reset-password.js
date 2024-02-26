jQuery(document).ready(function ($) {

	$('.reset-password__btn').on('click', function (e) {
		var pass1 = $('#password_1').val();
		var pass2 = $('#password_2').val();

		if (pass1 !== pass2) {
			event.preventDefault();
			$('.woocommerce-ResetPassword .clear').html('<p class="lost-password-message-error text-danger d-none"><img src="/wp-content/themes/biogenesis-bago/assets/img/elements/atention.svg;"> Los campos de contraseña no coinciden.</p>');
            setTimeout(function () {
                $('.woocommerce-ResetPassword .clear p').removeClass('d-none');
            }, 800);
			return;
		}
	});

});