jQuery(document).ready(function ($) {

	// Item Quantity Live Update + Max Limit Alert
	let timeout;	
	$('.woocommerce').on('input', 'input.qty', function(){
		if ( timeout !== undefined ) {
			clearTimeout( timeout );
		}
		if ($(this).val() != '') {
			timeout = setTimeout(function() {
				$("[name='update_cart']").trigger("click");
			}, 500 ); 
		} 
	});
	$( document.body ).on( 'updated_cart_totals', function(){
		if ($('td.product-quantity').hasClass('max-limit-reached')) {
			$('.woocommerce-cart-form__cart-item .max-limit-reached').siblings(('.max-limit-td')).children().addClass('active')
		}

        const maxLimitModalClose = document.querySelectorAll('.js-max-limit-close')
		maxLimitModalClose.forEach(element => {
			element.addEventListener('click', () => {
				$('.woocommerce-cart-form__cart-item .max-limit-reached').siblings(('.max-limit-td')).children().removeClass('active')
				localStorage.setItem('max-limit', 'understood')
			})
		});

        const maxLimitModalConfirmation = document.querySelectorAll('.js-max-limit-confirmation')
		maxLimitModalConfirmation.forEach(element => {
			element.addEventListener('click', () => {
				maxLimitModal.classList.remove('active')
				localStorage.setItem('max-limit', 'understood')
			})
		});
	});
})