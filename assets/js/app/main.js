/* INDEX
	1. Registration (AJAX)
	2. Login 
		2.1 AJAX
		2.2 Modal
	3. Sign Up Modal
	4. Password Recovery
	5. Related Products Slider
	6. Redirect Section - Scroll Animation
	7. Mini Cart (Dropdown)
	Page > Product Detail
			Product Selection - Price Update on Varibale Product selection
			Notices Display (Succes - Error)
			Doses Calculator
	Page > Cart
	Page > Checkout
	Page > ¿Cómo Funciona?
	Page > My Account
	Page > Home
	Card Product
*/
jQuery(document).ready(function ($) {
	console.time("JS Loading OK");

	// Navbar (when logged in and on scroll)
	let siteHeader = document.getElementById('masthead')
	$(window).scroll(function() {
		const scroll = $(this).scrollTop();
		if (scroll < 90) {
			siteHeader.classList.remove('active')
		} else {
			siteHeader.classList.add('active')
		}
	});

	// Sign Up Skip
	$('.sign-up__skip').click(() => {
		$(location).attr('href', location.href);
	});

	/* --- Login Here --- */
	const loginHere = $('#js-login-here');

	loginHere.click((e) => {
		e.preventDefault();
		$('#js-sign-up-container').removeClass('active');
		$('#js-login-container').addClass('active');
	});

	// Add to cart > Redirect to Login (if not logged)
	const buyBtnSingle = $('.single_add_to_cart_button')
	const heroNotLoggedIn = $('#js-hero-register')

	if(!$('body').hasClass('logged-in')) {
		buyBtnSingle.on('click', (e) => {
			e.preventDefault();
			//loginModalContainer.classList.toggle('active')
		})
		heroNotLoggedIn.on('click', (e) => {
			e.preventDefault();
			//signUpModalContainer.classList.toggle('active')
		})
	} 

	/* --- 4. Password Recovery --- */
	const passRecoveryModal = document.getElementById('js-recovery-modal')
	const lostPassSubmitBtn = document.getElementById('js-lost-password-submit-btn')
	const closeRecoveryBtn = document.getElementById('js-recovery-modal-close')
	const tryAgain = document.getElementById('js-lost-password-btn')

	if ($('.recovery__container .woocommerce-notices-wrapper ul').hasClass('woocommerce-error')) {
		localStorage.removeItem('recovery')
		passRecoveryModal.classList.add('error')
	}
	if (lostPassSubmitBtn) {
		lostPassSubmitBtn.addEventListener('click', () => {
			localStorage.setItem('recovery', 'true')
			window.location.href
		})
	}
	if (passRecoveryModal) {
		if (localStorage.getItem('recovery') === 'true') {
			passRecoveryModal.classList.add('success')
			passRecoveryModal.classList.remove('error')
		}
	}
	if (closeRecoveryBtn) {
		closeRecoveryBtn.addEventListener('click', () => {
			localStorage.removeItem('recovery')
			window.location.href = document.location.origin
		})
	}
	if (tryAgain) {
		tryAgain.addEventListener('click', () => {
			localStorage.removeItem('recovery')
			passRecoveryModal.classList.remove('success')
			passRecoveryModal.classList.remove('error')
			window.location.href
		})
	}
	if (document.querySelector('.js-recovery-mail')) {
		document.querySelector('.js-recovery-mail').addEventListener('focus', () => {
			passRecoveryModal.classList.remove('error')
		})
	}
		
	/* --- 5. Related Products Slider --- */
	if ($('.related-products__slider .card-product').length > 4 || $(window).width() < 769) {
		$("#js-related-products").slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			prevArrow: $("#js-slick-prev-arrow"),
			nextArrow: $("#js-slick-next-arrow"),
			dots: true,
			infinite: false,
			responsive: [
				{
					breakpoint: 960,
					settings: {
					  slidesToShow: 2,
					}
				},
				{
				  breakpoint: 575,
				  settings: {
					centerMode: true,
					centerPadding: '0',
					slidesToShow: 1,
					arrows: false
				  }
				}
			]
		});	
	} else {
		$('.related-products').addClass('no-slider')
	}

	/* --- 6. Redirect Section - Scroll Animation --- */
	$('.js-redirect-link').each(function () {
		$(this).click(function () {
				const scrollTopRedirect = $('.js-redirect-section[data-redirect-section="' + $(this).data("redirect-link") + '"]').offset().top - 100;
				
				$('html, body').animate({
						scrollTop: scrollTopRedirect
				}, 500);
		})
	})

	/* --- 7. Mini Cart (Dropdown) --- */
	const cartBtn = document.querySelectorAll('#private-menu .cart')
	const miniCart = document.getElementById('js-mini-cart')
	const miniCartEmpty = document.getElementById('js-mini-cart-empty')

	cartBtn.forEach(btn => {
		btn.addEventListener('click', (event) => {
			event.preventDefault()
			event.stopPropagation()
			if (document.querySelectorAll('.woocommerce-mini-cart__empty-message').length == 1) {
				if (miniCartEmpty.classList.contains('active')) {
					miniCartEmpty.classList.add('closing')
					setTimeout(function(){
						miniCartEmpty.classList.remove('closing') 
					}, 250);
				}
				miniCartEmpty.classList.toggle('active')
			} else {
				if (miniCart.classList.contains('active')) {
					miniCart.classList.add('closing')
					setTimeout(function(){
						miniCart.classList.remove('closing') 
					}, 250);
				}
				miniCart.classList.toggle('active')
			}
		})
	});
	if (miniCartEmpty) {
		document.body.addEventListener('click', () => {
			if (miniCartEmpty.classList.contains('active')) {
				miniCartEmpty.classList.add('closing')
				setTimeout(function(){
					miniCartEmpty.classList.remove('closing') 
				}, 250);
				miniCartEmpty.classList.remove('active')
			} 
		})
	} 
	if (miniCart) {
		document.body.addEventListener('click', () => {
			if (miniCart.classList.contains('active')) {
				miniCart.classList.add('closing')
				setTimeout(function(){
					miniCart.classList.remove('closing') 
				}, 250);
				miniCart.classList.remove('active')
			}
		})
	}

	if ($('#js-mini-cart li').length <= 1) {
		$('#js-mini-cart').css('flex-wrap', 'nowrap')
		$('#js-mini-cart > div').css('width', '10%')
		$('#js-mini-cart > div').css('margin-top', '0')
	}
	if ($('.woocommerce-mini-cart__empty-message').length == 1) {
		$('.cart a').removeClass('full')
	} else {
		$('.cart a').addClass('full')
	}


	/* --- Page > Checkout --- */

	// Cancel Button
	const cancelBtn = document.querySelectorAll('.js-cancel-purchase')
	const cancelBtnConfirmation = document.getElementById('js-cancel-btn-confirmation')
	const cancelModalContainer = document.getElementById('js-cancel-modal')
	if (cancelBtn) {
		cancelBtn.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				cancelModalContainer.classList.toggle('active')
			})
		});
	}

	// Place Order
	const placeOrderBtn = document.getElementById('place_order')
	if (placeOrderBtn) {
		placeOrderBtn.addEventListener('click', () => {
			setTimeout(function(){ 
				let invalidFields = document.querySelectorAll('.woocommerce-invalid-required-field')
				if (invalidFields.length !== 0) {
					return
				} /*else {
					localStorage.setItem('cancelation', 'true')
				}*/
			}, 2500);			
		})
	}

	// Incomplete Fields Warning
	const checkoutErrorsContainer = document.getElementById('js-checkout-errors-container')

	if ($('#place_order')) {
		$('#place_order').on('click', function () {
			setTimeout(function(){ 
				let checkoutErrors = document.querySelector('.woocommerce-NoticeGroup-checkout .woocommerce-error')
				if (checkoutErrors) {
					checkoutErrorsContainer.classList.add('active')
				}
			}, 2000);
		})
	}
	
	// Prevent Scroll Up on Field Validation
	jQuery( document ).ajaxComplete( function() {
		if ( jQuery( 'body' ).hasClass( 'woocommerce-checkout' ) || jQuery( 'body' ).hasClass( 'woocommerce-cart' ) ) {
			jQuery( 'html, body' ).stop();
		}
	} );
	
	// Success Checkout
	const keepBuyingBtn = document.getElementById('js-keep-buying')
	const keepBuyingBtnSecondary = document.getElementById('js-keep-buying-modal-close')
	const successModal = document.getElementById('js-success-modal')
	if (successModal) {
		if (localStorage.getItem('cancelation') === 'true') {
			successModal.classList.add('active')
		} else {
			successModal.classList.remove('active')
		}
	}
	if (keepBuyingBtn) {
		keepBuyingBtn.addEventListener('click', () => {
			successModal.classList.add('closing')
			setTimeout(function(){
				successModal.classList.remove('closing') 
			}, 250);
			setTimeout(function(){
				successModal.remove()
				localStorage.removeItem('cancelation')
			}, 350);
		})
		keepBuyingBtnSecondary.addEventListener('click', () => {
			successModal.classList.add('closing')
			setTimeout(function(){
				successModal.classList.remove('closing') 
			}, 250);
			setTimeout(function(){
				successModal.remove()
				localStorage.removeItem('cancelation')
			}, 350);
		})
	}

	/* --- Page > ¿Cómo Funciona? --- */

	// FAQ
	const items = document.querySelectorAll(".faq__accordion button")
	const itemsContainer = document.querySelectorAll(".faq__accordion-item")

	function toggleAccordion() {
		const itemToggle = this.getAttribute('aria-expanded');
		items.forEach(item => {
			item.setAttribute('aria-expanded', 'false');
			item.parentNode.classList.remove('active')
		});
		if (itemToggle == 'false') {
			this.setAttribute('aria-expanded', 'true');
			this.parentNode.classList.add('active')
		}
	}
	if (items.length > 0) {
		items.forEach(item => item.addEventListener('click', toggleAccordion));
	}
	
	/* --- Page > My Account --- */

	// Get Fields 
	let firstName = document.getElementById('billing_first_name')
	let lastName = document.getElementById('billing_last_name')
	let billingRoll = document.getElementById('billing_roll')
	let billingPhone = document.getElementById('billing_phone')
	let billingPhoneCel = document.getElementById('billing_phone_cel')
	// Ajax Loader
	const myAccountFormMask = document.getElementById('js-mask-account')
	const ajaxSpinnerFormAccount = document.getElementById('js-spinner-account')
	// Ajax Save
	let saveUserData = document.getElementById('js-save-user-info')
	if (saveUserData) {
		saveUserData.addEventListener('click', (e) => {
			e.preventDefault();

			// Validate Empty Fields
			if (firstName.value.trim() == '' || 
				lastName.value.trim() == '' || 
				billingRoll.value.trim() == '' || 
				billingPhoneCel.value.trim() == '') 
			{
				$('#js-billing-profile-response').addClass('text-danger').text('Por favor, complete todos los campos.');
				if (firstName.value.trim() == '') firstName.parentNode.parentNode.classList.add('woocommerce-invalid');
				if (lastName.value.trim() == '') lastName.parentNode.parentNode.classList.add('woocommerce-invalid');
				if (billingRoll.value.trim() == '') billingRoll.parentNode.parentNode.classList.add('woocommerce-invalid');
				if (billingPhoneCel.value.trim() == '') billingPhoneCel.parentNode.parentNode.classList.add('woocommerce-invalid');
				return
			}

			// Validate Errors in Fields
			if (firstName.parentNode.classList.contains('woocommerce-invalid')	|| 
				lastName.parentNode.classList.contains('woocommerce-invalid')	|| 
				billingRoll.parentNode.classList.contains('woocommerce-invalid') || 
				billingPhone.parentNode.classList.contains('woocommerce-invalid') || 
				billingPhoneCel.parentNode.classList.contains('woocommerce-invalid')) 
			{
				$('#js-billing-profile-response').addClass('text-danger').text('Por favor, verifica la información ingresada.')
				return
			}

			$.ajax({
				type: "POST",
				dataType: "json",
				url: bio_vars.ajaxUrl,
				data: {
					action: "save_user_data", 
					billing_first_name: firstName.value,
					billing_last_name: lastName.value,
					billing_roll: billingRoll.value,
					billing_phone: billingPhone.value,
					billing_phone_cel: billingPhoneCel.value,
				},
				beforeSend: function() {
					ajaxSpinnerFormAccount.style.display = 'block'
					myAccountFormMask.style.display = 'block'
					$('#js-billing-profile-response').removeClass('text-danger').addClass('text-info').text('Guardando...')
				},
				success: function (data) {
					ajaxSpinnerFormAccount.style.display = 'none'
					myAccountFormMask.style.display = 'none'
					$('#js-billing-profile-response').removeClass('text-danger').addClass('text-info').text('Datos guardados correctamente.')
				},
				complete: function () {
					setTimeout(function(){
						$('#js-billing-profile-response').removeClass('text-info').text('')
					}, 5000);
				}
			});
		})
	}

	// My Order History (Desktop)
	let orders = document.querySelectorAll('.order')
	orders.forEach(orderProducts => {
		if(orderProducts.querySelectorAll('.order-products p').length > 1) {
			orderProducts.classList.add('multiple-products')
		}
		
	});
	// My Orders History (Mobile)
	const orderHistoryOrder = document.querySelectorAll('.js-order-history-order')
	if (orderHistoryOrder) {
		orderHistoryOrder.forEach(element => {
			element.addEventListener('click', () => {
				element.classList.toggle('active')
			})
		});
	}


	/* --- Page > Home  --- */

	// Hero & Wave Parallax
	const targetParallaxImg = document.querySelectorAll('.js-parallax') // Target BG Parallax
	const targetParallaxWave = document.querySelectorAll('.js-parallax-horizontal') 

	targetParallaxWave.forEach(wave => { 
		// Calculate distance from top
		let rect = wave.getBoundingClientRect()
		let targetParallaxImgYOffset = rect.top + window.scrollY 
		// Variables
		let scrolled = window.pageYOffset 
		let elementHeight = wave.clientHeight
		// Parallax
		wave.style.transform = 'translateX(' + ( scrolled - targetParallaxImgYOffset ) * 0.2 /*<<< speed multiplier*/  + 'px)';
		
	})
	window.addEventListener('scroll', () => {
		targetParallaxImg.forEach(img => { 
			// Calculate distance from top
			let rect = img.getBoundingClientRect()
			let targetParallaxImgYOffset = rect.top + window.scrollY 
			// Variables
			let scrolled = window.pageYOffset 
			let elementHeight = img.clientHeight
			// Detect BG is inside Viewport
			if (scrolled > targetParallaxImgYOffset - elementHeight ) {
				// Parallax
				img.style.backgroundPositionY = ( scrolled - targetParallaxImgYOffset ) * 0.2 /*<<< speed multiplier*/  + "px"
			}
		})
		targetParallaxWave.forEach(wave => { 
			// Calculate distance from top
			let rect = wave.getBoundingClientRect()
			let targetParallaxImgYOffset = rect.top + window.scrollY 
			// Variables
			let scrolled = window.pageYOffset 
			let elementHeight = wave.clientHeight
			// Parallax
			wave.style.transform = 'translateX(' + ( scrolled - targetParallaxImgYOffset ) * 0.2 /*<<< speed multiplier*/  + 'px)';
			
		})
	})

	/* - New Campaign Banner - */
	let newCampaignBanner = document.getElementById('js-new-campaign-banner')
	let closeCampaignBanner = document.getElementById('js-close-new-campaign')
	// Open Modal
	if (newCampaignBanner.classList.contains('show-banner') && sessionStorage.getItem('new-campaign-banner-seen') != 'true') {
		newCampaignBanner.classList.add('active')
	} 
	// Close Modal
	closeCampaignBanner.addEventListener('click', () => {
		newCampaignBanner.classList.remove('active')
		sessionStorage.setItem('new-campaign-banner-seen', 'true');
	})


	/* --- Card Product  --- */
	
	// Card Product > Entirely clickeable
	const cardProduct = document.querySelectorAll('.card-product')
	cardProduct.forEach(product => {
		product.addEventListener('click', () => {
			let productLink = product.querySelector('.woocommerce-LoopProduct-link').href
			window.location = productLink
		})
	});

	
	console.timeEnd("JS Loading OK")
});

