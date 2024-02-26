jQuery(document).ready(function ($) {

    // productType variable is a php variable used with jsonencode. It determines if the product is simple or variable.
    
	// Product Selection - Price Update on Varibale Product selection
    if (productType == 'variable') {
        $(document).on('change', '.variation-radios input', function() {
            $('.variation-radios input:checked').each(function(index, element) {
              var $el = $(element);
              var thisName = $el.attr('name');
              var thisVal  = $el.attr('value');
              $('select[name="'+thisName+'"]').val(thisVal).trigger('change');
            });
        });
        $(document).on('woocommerce_update_variation_values', function() {
            $('.variation-radios input').each(function(index, element) {
              var $el = $(element);
              var thisName = $el.attr('name');
              var thisVal  = $el.attr('value');
              $el.removeAttr('disabled');
              if($('select[name="'+thisName+'"] option[value="'+thisVal+'"]').is(':disabled')) {
                $el.prop('disabled', true);
              }
            });
        });
    } 

	// Display price with current discount
	let priceDisplayWDiscount = document.getElementById('js-price-display-with-discount')
	let priceDisplay = document.getElementById('js-price-display-regular-mobile')
    if (productType == 'variable') {
        $('form.variations_form').on('show_variation', function(event, data){
            if (priceDisplayWDiscount) {
                priceDisplayWDiscount.innerHTML = (data.display_price - (data.display_price*relativeDiscount/100)).toFixed(2) 
            }
            if (priceDisplay) {
                priceDisplay.innerHTML = data.display_price
            }
        })
    } else {
        if (priceDisplayWDiscount) {
            let regularPrice = priceDisplay.innerHTML 
            regularPrice = parseInt(regularPrice)
            priceDisplayWDiscount.innerHTML = (regularPrice - (regularPrice)*relativeDiscount/100).toFixed(2) 
        }
    }

	// Display price per dose
	let priceDisplayWDiscountPerDose = document.getElementById('js-price-display-per-dose-with-discount')
	let priceDisplayPerDose = document.getElementById('js-price-display-per-dose-without-discount')
    if (productoConDosis) {
        $('form.variations_form').on('show_variation', function(event, data){
            let dosisPorFrasco = document.getElementById('js-dosis-frasco').innerHTML
            if (priceDisplayWDiscountPerDose ) {
                priceDisplayWDiscountPerDose .innerHTML = ((data.display_price - (data.display_price*relativeDiscount/100)) / dosisPorFrasco).toFixed(2) 
            }
            if (priceDisplayPerDose) {
                priceDisplayPerDose.innerHTML = (data.display_price / dosisPorFrasco).toFixed(2)
            }
        })
    }

	// Notices Display (Succes - Error)
	const noticesWrapper = document.querySelectorAll('.woocommerce-notices-wrapper')
	const noticesMessage = document.querySelectorAll('.woocommerce-message')
	function noticesDisplay () {
		noticesWrapper.forEach(element => {
			if (element.childNodes.length > 0) {
				element.classList.remove('inactive')
				noticesWrapper.forEach(element => {
					if (element.firstElementChild.classList.contains('woocommerce-message')) {
						element.classList.add('succes')
					} else {
						element.classList.add('error')
					}
				});
			} else {
				element.classList.add('inactive')
			}	
		});	
	}
	if (noticesWrapper) {
		noticesDisplay ()
	}

	// Doses Calculator + Max Limit Alert
	var totalDosesOutput = document.getElementById('js-total-dosis')
	const maxLimitModal = document.getElementById('js-max-limit')
	const maxLimitModalClose = document.querySelectorAll('.js-max-limit-close')
	const maxLimitModalConfirmation = document.querySelectorAll('.js-max-limit-confirmation')
	let singleProductQty
	
    localStorage.removeItem('max-limit')

    // Dosis por frasco
    if (productoConDosis) { 
        $('[name=quantity]').on('input change', function() { 
            let dosisPorFrasco = document.getElementById('js-dosis-frasco').innerHTML
            singleProductQty = $(this).val()
            totalDosesOutput.innerHTML = singleProductQty*dosisPorFrasco
            singleProductQty = $(this).val()*dosisPorFrasco
            return singleProductQty
        })
    } else {
        $('[name=quantity]').on('input change', function() { 
            singleProductQty = $(this).val()
            return singleProductQty
        })
    }

    // Max limit alert
    $('form.variations_form').on('show_variation', function(event){
        localStorage.removeItem('max-limit')
    })

    let maxLimitSingleProduct
    $('.single_add_to_cart_button').on('click', function(event) {
        singleProductQty = parseInt(singleProductQty)
        maxLimitSingleProduct = parseInt(document.getElementById('js-max-limit-display').innerHTML)
        if (singleProductQty > maxLimitSingleProduct && localStorage.getItem('max-limit') !== 'understood') {
            event.preventDefault()
            maxLimitModal.classList.add('active')
        } else {
            maxLimitModal.classList.remove('active')
        }
    })

    maxLimitModalClose.forEach(element => {
        element.addEventListener('click', () => {
            maxLimitModal.classList.remove('active')
            localStorage.setItem('max-limit', 'understood')
        })
    });
    maxLimitModalConfirmation.forEach(element => {
        element.addEventListener('click', () => {
            maxLimitModal.classList.remove('active')
            localStorage.setItem('max-limit', 'understood')
        })
    });
	

});
