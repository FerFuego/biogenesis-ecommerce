"use strict";

jQuery(document).ready(function () {
  var limit = 1;
  var input = jQuery('form #campaign .form-input-tip');
  var addNew = jQuery("form #campaign input[type='button']");
  var deleteCampaignBtn = jQuery('form #campaign .tagchecklist');
  var metaBox = jQuery('#tagsdiv-campaign');

  var limitTaxonomy = function limitTaxonomy() {
    jQuery('form #campaign #new-tag-campaign-desc').hide();

    if (input.length > 0) {
      if (input.val().includes(',')) {
        addDisabled();
      }

      setTimeout(function () {
        var $items = jQuery('form #campaign .tagchecklist li');

        if ($items.length >= limit) {
          addDisabled();
        }
      }, 100);
    }
  };

  var deleteCampaign = function deleteCampaign() {
    if (jQuery('form #campaign .tagchecklist li').length === 0) {
      removeDisabled();
    }
  };

  var clearInput = function clearInput() {
    input[0].value = '';

    if (jQuery('form #campaign .tagchecklist li').length === 0) {
      removeDisabled();
    }
  };

  var removeDisabled = function removeDisabled() {
    addNew.removeAttr('disabled');
    input.removeAttr('disabled');
  };

  var addDisabled = function addDisabled() {
    addNew.attr('disabled', true);
    input.attr('disabled', true);
  };

  limitTaxonomy();
  input.on('keyup', limitTaxonomy);
  input.on('keyup', limitTaxonomy);
  addNew.on('click', limitTaxonomy);
  metaBox.on('click', clearInput);
  deleteCampaignBtn.on('click', deleteCampaign);
});
/*(function ($) {

    $(document).on('click', '.single_add_to_cart_button', function (e) {
        e.preventDefault();

        var $thisbutton = $(this),
                $form = $thisbutton.closest('form.cart'),
                id = $thisbutton.val(),
                product_qty = $form.find('input[name=quantity]').val() || 1,
                product_id = $form.find('input[name=product_id]').val() || id,
                variation_id = $form.find('input[name=variation_id]').val() || 0;

        var data = {
            action: 'woocommerce_ajax_add_to_cart',
            product_id: product_id,
            product_sku: '',
            quantity: product_qty,
            variation_id: variation_id,
        };

        $(document.body).trigger('adding_to_cart', [$thisbutton, data]);

        $.ajax({
            type: 'post',
            url: wc_add_to_cart_params.ajax_url,
            data: data,
            beforeSend: function (response) {
                $thisbutton.removeClass('added').addClass('loading');
            },
            complete: function (response) {
                $thisbutton.addClass('added').removeClass('loading');
                setTimeout(function(){ 
                    $thisbutton.removeClass('added')
                 }, 2500);
            },
            success: function (response) {

                if (response.error && response.product_url) {
                    window.location = response.product_url;
                    return;
                } else {
                    $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);
                }
            },
        });

        return false;
    });
})(jQuery);*/
"use strict";
"use strict";

(function ($) {
  $(function () {
    var basic_text = $('.module--basic_text');
    var left_right = $('.module--left_right__inner');
    var video = $('.module--video');
    basic_text.each(function () {
      var $self = $(this);
      $(this).waypoint({
        handler: function handler(direction) {
          TweenMax.staggerFromTo(basic_text, 1, {
            y: 50
          }, {
            y: 0
          }, 0.1);
          TweenMax.staggerFromTo(basic_text, 1, {
            opacity: 0
          }, {
            opacity: 1
          }, 0.1);
          this.destroy();
        },
        offset: "100%"
      });
    });
    left_right.each(function () {
      var $self = $(this);
      $(this).waypoint({
        handler: function handler(direction) {
          TweenMax.staggerFromTo('.module--left_right__inner', 1, {
            y: 50
          }, {
            y: 0
          }, 0.1);
          TweenMax.staggerFromTo('.module--left_right__inner', 1, {
            opacity: 0
          }, {
            opacity: 1
          }, 0.1);
          this.destroy();
        },
        offset: '100%'
      });
    });
    video.each(function () {
      var $self = $(this);
      $(this).waypoint({
        handler: function handler(direction) {
          TweenLite.fromTo('.module--video__inner', 1, {
            y: 200
          }, {
            y: 0
          });
          TweenLite.fromTo('.module--video__inner', 1, {
            opacity: 0
          }, {
            opacity: 1
          });
          this.destroy();
        },
        offset: '90%'
      });
    });
  });
})(jQuery);
"use strict";

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
        action: "ajax_login",
        //calls wp_ajax_nopriv_ajaxlogin
        mail_id: $("form#login #username").val(),
        password: $("form#login #password").val(),
        security: $("form#login #security").val()
      },
      beforeSend: function beforeSend() {
        // remove the error message from the previous attempt
        var labels = document.querySelectorAll('#login label');
        labels.forEach(function (label) {
          label.classList.remove('error');
        });
        var input = document.querySelectorAll('#login input');
        input.forEach(function (input) {
          input.classList.remove('error');
        }); // add loader btn submit

        $('#js-login-submit-btn').attr('disabled', true);
        $('#js-login-submit-btn').addClass('loading');
        $('#js-login-submit-btn').html('');
      },
      success: function success(data) {
        if (data.data.loggedin == true) {
          $("#login .error-message").html(data.data.message);
          window.location.href = document.location.origin;
        } else {
          handleValidation(data.data);
        }
      }
    });
    e.preventDefault();
  });

  var handleValidation = function handleValidation(data) {
    if (data.validation.email == 'error') {
      $('#login .field-email label').addClass('error');
      $('#login .field-email input').addClass('error');
    }

    if (data.validation.password == 'error') {
      $('#login .field-password label').addClass('error');
      $('#login .field-password input').addClass('error');
    }

    if (data.validation.termsAndConditions == 'error') {
      $('.sign-up__terms-and-conditions-copy').addClass('error');
    }

    $('#js-login-submit-btn').attr('disabled', false);
    $('#js-login-submit-btn').removeClass('loading');
    $('#js-login-submit-btn').html('Ingresar');
    $("#login .error-message").html(data.message);
  };
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
"use strict";

jQuery(document).ready(function ($) {
  function validarEmail(valor) {
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(valor)) {
      return true;
    }

    return false;
  }

  function debounce(callback, wait) {
    var timerId;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      clearTimeout(timerId);
      timerId = setTimeout(function () {
        callback.apply(void 0, args);
      }, wait);
    };
  }
  /* --- Lost Password (AJAX) --- */


  $(".js-recovery-mail").on("keyup", debounce(function () {
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
      beforeSend: function beforeSend() {
        $('#js-lost-password-submit-btn').addClass('loading');
        $('#js-lost-password-submit-btn').html('');
      },
      success: function success(data) {
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
      }
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
"use strict";

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
  console.time("JS Loading OK"); // Navbar (when logged in and on scroll)

  var siteHeader = document.getElementById('masthead');
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();

    if (scroll < 90) {
      siteHeader.classList.remove('active');
    } else {
      siteHeader.classList.add('active');
    }
  }); // Sign Up Skip

  $('.sign-up__skip').click(function () {
    $(location).attr('href', location.href);
  });
  /* --- Login Here --- */

  var loginHere = $('#js-login-here');
  loginHere.click(function (e) {
    e.preventDefault();
    $('#js-sign-up-container').removeClass('active');
    $('#js-login-container').addClass('active');
  }); // Add to cart > Redirect to Login (if not logged)

  var buyBtnSingle = $('.single_add_to_cart_button');
  var heroNotLoggedIn = $('#js-hero-register');

  if (!$('body').hasClass('logged-in')) {
    buyBtnSingle.on('click', function (e) {
      e.preventDefault(); //loginModalContainer.classList.toggle('active')
    });
    heroNotLoggedIn.on('click', function (e) {
      e.preventDefault(); //signUpModalContainer.classList.toggle('active')
    });
  }
  /* --- 4. Password Recovery --- */


  var passRecoveryModal = document.getElementById('js-recovery-modal');
  var lostPassSubmitBtn = document.getElementById('js-lost-password-submit-btn');
  var closeRecoveryBtn = document.getElementById('js-recovery-modal-close');
  var tryAgain = document.getElementById('js-lost-password-btn');

  if ($('.recovery__container .woocommerce-notices-wrapper ul').hasClass('woocommerce-error')) {
    localStorage.removeItem('recovery');
    passRecoveryModal.classList.add('error');
  }

  if (lostPassSubmitBtn) {
    lostPassSubmitBtn.addEventListener('click', function () {
      localStorage.setItem('recovery', 'true');
      window.location.href;
    });
  }

  if (passRecoveryModal) {
    if (localStorage.getItem('recovery') === 'true') {
      passRecoveryModal.classList.add('success');
      passRecoveryModal.classList.remove('error');
    }
  }

  if (closeRecoveryBtn) {
    closeRecoveryBtn.addEventListener('click', function () {
      localStorage.removeItem('recovery');
      window.location.href = document.location.origin;
    });
  }

  if (tryAgain) {
    tryAgain.addEventListener('click', function () {
      localStorage.removeItem('recovery');
      passRecoveryModal.classList.remove('success');
      passRecoveryModal.classList.remove('error');
      window.location.href;
    });
  }

  if (document.querySelector('.js-recovery-mail')) {
    document.querySelector('.js-recovery-mail').addEventListener('focus', function () {
      passRecoveryModal.classList.remove('error');
    });
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
      responsive: [{
        breakpoint: 960,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 575,
        settings: {
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1,
          arrows: false
        }
      }]
    });
  } else {
    $('.related-products').addClass('no-slider');
  }
  /* --- 6. Redirect Section - Scroll Animation --- */


  $('.js-redirect-link').each(function () {
    $(this).click(function () {
      var scrollTopRedirect = $('.js-redirect-section[data-redirect-section="' + $(this).data("redirect-link") + '"]').offset().top - 100;
      $('html, body').animate({
        scrollTop: scrollTopRedirect
      }, 500);
    });
  });
  /* --- 7. Mini Cart (Dropdown) --- */

  var cartBtn = document.querySelectorAll('#private-menu .cart');
  var miniCart = document.getElementById('js-mini-cart');
  var miniCartEmpty = document.getElementById('js-mini-cart-empty');
  cartBtn.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (document.querySelectorAll('.woocommerce-mini-cart__empty-message').length == 1) {
        if (miniCartEmpty.classList.contains('active')) {
          miniCartEmpty.classList.add('closing');
          setTimeout(function () {
            miniCartEmpty.classList.remove('closing');
          }, 250);
        }

        miniCartEmpty.classList.toggle('active');
      } else {
        if (miniCart.classList.contains('active')) {
          miniCart.classList.add('closing');
          setTimeout(function () {
            miniCart.classList.remove('closing');
          }, 250);
        }

        miniCart.classList.toggle('active');
      }
    });
  });

  if (miniCartEmpty) {
    document.body.addEventListener('click', function () {
      if (miniCartEmpty.classList.contains('active')) {
        miniCartEmpty.classList.add('closing');
        setTimeout(function () {
          miniCartEmpty.classList.remove('closing');
        }, 250);
        miniCartEmpty.classList.remove('active');
      }
    });
  }

  if (miniCart) {
    document.body.addEventListener('click', function () {
      if (miniCart.classList.contains('active')) {
        miniCart.classList.add('closing');
        setTimeout(function () {
          miniCart.classList.remove('closing');
        }, 250);
        miniCart.classList.remove('active');
      }
    });
  }

  if ($('#js-mini-cart li').length <= 1) {
    $('#js-mini-cart').css('flex-wrap', 'nowrap');
    $('#js-mini-cart > div').css('width', '10%');
    $('#js-mini-cart > div').css('margin-top', '0');
  }

  if ($('.woocommerce-mini-cart__empty-message').length == 1) {
    $('.cart a').removeClass('full');
  } else {
    $('.cart a').addClass('full');
  }
  /* --- Page > Checkout --- */
  // Cancel Button


  var cancelBtn = document.querySelectorAll('.js-cancel-purchase');
  var cancelBtnConfirmation = document.getElementById('js-cancel-btn-confirmation');
  var cancelModalContainer = document.getElementById('js-cancel-modal');

  if (cancelBtn) {
    cancelBtn.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        cancelModalContainer.classList.toggle('active');
      });
    });
  } // Place Order


  var placeOrderBtn = document.getElementById('place_order');

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function () {
      setTimeout(function () {
        var invalidFields = document.querySelectorAll('.woocommerce-invalid-required-field');

        if (invalidFields.length !== 0) {
          return;
        }
        /*else {
        localStorage.setItem('cancelation', 'true')
        }*/

      }, 2500);
    });
  } // Incomplete Fields Warning


  var checkoutErrorsContainer = document.getElementById('js-checkout-errors-container');

  if ($('#place_order')) {
    $('#place_order').on('click', function () {
      setTimeout(function () {
        var checkoutErrors = document.querySelector('.woocommerce-NoticeGroup-checkout .woocommerce-error');

        if (checkoutErrors) {
          checkoutErrorsContainer.classList.add('active');
        }
      }, 2000);
    });
  } // Prevent Scroll Up on Field Validation


  jQuery(document).ajaxComplete(function () {
    if (jQuery('body').hasClass('woocommerce-checkout') || jQuery('body').hasClass('woocommerce-cart')) {
      jQuery('html, body').stop();
    }
  }); // Success Checkout

  var keepBuyingBtn = document.getElementById('js-keep-buying');
  var keepBuyingBtnSecondary = document.getElementById('js-keep-buying-modal-close');
  var successModal = document.getElementById('js-success-modal');

  if (successModal) {
    if (localStorage.getItem('cancelation') === 'true') {
      successModal.classList.add('active');
    } else {
      successModal.classList.remove('active');
    }
  }

  if (keepBuyingBtn) {
    keepBuyingBtn.addEventListener('click', function () {
      successModal.classList.add('closing');
      setTimeout(function () {
        successModal.classList.remove('closing');
      }, 250);
      setTimeout(function () {
        successModal.remove();
        localStorage.removeItem('cancelation');
      }, 350);
    });
    keepBuyingBtnSecondary.addEventListener('click', function () {
      successModal.classList.add('closing');
      setTimeout(function () {
        successModal.classList.remove('closing');
      }, 250);
      setTimeout(function () {
        successModal.remove();
        localStorage.removeItem('cancelation');
      }, 350);
    });
  }
  /* --- Page > ¿Cómo Funciona? --- */
  // FAQ


  var items = document.querySelectorAll(".faq__accordion button");
  var itemsContainer = document.querySelectorAll(".faq__accordion-item");

  function toggleAccordion() {
    var itemToggle = this.getAttribute('aria-expanded');
    items.forEach(function (item) {
      item.setAttribute('aria-expanded', 'false');
      item.parentNode.classList.remove('active');
    });

    if (itemToggle == 'false') {
      this.setAttribute('aria-expanded', 'true');
      this.parentNode.classList.add('active');
    }
  }

  if (items.length > 0) {
    items.forEach(function (item) {
      return item.addEventListener('click', toggleAccordion);
    });
  }
  /* --- Page > My Account --- */
  // Get Fields 


  var firstName = document.getElementById('billing_first_name');
  var lastName = document.getElementById('billing_last_name');
  var billingRoll = document.getElementById('billing_roll');
  var billingPhone = document.getElementById('billing_phone');
  var billingPhoneCel = document.getElementById('billing_phone_cel'); // Ajax Loader

  var myAccountFormMask = document.getElementById('js-mask-account');
  var ajaxSpinnerFormAccount = document.getElementById('js-spinner-account'); // Ajax Save

  var saveUserData = document.getElementById('js-save-user-info');

  if (saveUserData) {
    saveUserData.addEventListener('click', function (e) {
      e.preventDefault(); // Validate Empty Fields

      if (firstName.value.trim() == '' || lastName.value.trim() == '' || billingRoll.value.trim() == '' || billingPhoneCel.value.trim() == '') {
        $('#js-billing-profile-response').addClass('text-danger').text('Por favor, complete todos los campos.');
        if (firstName.value.trim() == '') firstName.parentNode.parentNode.classList.add('woocommerce-invalid');
        if (lastName.value.trim() == '') lastName.parentNode.parentNode.classList.add('woocommerce-invalid');
        if (billingRoll.value.trim() == '') billingRoll.parentNode.parentNode.classList.add('woocommerce-invalid');
        if (billingPhoneCel.value.trim() == '') billingPhoneCel.parentNode.parentNode.classList.add('woocommerce-invalid');
        return;
      } // Validate Errors in Fields


      if (firstName.parentNode.classList.contains('woocommerce-invalid') || lastName.parentNode.classList.contains('woocommerce-invalid') || billingRoll.parentNode.classList.contains('woocommerce-invalid') || billingPhone.parentNode.classList.contains('woocommerce-invalid') || billingPhoneCel.parentNode.classList.contains('woocommerce-invalid')) {
        $('#js-billing-profile-response').addClass('text-danger').text('Por favor, verifica la información ingresada.');
        return;
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
          billing_phone_cel: billingPhoneCel.value
        },
        beforeSend: function beforeSend() {
          ajaxSpinnerFormAccount.style.display = 'block';
          myAccountFormMask.style.display = 'block';
          $('#js-billing-profile-response').removeClass('text-danger').addClass('text-info').text('Guardando...');
        },
        success: function success(data) {
          ajaxSpinnerFormAccount.style.display = 'none';
          myAccountFormMask.style.display = 'none';
          $('#js-billing-profile-response').removeClass('text-danger').addClass('text-info').text('Datos guardados correctamente.');
        },
        complete: function complete() {
          setTimeout(function () {
            $('#js-billing-profile-response').removeClass('text-info').text('');
          }, 5000);
        }
      });
    });
  } // My Order History (Desktop)


  var orders = document.querySelectorAll('.order');
  orders.forEach(function (orderProducts) {
    if (orderProducts.querySelectorAll('.order-products p').length > 1) {
      orderProducts.classList.add('multiple-products');
    }
  }); // My Orders History (Mobile)

  var orderHistoryOrder = document.querySelectorAll('.js-order-history-order');

  if (orderHistoryOrder) {
    orderHistoryOrder.forEach(function (element) {
      element.addEventListener('click', function () {
        element.classList.toggle('active');
      });
    });
  }
  /* --- Page > Home  --- */
  // Hero & Wave Parallax


  var targetParallaxImg = document.querySelectorAll('.js-parallax'); // Target BG Parallax

  var targetParallaxWave = document.querySelectorAll('.js-parallax-horizontal');
  targetParallaxWave.forEach(function (wave) {
    // Calculate distance from top
    var rect = wave.getBoundingClientRect();
    var targetParallaxImgYOffset = rect.top + window.scrollY; // Variables

    var scrolled = window.pageYOffset;
    var elementHeight = wave.clientHeight; // Parallax

    wave.style.transform = 'translateX(' + (scrolled - targetParallaxImgYOffset) * 0.2
    /*<<< speed multiplier*/
    + 'px)';
  });
  window.addEventListener('scroll', function () {
    targetParallaxImg.forEach(function (img) {
      // Calculate distance from top
      var rect = img.getBoundingClientRect();
      var targetParallaxImgYOffset = rect.top + window.scrollY; // Variables

      var scrolled = window.pageYOffset;
      var elementHeight = img.clientHeight; // Detect BG is inside Viewport

      if (scrolled > targetParallaxImgYOffset - elementHeight) {
        // Parallax
        img.style.backgroundPositionY = (scrolled - targetParallaxImgYOffset) * 0.2
        /*<<< speed multiplier*/
        + "px";
      }
    });
    targetParallaxWave.forEach(function (wave) {
      // Calculate distance from top
      var rect = wave.getBoundingClientRect();
      var targetParallaxImgYOffset = rect.top + window.scrollY; // Variables

      var scrolled = window.pageYOffset;
      var elementHeight = wave.clientHeight; // Parallax

      wave.style.transform = 'translateX(' + (scrolled - targetParallaxImgYOffset) * 0.2
      /*<<< speed multiplier*/
      + 'px)';
    });
  });
  /* - New Campaign Banner - */

  var newCampaignBanner = document.getElementById('js-new-campaign-banner');
  var closeCampaignBanner = document.getElementById('js-close-new-campaign'); // Open Modal

  if (newCampaignBanner.classList.contains('show-banner') && sessionStorage.getItem('new-campaign-banner-seen') != 'true') {
    newCampaignBanner.classList.add('active');
  } // Close Modal


  closeCampaignBanner.addEventListener('click', function () {
    newCampaignBanner.classList.remove('active');
    sessionStorage.setItem('new-campaign-banner-seen', 'true');
  });
  /* --- Card Product  --- */
  // Card Product > Entirely clickeable

  var cardProduct = document.querySelectorAll('.card-product');
  cardProduct.forEach(function (product) {
    product.addEventListener('click', function () {
      var productLink = product.querySelector('.woocommerce-LoopProduct-link').href;
      window.location = productLink;
    });
  });
  console.timeEnd("JS Loading OK");
});
"use strict";

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
  var container, button, menu, links, i, len;
  container = document.getElementById('navbar');

  if (!container) {
    return;
  }

  button = container.getElementsByTagName('button')[0];

  if ('undefined' === typeof button) {
    return;
  }

  menu = container.getElementsByTagName('ul')[0]; // Hide menu toggle button if menu is empty and return early.

  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }

  if (-1 === menu.className.indexOf('nav-menu')) {
    menu.className += ' nav-menu';
  }

  button.onclick = function () {
    if (-1 !== container.className.indexOf('toggled')) {
      container.className = container.className.replace(' toggled', '');
      button.setAttribute('aria-expanded', 'false');
    } else {
      container.className += ' toggled';
      button.setAttribute('aria-expanded', 'true');
    }
  }; // Close small menu when user clicks outside


  document.addEventListener('click', function (event) {
    var isClickInside = container.contains(event.target);

    if (!isClickInside) {
      container.className = container.className.replace(' toggled', '');
      button.setAttribute('aria-expanded', 'false');
    }
  }); // Get all the link elements within the menu.

  links = menu.getElementsByTagName('a'); // Each time a menu link is focused or blurred, toggle focus.

  for (i = 0, len = links.length; i < len; i++) {
    links[i].addEventListener('focus', toggleFocus, true);
    links[i].addEventListener('blur', toggleFocus, true);
  }
  /**
   * Sets or removes .focus class on an element.
   */


  function toggleFocus() {
    var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

    while (-1 === self.className.indexOf('nav-menu')) {
      // On li elements toggle the class .focus.
      if ('li' === self.tagName.toLowerCase()) {
        if (-1 !== self.className.indexOf('focus')) {
          self.className = self.className.replace(' focus', '');
        } else {
          self.className += ' focus';
        }
      }

      self = self.parentElement;
    }
  }
  /**
   * Toggles `focus` class to allow submenu access on tablets.
   */


  (function () {
    var touchStartFn,
        parentLink = container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

    if ('ontouchstart' in window) {
      touchStartFn = function touchStartFn(e) {
        var menuItem = this.parentNode;

        if (!menuItem.classList.contains('focus')) {
          e.preventDefault();

          for (i = 0; i < menuItem.parentNode.children.length; ++i) {
            if (menuItem === menuItem.parentNode.children[i]) {
              continue;
            }

            menuItem.parentNode.children[i].classList.remove('focus');
          }

          menuItem.classList.add('focus');
        } else {
          menuItem.classList.remove('focus');
        }
      };

      for (i = 0; i < parentLink.length; ++i) {
        parentLink[i].addEventListener('touchstart', touchStartFn, false);
      }
    }
  })(container);
})();
"use strict";

jQuery(document).ready(function ($) {
  /* --- 1. Registration (AJAX) --- */
  jQuery("#register-me").on("click", function () {
    if ($(this).is("[disabled]")) {
      e.preventDefault();
    }

    var action = "register_action";
    var username = jQuery("#st-username").val();
    var mail_id = jQuery("#st-email").val();
    var passwrd = jQuery("#st-psw").val();
    var termsAndConditions = $('#st-terms-and-conditions').prop("checked");
    var errorRegisterContainer = $('.sign-up__first-step .error-message');
    $.ajax({
      type: "POST",
      dataType: "json",
      url: bio_vars.ajaxUrl,
      data: {
        action: action,
        mail_id: mail_id,
        passwrd: passwrd,
        username: username,
        termsAndConditions: termsAndConditions
      },
      beforeSend: function beforeSend() {
        // remove the error message from the previous attempt
        var labels = document.querySelectorAll('#st-register-form label');
        labels.forEach(function (label) {
          label.classList.remove('error');
        });
        var input = document.querySelectorAll('#st-register-form input');
        input.forEach(function (input) {
          input.classList.remove('error');
        }); // add loader btn submit

        $('#register-me').attr('disabled', true);
        $('#register-me').addClass('loading');
        $('#register-me').html('');
      },
      success: function success(_ref) {
        var data = _ref.data;
        var hasRegister = data.hasRegister,
            message = data.message;

        if (hasRegister) {
          handleCreateUser(mail_id, passwrd);
        } else {
          handleValidation(data);
        }
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        $('#register-me').attr('disabled', false);
        $('#register-me').removeClass('loading');
        $('#register-me').html('Registrarse');
      }
    });
  });

  var handleValidation = function handleValidation(data) {
    if (data.validation.email == 'error') {
      $('#st-register-form .field-email label').addClass('error');
      $('#st-register-form .field-email input').addClass('error');
    }

    if (data.validation.password == 'error') {
      $('#st-register-form .field-password label').addClass('error');
      $('#st-register-form .field-password input').addClass('error');
    }

    if (data.validation.termsAndConditions == 'error') {
      $('.sign-up__terms-and-conditions-copy').addClass('error');
    }

    $('#register-me').attr('disabled', false);
    $('#register-me').removeClass('loading');
    $('#register-me').html('Registrarse');
    jQuery("#st-register-form .error-message").html(data.message);
  };
  /* -- Create User Ajax + Login -- */


  var handleCreateUser = function handleCreateUser(mail_id, password) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: bio_vars.ajaxUrl,
      data: {
        action: "create_user_action",
        //calls wp_ajax_nopriv_ajaxlogin
        mail_id: mail_id,
        password: password
      },
      success: function success(response) {
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
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log('Error handleCreateUser');
      }
    });
  };
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
"use strict";

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
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

jQuery(document).ready(function ($) {
  /* --- Select Province - Checkout (AJAX) --- */
  var provinceSelect = $('#billing_distributor_province');
  var localitySelect = $('#billing_distributor_locality');
  var distributorSelect = $('#billing_distributor');
  var allSelects = $('.js-distributor-select').find('select'); // Add Options Hidden For Each Selects

  allSelects.each(function () {
    $(this).find('option:first-child').attr('hidden', true);
    $(this).find('option:first-child').attr('selected', true);
    $(this).find('option:first-child').attr('value', '');
  }); // Disabled Selects if exist default distributis props

  if ($('.map').hasClass('js-map-disable-selects')) {
    localitySelect.attr('disabled', true);
    distributorSelect.attr('disabled', true);
  }

  var selectIsDisabled = true;
  provinceSelect.on("change", function () {
    var action = "select_province_action";
    var province = $(this).val();
    var locality = localitySelect.val();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: bio_vars.ajaxUrl,
      data: {
        action: action,
        province: province,
        locality: locality,
        selectIsDisabled: selectIsDisabled
      },
      success: function success(_ref) {
        var data = _ref.data;
        var hasLocalities = data.hasLocalities,
            allLocalities = data.allLocalities,
            disabledDistributorSelect = data.disabledDistributorSelect;

        if (hasLocalities) {
          renderOptionSelect(allLocalities, localitySelect, 'Localidad');
        }

        if (!disabledDistributorSelect) {
          distributorSelect.attr('disabled', true);
          distributorSelect.html('');
          distributorSelect.append("<option hidden value=''>Veterinaria</option>");
        }

        selectIsDisabled = false;
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log('ERROR');
      }
    });
  });
  /* --- Select Locality - Checkout (AJAX) --- */

  localitySelect.on("change", function () {
    var action = "select_locality_action";
    var locality = $(this).val();
    var province = provinceSelect.val();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: bio_vars.ajaxUrl,
      data: {
        action: action,
        locality: locality,
        province: province
      },
      success: function success(_ref2) {
        var data = _ref2.data;
        var allDistributor = data.allDistributor,
            hasDistributor = data.hasDistributor;

        if (hasDistributor) {
          renderOptionSelect(allDistributor, distributorSelect, 'Veterinaria');
        }
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log('ERROR');
      }
    });
  }); // Clean the select and render options within it

  var renderOptionSelect = function renderOptionSelect(options, select, name) {
    var uniqueOptions = _toConsumableArray(new Set(options.sort())); // Randomize Distributor Options on each render


    if (select == distributorSelect) {
      var original = options;
      var copy = [].concat(original);
      copy.sort(function () {
        return 0.5 - Math.random();
      });
      uniqueOptions = copy;
    }

    select.html('');
    select.append("<option hidden selected value=''>".concat(name, "</option>"));
    uniqueOptions.forEach(function (option) {
      var optionWrapper = "<option value=\"".concat(option, "\">").concat(option, "</option>");
      select.append(optionWrapper);
    });
    select.attr('disabled', false);
  };
});
"use strict";

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Normalize svg spacing within it's viewbox
 */
var svgs = document.getElementsByClassName("js-svg-center-path"),
    measurement = 1024;

var _iterator = _createForOfIteratorHelper(svgs),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var svg = _step.value;
    var paths = svg.getElementsByTagName('path');

    var _iterator2 = _createForOfIteratorHelper(paths),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var path = _step2.value;
        var bbox = path.getBBox(),
            transformx = (measurement - bbox.width) / 2 - bbox.x,
            transformy = (measurement - bbox.height) / 2 - bbox.y;
        path.setAttribute('style', 'transform:translateX(' + transformx + 'px) translateY(' + transformy + 'px);');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
"use strict";

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
(function () {
  var tablist = document.querySelectorAll('[role="tablist"]'),
      i,
      keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    "delete": 46,
    enter: 13,
    space: 32
  },
      direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  },
      timing = 200;
  tablist.forEach(function (item, i) {
    var self = item,
        tabs = item.querySelectorAll('[role="tab"]'),
        panels = item.querySelectorAll('[role="tabpanel"]'),
        panelContainer = item.querySelector('.panel-container'),
        underline = item.querySelector('.button-underline'),
        vertical = item.getAttribute('aria-orientation') == 'vertical';
    item.classList.add('js-active');
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', clickEventListener);
      tab.addEventListener('keydown', keydownEventListener);
      tab.addEventListener('keyup', keyupEventListener); // Build an array with all tabs (<button>s) in it

      tab.index = i;
    });
    panels.forEach(function (panel, i) {
      panel.setAttribute('hidden', 'hidden');
    }); // When a tab is clicked, activateTab is fired to activate it

    function clickEventListener(event) {
      var tab = event.target;
      activateTab(tab, true);
    }

    ; // Activates any given tab panel

    function activateTab(tab, setFocus) {
      setFocus = setFocus || false; // Get the value of aria-controls (which is an ID)

      var controls = tab.getAttribute('aria-controls'); // Deactivate all other tabs

      deactivateTabs(controls); // Remove tabindex attribute

      tab.removeAttribute('tabindex'); // Set the tab as selected

      tab.setAttribute('aria-selected', 'true');

      if (underline) {
        underline.style.left = tab.offsetLeft + 'px';
        underline.style.width = tab.offsetWidth + 'px';
      } // Remove hidden attribute from tab panel to make it visible


      var activeTab = document.getElementById(controls);
      activeTab.removeAttribute('hidden');
      panelContainer.style.minHeight = activeTab.offsetHeight + 'px'; //gsap.to( panelContainer, { height: ( activeTab.offsetHeight ), duration: timing/100 } );

      setTimeout(function () {
        activeTab.classList.add('active');
        activeTab.classList.remove('transition');
      }, timing); // Set focus when required

      if (setFocus) {
        tab.focus();
      }

      ;
    }

    ; // Deactivate all tabs and tab panels

    function deactivateTabs(ignore) {
      tabs.forEach(function (tab, i) {
        tab.setAttribute('tabindex', '-1');
        tab.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (panel, i) {
        if (panel.getAttribute('id') !== ignore) {
          panel.classList.remove('active');
          panel.classList.add('transition');
          setTimeout(function () {
            panel.setAttribute('hidden', 'hidden');
          }, timing);
        }
      });
    }

    ;
    var hash = window.location.hash.substr(1);

    if ('' !== hash && document.getElementById(hash).getAttribute('role') === 'tab') {
      activateTab(document.getElementById(hash), false);
    } else {
      activateTab(tabs[0], false);
    } // Handle keydown on tabs


    function keydownEventListener(event) {
      var key = event.keyCode;

      switch (key) {
        case keys.end:
          event.preventDefault(); // Activate last tab

          focusLastTab();
          break;

        case keys.home:
          event.preventDefault(); // Activate first tab

          focusFirstTab();
          break;
        // Up and down are in keydown
        // because we need to prevent page scroll >:)

        case keys.up:
        case keys.down:
          determineOrientation(event);
          break;
      }

      ;
    }

    ; // Handle keyup on tabs

    function keyupEventListener(event) {
      var key = event.keyCode;

      switch (key) {
        case keys.left:
        case keys.right:
          determineOrientation(event);
          break;

        case keys["delete"]:
          determineDeletable(event);
          break;

        case keys.enter:
        case keys.space:
          activateTab(event.target);
          break;
      }

      ;
    }

    ; // When a tablistâ€™s aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.

    function determineOrientation(event) {
      var key = event.keyCode;
      var proceed = false;

      if (vertical) {
        if (key === keys.up || key === keys.down) {
          event.preventDefault();
          proceed = true;
        }

        ;
      } else {
        if (key === keys.left || key === keys.right) {
          proceed = true;
        }

        ;
      }

      ;

      if (proceed) {
        switchTabOnArrowPress(event);
      }

      ;
    }

    ; // Either focus the next, previous, first, or last tab
    // depending on key pressed

    function switchTabOnArrowPress(event) {
      var pressed = event.keyCode;

      if (direction[pressed]) {
        var target = event.target;

        if (target.index !== undefined) {
          if (tabs[target.index + direction[pressed]]) {
            tabs[target.index + direction[pressed]].focus();
          } else if (pressed === keys.left || pressed === keys.up) {
            focusLastTab();
          } else if (pressed === keys.right || pressed == keys.down) {
            focusFirstTab();
          }

          ;
        }

        ;
      }

      ;
    }

    ; // Make a guess

    function focusFirstTab() {
      tabs[0].focus();
    }

    ; // Make a guess

    function focusLastTab() {
      tabs[tabs.length - 1].focus();
    }

    ;
  });
})();
"use strict";

(function ($) {
  $(function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
})(jQuery);

function onYouTubeIframeAPIReady() {
  jQuery('.youtube-background-video').each(function () {
    var video = jQuery(this).data('video'),
        id = jQuery(this).attr('id'),
        player = new YT.Player(id, {
      height: '360',
      width: '640',
      videoId: video,
      playerVars: {
        'controls': 0,
        'showinfo': 0,
        'rel': 0,
        'enablejsapi': 1,
        'autoplay': 1,
        'loop': 1,
        'wmode': 'transparent'
      },
      events: {
        'onReady': function onReady(e) {
          e.target.playVideo();
          e.target.mute();
          e.target.setPlaybackQuality('hd720');
        },
        onStateChange: function onStateChange(e) {
          if (e.data === YT.PlayerState.ENDED) {
            e.target.playVideo();
          }
        }
      }
    });
  });
}

(function ($) {
  $(function () {
    $(".video-button").each(function () {
      var button = $(this);
      $(this).magnificPopup({
        type: 'iframe',
        items: {
          src: button.data('video')
        }
      });
    });
  });
})(jQuery);
"use strict";

/**
 * Animations are last to make sure other effects or movement happen first as height calculations can affect this
 */
//this removes our fallback css animations - each module should have a fallback animation to set its opacity to 1
var body = document.querySelector('body');
body.classList.remove('no-js');

(function ($) {
  $(function () {
    // Fade In Up
    var fadeInUp = $('.js-fade-in-up');
    fadeInUp.each(function () {
      var $self = $(this);
      $(this).waypoint({
        handler: function handler(direction) {
          anime({
            targets: $self[0],
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: 500,
            delay: anime.stagger(100, {
              start: 300
            })
          });
          this.destroy();
        },
        offset: "100%"
      });
    }); // Fade In Up - Items

    var fadeInUpItemsContainer = $('.js-fade-in-up-items-container');
    fadeInUpItemsContainer.each(function () {
      var $self = $(this);
      $(this).waypoint({
        handler: function handler(direction) {
          anime({
            targets: $self[0].querySelectorAll('.js-fade-in-up-item'),
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: 500,
            delay: anime.stagger(100, {
              start: 500
            })
          });
          this.destroy();
        },
        offset: "100%"
      });
    });
  });
})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLmpzIiwiYWpheC1hZGQtdG8tY2FydC5qcyIsImFuaW1hdGlvbnMuanMiLCJsb2dpbi5qcyIsImxvc3QtcGFzc3dvcmQuanMiLCJtYWluLmpzIiwibmF2aWdhdGlvbi5qcyIsInJlZ2lzdGVyLmpzIiwicmVzZXQtcGFzc3dvcmQuanMiLCJzZWxlY3QtcHJvdmluY2UtbG9jYWxpdHkuanMiLCJza2lwLWxpbmstZm9jdXMtZml4LmpzIiwic3ZnLmpzIiwidGFiYmVyLmpzIiwidmlkZW8uanMiLCJ6LWFuaW1hdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcF9zY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICB2YXIgbGltaXQgPSAxO1xuICB2YXIgaW5wdXQgPSBqUXVlcnkoJ2Zvcm0gI2NhbXBhaWduIC5mb3JtLWlucHV0LXRpcCcpO1xuICB2YXIgYWRkTmV3ID0galF1ZXJ5KFwiZm9ybSAjY2FtcGFpZ24gaW5wdXRbdHlwZT0nYnV0dG9uJ11cIik7XG4gIHZhciBkZWxldGVDYW1wYWlnbkJ0biA9IGpRdWVyeSgnZm9ybSAjY2FtcGFpZ24gLnRhZ2NoZWNrbGlzdCcpO1xuICB2YXIgbWV0YUJveCA9IGpRdWVyeSgnI3RhZ3NkaXYtY2FtcGFpZ24nKTtcblxuICB2YXIgbGltaXRUYXhvbm9teSA9IGZ1bmN0aW9uIGxpbWl0VGF4b25vbXkoKSB7XG4gICAgalF1ZXJ5KCdmb3JtICNjYW1wYWlnbiAjbmV3LXRhZy1jYW1wYWlnbi1kZXNjJykuaGlkZSgpO1xuXG4gICAgaWYgKGlucHV0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChpbnB1dC52YWwoKS5pbmNsdWRlcygnLCcpKSB7XG4gICAgICAgIGFkZERpc2FibGVkKCk7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGl0ZW1zID0galF1ZXJ5KCdmb3JtICNjYW1wYWlnbiAudGFnY2hlY2tsaXN0IGxpJyk7XG5cbiAgICAgICAgaWYgKCRpdGVtcy5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICBhZGREaXNhYmxlZCgpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZGVsZXRlQ2FtcGFpZ24gPSBmdW5jdGlvbiBkZWxldGVDYW1wYWlnbigpIHtcbiAgICBpZiAoalF1ZXJ5KCdmb3JtICNjYW1wYWlnbiAudGFnY2hlY2tsaXN0IGxpJykubGVuZ3RoID09PSAwKSB7XG4gICAgICByZW1vdmVEaXNhYmxlZCgpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY2xlYXJJbnB1dCA9IGZ1bmN0aW9uIGNsZWFySW5wdXQoKSB7XG4gICAgaW5wdXRbMF0udmFsdWUgPSAnJztcblxuICAgIGlmIChqUXVlcnkoJ2Zvcm0gI2NhbXBhaWduIC50YWdjaGVja2xpc3QgbGknKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlbW92ZURpc2FibGVkKCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciByZW1vdmVEaXNhYmxlZCA9IGZ1bmN0aW9uIHJlbW92ZURpc2FibGVkKCkge1xuICAgIGFkZE5ldy5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgIGlucHV0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gIH07XG5cbiAgdmFyIGFkZERpc2FibGVkID0gZnVuY3Rpb24gYWRkRGlzYWJsZWQoKSB7XG4gICAgYWRkTmV3LmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgaW5wdXQuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgfTtcblxuICBsaW1pdFRheG9ub215KCk7XG4gIGlucHV0Lm9uKCdrZXl1cCcsIGxpbWl0VGF4b25vbXkpO1xuICBpbnB1dC5vbigna2V5dXAnLCBsaW1pdFRheG9ub215KTtcbiAgYWRkTmV3Lm9uKCdjbGljaycsIGxpbWl0VGF4b25vbXkpO1xuICBtZXRhQm94Lm9uKCdjbGljaycsIGNsZWFySW5wdXQpO1xuICBkZWxldGVDYW1wYWlnbkJ0bi5vbignY2xpY2snLCBkZWxldGVDYW1wYWlnbik7XG59KTsiLCIvKihmdW5jdGlvbiAoJCkge1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5zaW5nbGVfYWRkX3RvX2NhcnRfYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciAkdGhpc2J1dHRvbiA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgJGZvcm0gPSAkdGhpc2J1dHRvbi5jbG9zZXN0KCdmb3JtLmNhcnQnKSxcbiAgICAgICAgICAgICAgICBpZCA9ICR0aGlzYnV0dG9uLnZhbCgpLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RfcXR5ID0gJGZvcm0uZmluZCgnaW5wdXRbbmFtZT1xdWFudGl0eV0nKS52YWwoKSB8fCAxLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQgPSAkZm9ybS5maW5kKCdpbnB1dFtuYW1lPXByb2R1Y3RfaWRdJykudmFsKCkgfHwgaWQsXG4gICAgICAgICAgICAgICAgdmFyaWF0aW9uX2lkID0gJGZvcm0uZmluZCgnaW5wdXRbbmFtZT12YXJpYXRpb25faWRdJykudmFsKCkgfHwgMDtcblxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3dvb2NvbW1lcmNlX2FqYXhfYWRkX3RvX2NhcnQnLFxuICAgICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCxcbiAgICAgICAgICAgIHByb2R1Y3Rfc2t1OiAnJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiBwcm9kdWN0X3F0eSxcbiAgICAgICAgICAgIHZhcmlhdGlvbl9pZDogdmFyaWF0aW9uX2lkLFxuICAgICAgICB9O1xuXG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkudHJpZ2dlcignYWRkaW5nX3RvX2NhcnQnLCBbJHRoaXNidXR0b24sIGRhdGFdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiB3Y19hZGRfdG9fY2FydF9wYXJhbXMuYWpheF91cmwsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJHRoaXNidXR0b24ucmVtb3ZlQ2xhc3MoJ2FkZGVkJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJHRoaXNidXR0b24uYWRkQ2xhc3MoJ2FkZGVkJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxuICAgICAgICAgICAgICAgICAgICAkdGhpc2J1dHRvbi5yZW1vdmVDbGFzcygnYWRkZWQnKVxuICAgICAgICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvciAmJiByZXNwb25zZS5wcm9kdWN0X3VybCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSByZXNwb25zZS5wcm9kdWN0X3VybDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQuYm9keSkudHJpZ2dlcignYWRkZWRfdG9fY2FydCcsIFtyZXNwb25zZS5mcmFnbWVudHMsIHJlc3BvbnNlLmNhcnRfaGFzaCwgJHRoaXNidXR0b25dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59KShqUXVlcnkpOyovXG5cInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBiYXNpY190ZXh0ID0gJCgnLm1vZHVsZS0tYmFzaWNfdGV4dCcpO1xuICAgIHZhciBsZWZ0X3JpZ2h0ID0gJCgnLm1vZHVsZS0tbGVmdF9yaWdodF9faW5uZXInKTtcbiAgICB2YXIgdmlkZW8gPSAkKCcubW9kdWxlLS12aWRlbycpO1xuICAgIGJhc2ljX3RleHQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgJCh0aGlzKS53YXlwb2ludCh7XG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb21UbyhiYXNpY190ZXh0LCAxLCB7XG4gICAgICAgICAgICB5OiA1MFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LCAwLjEpO1xuICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tVG8oYmFzaWNfdGV4dCwgMSwge1xuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9LCAwLjEpO1xuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9LFxuICAgICAgICBvZmZzZXQ6IFwiMTAwJVwiXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBsZWZ0X3JpZ2h0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICQodGhpcykud2F5cG9pbnQoe1xuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGRpcmVjdGlvbikge1xuICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tVG8oJy5tb2R1bGUtLWxlZnRfcmlnaHRfX2lubmVyJywgMSwge1xuICAgICAgICAgICAgeTogNTBcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSwgMC4xKTtcbiAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbVRvKCcubW9kdWxlLS1sZWZ0X3JpZ2h0X19pbm5lcicsIDEsIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfSwgMC4xKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0OiAnMTAwJSdcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZpZGVvLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICQodGhpcykud2F5cG9pbnQoe1xuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGRpcmVjdGlvbikge1xuICAgICAgICAgIFR3ZWVuTGl0ZS5mcm9tVG8oJy5tb2R1bGUtLXZpZGVvX19pbm5lcicsIDEsIHtcbiAgICAgICAgICAgIHk6IDIwMFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBUd2VlbkxpdGUuZnJvbVRvKCcubW9kdWxlLS12aWRlb19faW5uZXInLCAxLCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9LFxuICAgICAgICBvZmZzZXQ6ICc5MCUnXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KShqUXVlcnkpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG4gIC8qIC0tLSAyLiBMb2dpbiAoQUpBWCkgLS0tICovXG4gICQoXCIjanMtbG9naW4tc3VibWl0LWJ0blwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCQodGhpcykuaXMoXCJbZGlzYWJsZWRdXCIpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgdXJsOiBiaW9fdmFycy5hamF4VXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY3Rpb246IFwiYWpheF9sb2dpblwiLFxuICAgICAgICAvL2NhbGxzIHdwX2FqYXhfbm9wcml2X2FqYXhsb2dpblxuICAgICAgICBtYWlsX2lkOiAkKFwiZm9ybSNsb2dpbiAjdXNlcm5hbWVcIikudmFsKCksXG4gICAgICAgIHBhc3N3b3JkOiAkKFwiZm9ybSNsb2dpbiAjcGFzc3dvcmRcIikudmFsKCksXG4gICAgICAgIHNlY3VyaXR5OiAkKFwiZm9ybSNsb2dpbiAjc2VjdXJpdHlcIikudmFsKClcbiAgICAgIH0sXG4gICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiBiZWZvcmVTZW5kKCkge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGVycm9yIG1lc3NhZ2UgZnJvbSB0aGUgcHJldmlvdXMgYXR0ZW1wdFxuICAgICAgICB2YXIgbGFiZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2xvZ2luIGxhYmVsJyk7XG4gICAgICAgIGxhYmVscy5mb3JFYWNoKGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbG9naW4gaW5wdXQnKTtcbiAgICAgICAgaW5wdXQuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgICB9KTsgLy8gYWRkIGxvYWRlciBidG4gc3VibWl0XG5cbiAgICAgICAgJCgnI2pzLWxvZ2luLXN1Ym1pdC1idG4nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAkKCcjanMtbG9naW4tc3VibWl0LWJ0bicpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICQoJyNqcy1sb2dpbi1zdWJtaXQtYnRuJykuaHRtbCgnJyk7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmRhdGEubG9nZ2VkaW4gPT0gdHJ1ZSkge1xuICAgICAgICAgICQoXCIjbG9naW4gLmVycm9yLW1lc3NhZ2VcIikuaHRtbChkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlVmFsaWRhdGlvbihkYXRhLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICB2YXIgaGFuZGxlVmFsaWRhdGlvbiA9IGZ1bmN0aW9uIGhhbmRsZVZhbGlkYXRpb24oZGF0YSkge1xuICAgIGlmIChkYXRhLnZhbGlkYXRpb24uZW1haWwgPT0gJ2Vycm9yJykge1xuICAgICAgJCgnI2xvZ2luIC5maWVsZC1lbWFpbCBsYWJlbCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgJCgnI2xvZ2luIC5maWVsZC1lbWFpbCBpbnB1dCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnZhbGlkYXRpb24ucGFzc3dvcmQgPT0gJ2Vycm9yJykge1xuICAgICAgJCgnI2xvZ2luIC5maWVsZC1wYXNzd29yZCBsYWJlbCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgJCgnI2xvZ2luIC5maWVsZC1wYXNzd29yZCBpbnB1dCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnZhbGlkYXRpb24udGVybXNBbmRDb25kaXRpb25zID09ICdlcnJvcicpIHtcbiAgICAgICQoJy5zaWduLXVwX190ZXJtcy1hbmQtY29uZGl0aW9ucy1jb3B5JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgJCgnI2pzLWxvZ2luLXN1Ym1pdC1idG4nKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAkKCcjanMtbG9naW4tc3VibWl0LWJ0bicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgJCgnI2pzLWxvZ2luLXN1Ym1pdC1idG4nKS5odG1sKCdJbmdyZXNhcicpO1xuICAgICQoXCIjbG9naW4gLmVycm9yLW1lc3NhZ2VcIikuaHRtbChkYXRhLm1lc3NhZ2UpO1xuICB9O1xuICAvKiAtLSBDaGFuZ2Ugc3RhdGUgcGFzc3dvcmQgLS0gKi9cblxuXG4gIGpRdWVyeShcIiNqcy1jaGFuZ2UtYnRuLXBhc3N3b3JkXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChqUXVlcnkoXCIjcGFzc3dvcmRcIikuYXR0cihcInR5cGVcIikgPT0gXCJwYXNzd29yZFwiKSB7XG4gICAgICBqUXVlcnkoXCIjcGFzc3dvcmRcIikuYXR0cihcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgalF1ZXJ5KFwiI2pzLWNoYW5nZS1idG4tcGFzc3dvcmRcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpRdWVyeShcIiNwYXNzd29yZFwiKS5hdHRyKFwidHlwZVwiLCBcInBhc3N3b3JkXCIpO1xuICAgICAgalF1ZXJ5KFwiI2pzLWNoYW5nZS1idG4tcGFzc3dvcmRcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfVxuICB9KTtcbn0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXJFbWFpbCh2YWxvcikge1xuICAgIHZhciBlbWFpbFJlZ2V4ID0gL15bLVxcdy4lK117MSw2NH1AKD86W0EtWjAtOS1dezEsNjN9XFwuKXsxLDEyNX1bQS1aXXsyLDYzfSQvaTtcblxuICAgIGlmIChlbWFpbFJlZ2V4LnRlc3QodmFsb3IpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZShjYWxsYmFjaywgd2FpdCkge1xuICAgIHZhciB0aW1lcklkO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjay5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICAgICAgfSwgd2FpdCk7XG4gICAgfTtcbiAgfVxuICAvKiAtLS0gTG9zdCBQYXNzd29yZCAoQUpBWCkgLS0tICovXG5cblxuICAkKFwiLmpzLXJlY292ZXJ5LW1haWxcIikub24oXCJrZXl1cFwiLCBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVtYWlsID0gJChcIi5qcy1yZWNvdmVyeS1tYWlsXCIpLnZhbCgpO1xuICAgIGlmICghdmFsaWRhckVtYWlsKGVtYWlsKSkgcmV0dXJuO1xuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgIHVybDogYmlvX3ZhcnMuYWpheFVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYWN0aW9uOiBcImNoZWNrX2xvc3RfcGFzc3dvcmRcIixcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9LFxuICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gYmVmb3JlU2VuZCgpIHtcbiAgICAgICAgJCgnI2pzLWxvc3QtcGFzc3dvcmQtc3VibWl0LWJ0bicpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICQoJyNqcy1sb3N0LXBhc3N3b3JkLXN1Ym1pdC1idG4nKS5odG1sKCcnKTtcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgJCgnI2pzLWxvc3QtcGFzc3dvcmQtc3VibWl0LWJ0bicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICQoJyNqcy1sb3N0LXBhc3N3b3JkLXN1Ym1pdC1idG4nKS5odG1sKCdFbnZpYXInKTtcblxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAkKCcjanMtcmVjb3ZlcnktbW9kYWwnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAkKCcucmVjb3ZlcnlfX2J0bi0taW52ZXJ0ZWQnKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAkKCcjanMtbG9zdHBhc3MtbWVzc2FnZScpLmh0bWwoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJyNqcy1sb3N0cGFzcy1tZXNzYWdlJykuaHRtbChkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgJCgnI2pzLXJlY292ZXJ5LW1vZGFsJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgJCgnLnJlY292ZXJ5X19idG4tLWludmVydGVkJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LCAyNTApKTtcbiAgJCgnI2pzLWxvc3QtcGFzc3dvcmQtc3VibWl0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgJCgnI2pzLWxvc3QtcGFzc3dvcmQtc3VibWl0LWJ0bicpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgJCgnI2pzLWxvc3QtcGFzc3dvcmQtc3VibWl0LWJ0bicpLmh0bWwoJycpO1xuICAgIHZhciBlbWFpbCA9ICQoXCIuanMtcmVjb3ZlcnktbWFpbFwiKS52YWwoKTtcblxuICAgIGlmIChlbWFpbCA9PSBcIlwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnI2pzLWxvc3RwYXNzLW1lc3NhZ2UnKS5odG1sKCc8cCBjbGFzcz1cInRleHQtZGFuZ2VyXCI+UG9yIGZhdm9yLCBpbmdyZXNlIHN1IGVtYWlsLjwvcD4nKTtcbiAgICAgICQoJyNqcy1yZWNvdmVyeS1tb2RhbCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgJCgnI2pzLWxvc3QtcGFzc3dvcmQtc3VibWl0LWJ0bicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAkKCcjanMtbG9zdC1wYXNzd29yZC1zdWJtaXQtYnRuJykuaHRtbCgnRW52aWFyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBJTkRFWFxuXHQxLiBSZWdpc3RyYXRpb24gKEFKQVgpXG5cdDIuIExvZ2luIFxuXHRcdDIuMSBBSkFYXG5cdFx0Mi4yIE1vZGFsXG5cdDMuIFNpZ24gVXAgTW9kYWxcblx0NC4gUGFzc3dvcmQgUmVjb3Zlcnlcblx0NS4gUmVsYXRlZCBQcm9kdWN0cyBTbGlkZXJcblx0Ni4gUmVkaXJlY3QgU2VjdGlvbiAtIFNjcm9sbCBBbmltYXRpb25cblx0Ny4gTWluaSBDYXJ0IChEcm9wZG93bilcblx0UGFnZSA+IFByb2R1Y3QgRGV0YWlsXG5cdFx0XHRQcm9kdWN0IFNlbGVjdGlvbiAtIFByaWNlIFVwZGF0ZSBvbiBWYXJpYmFsZSBQcm9kdWN0IHNlbGVjdGlvblxuXHRcdFx0Tm90aWNlcyBEaXNwbGF5IChTdWNjZXMgLSBFcnJvcilcblx0XHRcdERvc2VzIENhbGN1bGF0b3Jcblx0UGFnZSA+IENhcnRcblx0UGFnZSA+IENoZWNrb3V0XG5cdFBhZ2UgPiDCv0PDs21vIEZ1bmNpb25hP1xuXHRQYWdlID4gTXkgQWNjb3VudFxuXHRQYWdlID4gSG9tZVxuXHRDYXJkIFByb2R1Y3RcbiovXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG4gIGNvbnNvbGUudGltZShcIkpTIExvYWRpbmcgT0tcIik7IC8vIE5hdmJhciAod2hlbiBsb2dnZWQgaW4gYW5kIG9uIHNjcm9sbClcblxuICB2YXIgc2l0ZUhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXN0aGVhZCcpO1xuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgIGlmIChzY3JvbGwgPCA5MCkge1xuICAgICAgc2l0ZUhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2l0ZUhlYWRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gIH0pOyAvLyBTaWduIFVwIFNraXBcblxuICAkKCcuc2lnbi11cF9fc2tpcCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKGxvY2F0aW9uKS5hdHRyKCdocmVmJywgbG9jYXRpb24uaHJlZik7XG4gIH0pO1xuICAvKiAtLS0gTG9naW4gSGVyZSAtLS0gKi9cblxuICB2YXIgbG9naW5IZXJlID0gJCgnI2pzLWxvZ2luLWhlcmUnKTtcbiAgbG9naW5IZXJlLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJyNqcy1zaWduLXVwLWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCcjanMtbG9naW4tY29udGFpbmVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTsgLy8gQWRkIHRvIGNhcnQgPiBSZWRpcmVjdCB0byBMb2dpbiAoaWYgbm90IGxvZ2dlZClcblxuICB2YXIgYnV5QnRuU2luZ2xlID0gJCgnLnNpbmdsZV9hZGRfdG9fY2FydF9idXR0b24nKTtcbiAgdmFyIGhlcm9Ob3RMb2dnZWRJbiA9ICQoJyNqcy1oZXJvLXJlZ2lzdGVyJyk7XG5cbiAgaWYgKCEkKCdib2R5JykuaGFzQ2xhc3MoJ2xvZ2dlZC1pbicpKSB7XG4gICAgYnV5QnRuU2luZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vbG9naW5Nb2RhbENvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgIH0pO1xuICAgIGhlcm9Ob3RMb2dnZWRJbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvL3NpZ25VcE1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgfSk7XG4gIH1cbiAgLyogLS0tIDQuIFBhc3N3b3JkIFJlY292ZXJ5IC0tLSAqL1xuXG5cbiAgdmFyIHBhc3NSZWNvdmVyeU1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXJlY292ZXJ5LW1vZGFsJyk7XG4gIHZhciBsb3N0UGFzc1N1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1sb3N0LXBhc3N3b3JkLXN1Ym1pdC1idG4nKTtcbiAgdmFyIGNsb3NlUmVjb3ZlcnlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtcmVjb3ZlcnktbW9kYWwtY2xvc2UnKTtcbiAgdmFyIHRyeUFnYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWxvc3QtcGFzc3dvcmQtYnRuJyk7XG5cbiAgaWYgKCQoJy5yZWNvdmVyeV9fY29udGFpbmVyIC53b29jb21tZXJjZS1ub3RpY2VzLXdyYXBwZXIgdWwnKS5oYXNDbGFzcygnd29vY29tbWVyY2UtZXJyb3InKSkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWNvdmVyeScpO1xuICAgIHBhc3NSZWNvdmVyeU1vZGFsLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gIH1cblxuICBpZiAobG9zdFBhc3NTdWJtaXRCdG4pIHtcbiAgICBsb3N0UGFzc1N1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNvdmVyeScsICd0cnVlJyk7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChwYXNzUmVjb3ZlcnlNb2RhbCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjb3ZlcnknKSA9PT0gJ3RydWUnKSB7XG4gICAgICBwYXNzUmVjb3ZlcnlNb2RhbC5jbGFzc0xpc3QuYWRkKCdzdWNjZXNzJyk7XG4gICAgICBwYXNzUmVjb3ZlcnlNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjbG9zZVJlY292ZXJ5QnRuKSB7XG4gICAgY2xvc2VSZWNvdmVyeUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWNvdmVyeScpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG4gICAgfSk7XG4gIH1cblxuICBpZiAodHJ5QWdhaW4pIHtcbiAgICB0cnlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWNvdmVyeScpO1xuICAgICAgcGFzc1JlY292ZXJ5TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc3VjY2VzcycpO1xuICAgICAgcGFzc1JlY292ZXJ5TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZWNvdmVyeS1tYWlsJykpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVjb3ZlcnktbWFpbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgcGFzc1JlY292ZXJ5TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICB9KTtcbiAgfVxuICAvKiAtLS0gNS4gUmVsYXRlZCBQcm9kdWN0cyBTbGlkZXIgLS0tICovXG5cblxuICBpZiAoJCgnLnJlbGF0ZWQtcHJvZHVjdHNfX3NsaWRlciAuY2FyZC1wcm9kdWN0JykubGVuZ3RoID4gNCB8fCAkKHdpbmRvdykud2lkdGgoKSA8IDc2OSkge1xuICAgICQoXCIjanMtcmVsYXRlZC1wcm9kdWN0c1wiKS5zbGljayh7XG4gICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICBzbGlkZXNUb1Njcm9sbDogNCxcbiAgICAgIHByZXZBcnJvdzogJChcIiNqcy1zbGljay1wcmV2LWFycm93XCIpLFxuICAgICAgbmV4dEFycm93OiAkKFwiI2pzLXNsaWNrLW5leHQtYXJyb3dcIiksXG4gICAgICBkb3RzOiB0cnVlLFxuICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgYnJlYWtwb2ludDogOTYwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDU3NSxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcwJyxcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoJy5yZWxhdGVkLXByb2R1Y3RzJykuYWRkQ2xhc3MoJ25vLXNsaWRlcicpO1xuICB9XG4gIC8qIC0tLSA2LiBSZWRpcmVjdCBTZWN0aW9uIC0gU2Nyb2xsIEFuaW1hdGlvbiAtLS0gKi9cblxuXG4gICQoJy5qcy1yZWRpcmVjdC1saW5rJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2Nyb2xsVG9wUmVkaXJlY3QgPSAkKCcuanMtcmVkaXJlY3Qtc2VjdGlvbltkYXRhLXJlZGlyZWN0LXNlY3Rpb249XCInICsgJCh0aGlzKS5kYXRhKFwicmVkaXJlY3QtbGlua1wiKSArICdcIl0nKS5vZmZzZXQoKS50b3AgLSAxMDA7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wUmVkaXJlY3RcbiAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG4gIH0pO1xuICAvKiAtLS0gNy4gTWluaSBDYXJ0IChEcm9wZG93bikgLS0tICovXG5cbiAgdmFyIGNhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcHJpdmF0ZS1tZW51IC5jYXJ0Jyk7XG4gIHZhciBtaW5pQ2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1taW5pLWNhcnQnKTtcbiAgdmFyIG1pbmlDYXJ0RW1wdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbWluaS1jYXJ0LWVtcHR5Jyk7XG4gIGNhcnRCdG4uZm9yRWFjaChmdW5jdGlvbiAoYnRuKSB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29vY29tbWVyY2UtbWluaS1jYXJ0X19lbXB0eS1tZXNzYWdlJykubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKG1pbmlDYXJ0RW1wdHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgIG1pbmlDYXJ0RW1wdHkuY2xhc3NMaXN0LmFkZCgnY2xvc2luZycpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWluaUNhcnRFbXB0eS5jbGFzc0xpc3QucmVtb3ZlKCdjbG9zaW5nJyk7XG4gICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1pbmlDYXJ0RW1wdHkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluaUNhcnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgIG1pbmlDYXJ0LmNsYXNzTGlzdC5hZGQoJ2Nsb3NpbmcnKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1pbmlDYXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NpbmcnKTtcbiAgICAgICAgICB9LCAyNTApO1xuICAgICAgICB9XG5cbiAgICAgICAgbWluaUNhcnQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGlmIChtaW5pQ2FydEVtcHR5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChtaW5pQ2FydEVtcHR5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgbWluaUNhcnRFbXB0eS5jbGFzc0xpc3QuYWRkKCdjbG9zaW5nJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1pbmlDYXJ0RW1wdHkuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2luZycpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgICBtaW5pQ2FydEVtcHR5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKG1pbmlDYXJ0KSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChtaW5pQ2FydC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgIG1pbmlDYXJ0LmNsYXNzTGlzdC5hZGQoJ2Nsb3NpbmcnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbWluaUNhcnQuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2luZycpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgICBtaW5pQ2FydC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICgkKCcjanMtbWluaS1jYXJ0IGxpJykubGVuZ3RoIDw9IDEpIHtcbiAgICAkKCcjanMtbWluaS1jYXJ0JykuY3NzKCdmbGV4LXdyYXAnLCAnbm93cmFwJyk7XG4gICAgJCgnI2pzLW1pbmktY2FydCA+IGRpdicpLmNzcygnd2lkdGgnLCAnMTAlJyk7XG4gICAgJCgnI2pzLW1pbmktY2FydCA+IGRpdicpLmNzcygnbWFyZ2luLXRvcCcsICcwJyk7XG4gIH1cblxuICBpZiAoJCgnLndvb2NvbW1lcmNlLW1pbmktY2FydF9fZW1wdHktbWVzc2FnZScpLmxlbmd0aCA9PSAxKSB7XG4gICAgJCgnLmNhcnQgYScpLnJlbW92ZUNsYXNzKCdmdWxsJyk7XG4gIH0gZWxzZSB7XG4gICAgJCgnLmNhcnQgYScpLmFkZENsYXNzKCdmdWxsJyk7XG4gIH1cbiAgLyogLS0tIFBhZ2UgPiBDaGVja291dCAtLS0gKi9cbiAgLy8gQ2FuY2VsIEJ1dHRvblxuXG5cbiAgdmFyIGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jYW5jZWwtcHVyY2hhc2UnKTtcbiAgdmFyIGNhbmNlbEJ0bkNvbmZpcm1hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYW5jZWwtYnRuLWNvbmZpcm1hdGlvbicpO1xuICB2YXIgY2FuY2VsTW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2FuY2VsLW1vZGFsJyk7XG5cbiAgaWYgKGNhbmNlbEJ0bikge1xuICAgIGNhbmNlbEJ0bi5mb3JFYWNoKGZ1bmN0aW9uIChidG4pIHtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2FuY2VsTW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSAvLyBQbGFjZSBPcmRlclxuXG5cbiAgdmFyIHBsYWNlT3JkZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Vfb3JkZXInKTtcblxuICBpZiAocGxhY2VPcmRlckJ0bikge1xuICAgIHBsYWNlT3JkZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGludmFsaWRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29vY29tbWVyY2UtaW52YWxpZC1yZXF1aXJlZC1maWVsZCcpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvKmVsc2Uge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FuY2VsYXRpb24nLCAndHJ1ZScpXG4gICAgICAgIH0qL1xuXG4gICAgICB9LCAyNTAwKTtcbiAgICB9KTtcbiAgfSAvLyBJbmNvbXBsZXRlIEZpZWxkcyBXYXJuaW5nXG5cblxuICB2YXIgY2hlY2tvdXRFcnJvcnNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2hlY2tvdXQtZXJyb3JzLWNvbnRhaW5lcicpO1xuXG4gIGlmICgkKCcjcGxhY2Vfb3JkZXInKSkge1xuICAgICQoJyNwbGFjZV9vcmRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hlY2tvdXRFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29vY29tbWVyY2UtTm90aWNlR3JvdXAtY2hlY2tvdXQgLndvb2NvbW1lcmNlLWVycm9yJyk7XG5cbiAgICAgICAgaWYgKGNoZWNrb3V0RXJyb3JzKSB7XG4gICAgICAgICAgY2hlY2tvdXRFcnJvcnNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0sIDIwMDApO1xuICAgIH0pO1xuICB9IC8vIFByZXZlbnQgU2Nyb2xsIFVwIG9uIEZpZWxkIFZhbGlkYXRpb25cblxuXG4gIGpRdWVyeShkb2N1bWVudCkuYWpheENvbXBsZXRlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoalF1ZXJ5KCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNoZWNrb3V0JykgfHwgalF1ZXJ5KCdib2R5JykuaGFzQ2xhc3MoJ3dvb2NvbW1lcmNlLWNhcnQnKSkge1xuICAgICAgalF1ZXJ5KCdodG1sLCBib2R5Jykuc3RvcCgpO1xuICAgIH1cbiAgfSk7IC8vIFN1Y2Nlc3MgQ2hlY2tvdXRcblxuICB2YXIga2VlcEJ1eWluZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1rZWVwLWJ1eWluZycpO1xuICB2YXIga2VlcEJ1eWluZ0J0blNlY29uZGFyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1rZWVwLWJ1eWluZy1tb2RhbC1jbG9zZScpO1xuICB2YXIgc3VjY2Vzc01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXN1Y2Nlc3MtbW9kYWwnKTtcblxuICBpZiAoc3VjY2Vzc01vZGFsKSB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYW5jZWxhdGlvbicpID09PSAndHJ1ZScpIHtcbiAgICAgIHN1Y2Nlc3NNb2RhbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2Vzc01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZWVwQnV5aW5nQnRuKSB7XG4gICAga2VlcEJ1eWluZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHN1Y2Nlc3NNb2RhbC5jbGFzc0xpc3QuYWRkKCdjbG9zaW5nJyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VjY2Vzc01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NpbmcnKTtcbiAgICAgIH0sIDI1MCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VjY2Vzc01vZGFsLnJlbW92ZSgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2FuY2VsYXRpb24nKTtcbiAgICAgIH0sIDM1MCk7XG4gICAgfSk7XG4gICAga2VlcEJ1eWluZ0J0blNlY29uZGFyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHN1Y2Nlc3NNb2RhbC5jbGFzc0xpc3QuYWRkKCdjbG9zaW5nJyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VjY2Vzc01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NpbmcnKTtcbiAgICAgIH0sIDI1MCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VjY2Vzc01vZGFsLnJlbW92ZSgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2FuY2VsYXRpb24nKTtcbiAgICAgIH0sIDM1MCk7XG4gICAgfSk7XG4gIH1cbiAgLyogLS0tIFBhZ2UgPiDCv0PDs21vIEZ1bmNpb25hPyAtLS0gKi9cbiAgLy8gRkFRXG5cblxuICB2YXIgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZhcV9fYWNjb3JkaW9uIGJ1dHRvblwiKTtcbiAgdmFyIGl0ZW1zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mYXFfX2FjY29yZGlvbi1pdGVtXCIpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZUFjY29yZGlvbigpIHtcbiAgICB2YXIgaXRlbVRvZ2dsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgIGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIGlmIChpdGVtVG9nZ2xlID09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQWNjb3JkaW9uKTtcbiAgICB9KTtcbiAgfVxuICAvKiAtLS0gUGFnZSA+IE15IEFjY291bnQgLS0tICovXG4gIC8vIEdldCBGaWVsZHMgXG5cblxuICB2YXIgZmlyc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JpbGxpbmdfZmlyc3RfbmFtZScpO1xuICB2YXIgbGFzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmlsbGluZ19sYXN0X25hbWUnKTtcbiAgdmFyIGJpbGxpbmdSb2xsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JpbGxpbmdfcm9sbCcpO1xuICB2YXIgYmlsbGluZ1Bob25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JpbGxpbmdfcGhvbmUnKTtcbiAgdmFyIGJpbGxpbmdQaG9uZUNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiaWxsaW5nX3Bob25lX2NlbCcpOyAvLyBBamF4IExvYWRlclxuXG4gIHZhciBteUFjY291bnRGb3JtTWFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tYXNrLWFjY291bnQnKTtcbiAgdmFyIGFqYXhTcGlubmVyRm9ybUFjY291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtc3Bpbm5lci1hY2NvdW50Jyk7IC8vIEFqYXggU2F2ZVxuXG4gIHZhciBzYXZlVXNlckRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtc2F2ZS11c2VyLWluZm8nKTtcblxuICBpZiAoc2F2ZVVzZXJEYXRhKSB7XG4gICAgc2F2ZVVzZXJEYXRhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gVmFsaWRhdGUgRW1wdHkgRmllbGRzXG5cbiAgICAgIGlmIChmaXJzdE5hbWUudmFsdWUudHJpbSgpID09ICcnIHx8IGxhc3ROYW1lLnZhbHVlLnRyaW0oKSA9PSAnJyB8fCBiaWxsaW5nUm9sbC52YWx1ZS50cmltKCkgPT0gJycgfHwgYmlsbGluZ1Bob25lQ2VsLnZhbHVlLnRyaW0oKSA9PSAnJykge1xuICAgICAgICAkKCcjanMtYmlsbGluZy1wcm9maWxlLXJlc3BvbnNlJykuYWRkQ2xhc3MoJ3RleHQtZGFuZ2VyJykudGV4dCgnUG9yIGZhdm9yLCBjb21wbGV0ZSB0b2RvcyBsb3MgY2FtcG9zLicpO1xuICAgICAgICBpZiAoZmlyc3ROYW1lLnZhbHVlLnRyaW0oKSA9PSAnJykgZmlyc3ROYW1lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b29jb21tZXJjZS1pbnZhbGlkJyk7XG4gICAgICAgIGlmIChsYXN0TmFtZS52YWx1ZS50cmltKCkgPT0gJycpIGxhc3ROYW1lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b29jb21tZXJjZS1pbnZhbGlkJyk7XG4gICAgICAgIGlmIChiaWxsaW5nUm9sbC52YWx1ZS50cmltKCkgPT0gJycpIGJpbGxpbmdSb2xsLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd3b29jb21tZXJjZS1pbnZhbGlkJyk7XG4gICAgICAgIGlmIChiaWxsaW5nUGhvbmVDZWwudmFsdWUudHJpbSgpID09ICcnKSBiaWxsaW5nUGhvbmVDZWwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3dvb2NvbW1lcmNlLWludmFsaWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBWYWxpZGF0ZSBFcnJvcnMgaW4gRmllbGRzXG5cblxuICAgICAgaWYgKGZpcnN0TmFtZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnd29vY29tbWVyY2UtaW52YWxpZCcpIHx8IGxhc3ROYW1lLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd3b29jb21tZXJjZS1pbnZhbGlkJykgfHwgYmlsbGluZ1JvbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3dvb2NvbW1lcmNlLWludmFsaWQnKSB8fCBiaWxsaW5nUGhvbmUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3dvb2NvbW1lcmNlLWludmFsaWQnKSB8fCBiaWxsaW5nUGhvbmVDZWwucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3dvb2NvbW1lcmNlLWludmFsaWQnKSkge1xuICAgICAgICAkKCcjanMtYmlsbGluZy1wcm9maWxlLXJlc3BvbnNlJykuYWRkQ2xhc3MoJ3RleHQtZGFuZ2VyJykudGV4dCgnUG9yIGZhdm9yLCB2ZXJpZmljYSBsYSBpbmZvcm1hY2nDs24gaW5ncmVzYWRhLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgIHVybDogYmlvX3ZhcnMuYWpheFVybCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGFjdGlvbjogXCJzYXZlX3VzZXJfZGF0YVwiLFxuICAgICAgICAgIGJpbGxpbmdfZmlyc3RfbmFtZTogZmlyc3ROYW1lLnZhbHVlLFxuICAgICAgICAgIGJpbGxpbmdfbGFzdF9uYW1lOiBsYXN0TmFtZS52YWx1ZSxcbiAgICAgICAgICBiaWxsaW5nX3JvbGw6IGJpbGxpbmdSb2xsLnZhbHVlLFxuICAgICAgICAgIGJpbGxpbmdfcGhvbmU6IGJpbGxpbmdQaG9uZS52YWx1ZSxcbiAgICAgICAgICBiaWxsaW5nX3Bob25lX2NlbDogYmlsbGluZ1Bob25lQ2VsLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIGJlZm9yZVNlbmQoKSB7XG4gICAgICAgICAgYWpheFNwaW5uZXJGb3JtQWNjb3VudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICBteUFjY291bnRGb3JtTWFzay5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAkKCcjanMtYmlsbGluZy1wcm9maWxlLXJlc3BvbnNlJykucmVtb3ZlQ2xhc3MoJ3RleHQtZGFuZ2VyJykuYWRkQ2xhc3MoJ3RleHQtaW5mbycpLnRleHQoJ0d1YXJkYW5kby4uLicpO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICBhamF4U3Bpbm5lckZvcm1BY2NvdW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgbXlBY2NvdW50Rm9ybU1hc2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAkKCcjanMtYmlsbGluZy1wcm9maWxlLXJlc3BvbnNlJykucmVtb3ZlQ2xhc3MoJ3RleHQtZGFuZ2VyJykuYWRkQ2xhc3MoJ3RleHQtaW5mbycpLnRleHQoJ0RhdG9zIGd1YXJkYWRvcyBjb3JyZWN0YW1lbnRlLicpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjanMtYmlsbGluZy1wcm9maWxlLXJlc3BvbnNlJykucmVtb3ZlQ2xhc3MoJ3RleHQtaW5mbycpLnRleHQoJycpO1xuICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSAvLyBNeSBPcmRlciBIaXN0b3J5IChEZXNrdG9wKVxuXG5cbiAgdmFyIG9yZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlcicpO1xuICBvcmRlcnMuZm9yRWFjaChmdW5jdGlvbiAob3JkZXJQcm9kdWN0cykge1xuICAgIGlmIChvcmRlclByb2R1Y3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlci1wcm9kdWN0cyBwJykubGVuZ3RoID4gMSkge1xuICAgICAgb3JkZXJQcm9kdWN0cy5jbGFzc0xpc3QuYWRkKCdtdWx0aXBsZS1wcm9kdWN0cycpO1xuICAgIH1cbiAgfSk7IC8vIE15IE9yZGVycyBIaXN0b3J5IChNb2JpbGUpXG5cbiAgdmFyIG9yZGVySGlzdG9yeU9yZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW9yZGVyLWhpc3Rvcnktb3JkZXInKTtcblxuICBpZiAob3JkZXJIaXN0b3J5T3JkZXIpIHtcbiAgICBvcmRlckhpc3RvcnlPcmRlci5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgLyogLS0tIFBhZ2UgPiBIb21lICAtLS0gKi9cbiAgLy8gSGVybyAmIFdhdmUgUGFyYWxsYXhcblxuXG4gIHZhciB0YXJnZXRQYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1wYXJhbGxheCcpOyAvLyBUYXJnZXQgQkcgUGFyYWxsYXhcblxuICB2YXIgdGFyZ2V0UGFyYWxsYXhXYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXBhcmFsbGF4LWhvcml6b250YWwnKTtcbiAgdGFyZ2V0UGFyYWxsYXhXYXZlLmZvckVhY2goZnVuY3Rpb24gKHdhdmUpIHtcbiAgICAvLyBDYWxjdWxhdGUgZGlzdGFuY2UgZnJvbSB0b3BcbiAgICB2YXIgcmVjdCA9IHdhdmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHRhcmdldFBhcmFsbGF4SW1nWU9mZnNldCA9IHJlY3QudG9wICsgd2luZG93LnNjcm9sbFk7IC8vIFZhcmlhYmxlc1xuXG4gICAgdmFyIHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIHZhciBlbGVtZW50SGVpZ2h0ID0gd2F2ZS5jbGllbnRIZWlnaHQ7IC8vIFBhcmFsbGF4XG5cbiAgICB3YXZlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyAoc2Nyb2xsZWQgLSB0YXJnZXRQYXJhbGxheEltZ1lPZmZzZXQpICogMC4yXG4gICAgLyo8PDwgc3BlZWQgbXVsdGlwbGllciovXG4gICAgKyAncHgpJztcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGFyZ2V0UGFyYWxsYXhJbWcuZm9yRWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAvLyBDYWxjdWxhdGUgZGlzdGFuY2UgZnJvbSB0b3BcbiAgICAgIHZhciByZWN0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHRhcmdldFBhcmFsbGF4SW1nWU9mZnNldCA9IHJlY3QudG9wICsgd2luZG93LnNjcm9sbFk7IC8vIFZhcmlhYmxlc1xuXG4gICAgICB2YXIgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICB2YXIgZWxlbWVudEhlaWdodCA9IGltZy5jbGllbnRIZWlnaHQ7IC8vIERldGVjdCBCRyBpcyBpbnNpZGUgVmlld3BvcnRcblxuICAgICAgaWYgKHNjcm9sbGVkID4gdGFyZ2V0UGFyYWxsYXhJbWdZT2Zmc2V0IC0gZWxlbWVudEhlaWdodCkge1xuICAgICAgICAvLyBQYXJhbGxheFxuICAgICAgICBpbWcuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IChzY3JvbGxlZCAtIHRhcmdldFBhcmFsbGF4SW1nWU9mZnNldCkgKiAwLjJcbiAgICAgICAgLyo8PDwgc3BlZWQgbXVsdGlwbGllciovXG4gICAgICAgICsgXCJweFwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRhcmdldFBhcmFsbGF4V2F2ZS5mb3JFYWNoKGZ1bmN0aW9uICh3YXZlKSB7XG4gICAgICAvLyBDYWxjdWxhdGUgZGlzdGFuY2UgZnJvbSB0b3BcbiAgICAgIHZhciByZWN0ID0gd2F2ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciB0YXJnZXRQYXJhbGxheEltZ1lPZmZzZXQgPSByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZOyAvLyBWYXJpYWJsZXNcblxuICAgICAgdmFyIHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgdmFyIGVsZW1lbnRIZWlnaHQgPSB3YXZlLmNsaWVudEhlaWdodDsgLy8gUGFyYWxsYXhcblxuICAgICAgd2F2ZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgKHNjcm9sbGVkIC0gdGFyZ2V0UGFyYWxsYXhJbWdZT2Zmc2V0KSAqIDAuMlxuICAgICAgLyo8PDwgc3BlZWQgbXVsdGlwbGllciovXG4gICAgICArICdweCknO1xuICAgIH0pO1xuICB9KTtcbiAgLyogLSBOZXcgQ2FtcGFpZ24gQmFubmVyIC0gKi9cblxuICB2YXIgbmV3Q2FtcGFpZ25CYW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmV3LWNhbXBhaWduLWJhbm5lcicpO1xuICB2YXIgY2xvc2VDYW1wYWlnbkJhbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jbG9zZS1uZXctY2FtcGFpZ24nKTsgLy8gT3BlbiBNb2RhbFxuXG4gIGlmIChuZXdDYW1wYWlnbkJhbm5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctYmFubmVyJykgJiYgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmV3LWNhbXBhaWduLWJhbm5lci1zZWVuJykgIT0gJ3RydWUnKSB7XG4gICAgbmV3Q2FtcGFpZ25CYW5uZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH0gLy8gQ2xvc2UgTW9kYWxcblxuXG4gIGNsb3NlQ2FtcGFpZ25CYW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3Q2FtcGFpZ25CYW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnbmV3LWNhbXBhaWduLWJhbm5lci1zZWVuJywgJ3RydWUnKTtcbiAgfSk7XG4gIC8qIC0tLSBDYXJkIFByb2R1Y3QgIC0tLSAqL1xuICAvLyBDYXJkIFByb2R1Y3QgPiBFbnRpcmVseSBjbGlja2VhYmxlXG5cbiAgdmFyIGNhcmRQcm9kdWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQtcHJvZHVjdCcpO1xuICBjYXJkUHJvZHVjdC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9kdWN0KSB7XG4gICAgcHJvZHVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwcm9kdWN0TGluayA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLndvb2NvbW1lcmNlLUxvb3BQcm9kdWN0LWxpbmsnKS5ocmVmO1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gcHJvZHVjdExpbms7XG4gICAgfSk7XG4gIH0pO1xuICBjb25zb2xlLnRpbWVFbmQoXCJKUyBMb2FkaW5nIE9LXCIpO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogRmlsZSBuYXZpZ2F0aW9uLmpzLlxuICpcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XG4gKiBuYXZpZ2F0aW9uIHN1cHBvcnQgZm9yIGRyb3Bkb3duIG1lbnVzLlxuICovXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgY29udGFpbmVyLCBidXR0b24sIG1lbnUsIGxpbmtzLCBpLCBsZW47XG4gIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXInKTtcblxuICBpZiAoIWNvbnRhaW5lcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGJ1dHRvbiA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYnV0dG9uJylbMF07XG5cbiAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgYnV0dG9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbWVudSA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVswXTsgLy8gSGlkZSBtZW51IHRvZ2dsZSBidXR0b24gaWYgbWVudSBpcyBlbXB0eSBhbmQgcmV0dXJuIGVhcmx5LlxuXG4gIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG1lbnUpIHtcbiAgICBidXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoLTEgPT09IG1lbnUuY2xhc3NOYW1lLmluZGV4T2YoJ25hdi1tZW51JykpIHtcbiAgICBtZW51LmNsYXNzTmFtZSArPSAnIG5hdi1tZW51JztcbiAgfVxuXG4gIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICgtMSAhPT0gY29udGFpbmVyLmNsYXNzTmFtZS5pbmRleE9mKCd0b2dnbGVkJykpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyB0b2dnbGVkJywgJycpO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuY2xhc3NOYW1lICs9ICcgdG9nZ2xlZCc7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICB9XG4gIH07IC8vIENsb3NlIHNtYWxsIG1lbnUgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlXG5cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBpc0NsaWNrSW5zaWRlID0gY29udGFpbmVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG5cbiAgICBpZiAoIWlzQ2xpY2tJbnNpZGUpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoJyB0b2dnbGVkJywgJycpO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIH1cbiAgfSk7IC8vIEdldCBhbGwgdGhlIGxpbmsgZWxlbWVudHMgd2l0aGluIHRoZSBtZW51LlxuXG4gIGxpbmtzID0gbWVudS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpOyAvLyBFYWNoIHRpbWUgYSBtZW51IGxpbmsgaXMgZm9jdXNlZCBvciBibHVycmVkLCB0b2dnbGUgZm9jdXMuXG5cbiAgZm9yIChpID0gMCwgbGVuID0gbGlua3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRvZ2dsZUZvY3VzLCB0cnVlKTtcbiAgICBsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdG9nZ2xlRm9jdXMsIHRydWUpO1xuICB9XG4gIC8qKlxuICAgKiBTZXRzIG9yIHJlbW92ZXMgLmZvY3VzIGNsYXNzIG9uIGFuIGVsZW1lbnQuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gdG9nZ2xlRm9jdXMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzOyAvLyBNb3ZlIHVwIHRocm91Z2ggdGhlIGFuY2VzdG9ycyBvZiB0aGUgY3VycmVudCBsaW5rIHVudGlsIHdlIGhpdCAubmF2LW1lbnUuXG5cbiAgICB3aGlsZSAoLTEgPT09IHNlbGYuY2xhc3NOYW1lLmluZGV4T2YoJ25hdi1tZW51JykpIHtcbiAgICAgIC8vIE9uIGxpIGVsZW1lbnRzIHRvZ2dsZSB0aGUgY2xhc3MgLmZvY3VzLlxuICAgICAgaWYgKCdsaScgPT09IHNlbGYudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGlmICgtMSAhPT0gc2VsZi5jbGFzc05hbWUuaW5kZXhPZignZm9jdXMnKSkge1xuICAgICAgICAgIHNlbGYuY2xhc3NOYW1lID0gc2VsZi5jbGFzc05hbWUucmVwbGFjZSgnIGZvY3VzJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuY2xhc3NOYW1lICs9ICcgZm9jdXMnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYgPSBzZWxmLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUb2dnbGVzIGBmb2N1c2AgY2xhc3MgdG8gYWxsb3cgc3VibWVudSBhY2Nlc3Mgb24gdGFibGV0cy5cbiAgICovXG5cblxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3VjaFN0YXJ0Rm4sXG4gICAgICAgIHBhcmVudExpbmsgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhLCAucGFnZV9pdGVtX2hhc19jaGlsZHJlbiA+IGEnKTtcblxuICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgIHRvdWNoU3RhcnRGbiA9IGZ1bmN0aW9uIHRvdWNoU3RhcnRGbihlKSB7XG4gICAgICAgIHZhciBtZW51SXRlbSA9IHRoaXMucGFyZW50Tm9kZTtcblxuICAgICAgICBpZiAoIW1lbnVJdGVtLmNsYXNzTGlzdC5jb250YWlucygnZm9jdXMnKSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBtZW51SXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAobWVudUl0ZW0gPT09IG1lbnVJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW5baV0pIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbnVJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZW51SXRlbS5jbGFzc0xpc3QuYWRkKCdmb2N1cycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJlbnRMaW5rLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHBhcmVudExpbmtbaV0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnRGbiwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSkoY29udGFpbmVyKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcbiAgLyogLS0tIDEuIFJlZ2lzdHJhdGlvbiAoQUpBWCkgLS0tICovXG4gIGpRdWVyeShcIiNyZWdpc3Rlci1tZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJCh0aGlzKS5pcyhcIltkaXNhYmxlZF1cIikpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB2YXIgYWN0aW9uID0gXCJyZWdpc3Rlcl9hY3Rpb25cIjtcbiAgICB2YXIgdXNlcm5hbWUgPSBqUXVlcnkoXCIjc3QtdXNlcm5hbWVcIikudmFsKCk7XG4gICAgdmFyIG1haWxfaWQgPSBqUXVlcnkoXCIjc3QtZW1haWxcIikudmFsKCk7XG4gICAgdmFyIHBhc3N3cmQgPSBqUXVlcnkoXCIjc3QtcHN3XCIpLnZhbCgpO1xuICAgIHZhciB0ZXJtc0FuZENvbmRpdGlvbnMgPSAkKCcjc3QtdGVybXMtYW5kLWNvbmRpdGlvbnMnKS5wcm9wKFwiY2hlY2tlZFwiKTtcbiAgICB2YXIgZXJyb3JSZWdpc3RlckNvbnRhaW5lciA9ICQoJy5zaWduLXVwX19maXJzdC1zdGVwIC5lcnJvci1tZXNzYWdlJyk7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgdXJsOiBiaW9fdmFycy5hamF4VXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbWFpbF9pZDogbWFpbF9pZCxcbiAgICAgICAgcGFzc3dyZDogcGFzc3dyZCxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICB0ZXJtc0FuZENvbmRpdGlvbnM6IHRlcm1zQW5kQ29uZGl0aW9uc1xuICAgICAgfSxcbiAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIGJlZm9yZVNlbmQoKSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZXJyb3IgbWVzc2FnZSBmcm9tIHRoZSBwcmV2aW91cyBhdHRlbXB0XG4gICAgICAgIHZhciBsYWJlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc3QtcmVnaXN0ZXItZm9ybSBsYWJlbCcpO1xuICAgICAgICBsYWJlbHMuZm9yRWFjaChmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3N0LXJlZ2lzdGVyLWZvcm0gaW5wdXQnKTtcbiAgICAgICAgaW5wdXQuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgICB9KTsgLy8gYWRkIGxvYWRlciBidG4gc3VibWl0XG5cbiAgICAgICAgJCgnI3JlZ2lzdGVyLW1lJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3JlZ2lzdGVyLW1lJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgJCgnI3JlZ2lzdGVyLW1lJykuaHRtbCgnJyk7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhfcmVmKSB7XG4gICAgICAgIHZhciBkYXRhID0gX3JlZi5kYXRhO1xuICAgICAgICB2YXIgaGFzUmVnaXN0ZXIgPSBkYXRhLmhhc1JlZ2lzdGVyLFxuICAgICAgICAgICAgbWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcblxuICAgICAgICBpZiAoaGFzUmVnaXN0ZXIpIHtcbiAgICAgICAgICBoYW5kbGVDcmVhdGVVc2VyKG1haWxfaWQsIHBhc3N3cmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhbmRsZVZhbGlkYXRpb24oZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICQoJyNyZWdpc3Rlci1tZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjcmVnaXN0ZXItbWUnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAkKCcjcmVnaXN0ZXItbWUnKS5odG1sKCdSZWdpc3RyYXJzZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICB2YXIgaGFuZGxlVmFsaWRhdGlvbiA9IGZ1bmN0aW9uIGhhbmRsZVZhbGlkYXRpb24oZGF0YSkge1xuICAgIGlmIChkYXRhLnZhbGlkYXRpb24uZW1haWwgPT0gJ2Vycm9yJykge1xuICAgICAgJCgnI3N0LXJlZ2lzdGVyLWZvcm0gLmZpZWxkLWVtYWlsIGxhYmVsJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAkKCcjc3QtcmVnaXN0ZXItZm9ybSAuZmllbGQtZW1haWwgaW5wdXQnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS52YWxpZGF0aW9uLnBhc3N3b3JkID09ICdlcnJvcicpIHtcbiAgICAgICQoJyNzdC1yZWdpc3Rlci1mb3JtIC5maWVsZC1wYXNzd29yZCBsYWJlbCcpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgJCgnI3N0LXJlZ2lzdGVyLWZvcm0gLmZpZWxkLXBhc3N3b3JkIGlucHV0JykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEudmFsaWRhdGlvbi50ZXJtc0FuZENvbmRpdGlvbnMgPT0gJ2Vycm9yJykge1xuICAgICAgJCgnLnNpZ24tdXBfX3Rlcm1zLWFuZC1jb25kaXRpb25zLWNvcHknKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICB9XG5cbiAgICAkKCcjcmVnaXN0ZXItbWUnKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAkKCcjcmVnaXN0ZXItbWUnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICQoJyNyZWdpc3Rlci1tZScpLmh0bWwoJ1JlZ2lzdHJhcnNlJyk7XG4gICAgalF1ZXJ5KFwiI3N0LXJlZ2lzdGVyLWZvcm0gLmVycm9yLW1lc3NhZ2VcIikuaHRtbChkYXRhLm1lc3NhZ2UpO1xuICB9O1xuICAvKiAtLSBDcmVhdGUgVXNlciBBamF4ICsgTG9naW4gLS0gKi9cblxuXG4gIHZhciBoYW5kbGVDcmVhdGVVc2VyID0gZnVuY3Rpb24gaGFuZGxlQ3JlYXRlVXNlcihtYWlsX2lkLCBwYXNzd29yZCkge1xuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgIHVybDogYmlvX3ZhcnMuYWpheFVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYWN0aW9uOiBcImNyZWF0ZV91c2VyX2FjdGlvblwiLFxuICAgICAgICAvL2NhbGxzIHdwX2FqYXhfbm9wcml2X2FqYXhsb2dpblxuICAgICAgICBtYWlsX2lkOiBtYWlsX2lkLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmhhc1JlZ2lzdGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgalF1ZXJ5KFwiI3N0LXJlZ2lzdGVyLWZvcm0gLmVycm9yLW1lc3NhZ2VcIikuaHRtbCgnPHAgY2xhc3M9XCJzdWNjZXNzXCI+U2UgaGEgcmVnaXN0cmFkbyBjb3JyZWN0YW1lbnRlLCByZWRpcmVjY2lvbmFuZG8uLi48L3A+Jyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcjcmVnaXN0ZXItbWUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAkKCcjcmVnaXN0ZXItbWUnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICAgICQoJyNyZWdpc3Rlci1tZScpLmh0bWwoJ1JlZ2lzdHJhcnNlJyk7XG4gICAgICAgICAgalF1ZXJ5KFwiI3N0LXJlZ2lzdGVyLWZvcm0gLmVycm9yLW1lc3NhZ2VcIikuaHRtbChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGhhbmRsZUNyZWF0ZVVzZXInKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgLyogLS0gQ2hhbmdlIHN0YXRlIHBhc3N3b3JkIC0tICovXG5cblxuICBqUXVlcnkoXCIjanMtY2hhbmdlLXZpZXctcGFzc3dvcmRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGpRdWVyeShcIiNzdC1wc3dcIikuYXR0cihcInR5cGVcIikgPT0gXCJwYXNzd29yZFwiKSB7XG4gICAgICBqUXVlcnkoXCIjc3QtcHN3XCIpLmF0dHIoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgIGpRdWVyeShcIiNqcy1jaGFuZ2Utdmlldy1wYXNzd29yZFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgalF1ZXJ5KFwiI3N0LXBzd1wiKS5hdHRyKFwidHlwZVwiLCBcInBhc3N3b3JkXCIpO1xuICAgICAgalF1ZXJ5KFwiI2pzLWNoYW5nZS12aWV3LXBhc3N3b3JkXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfSk7XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuICAkKCcucmVzZXQtcGFzc3dvcmRfX2J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBhc3MxID0gJCgnI3Bhc3N3b3JkXzEnKS52YWwoKTtcbiAgICB2YXIgcGFzczIgPSAkKCcjcGFzc3dvcmRfMicpLnZhbCgpO1xuXG4gICAgaWYgKHBhc3MxICE9PSBwYXNzMikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJy53b29jb21tZXJjZS1SZXNldFBhc3N3b3JkIC5jbGVhcicpLmh0bWwoJzxwIGNsYXNzPVwibG9zdC1wYXNzd29yZC1tZXNzYWdlLWVycm9yIHRleHQtZGFuZ2VyIGQtbm9uZVwiPjxpbWcgc3JjPVwiL3dwLWNvbnRlbnQvdGhlbWVzL2Jpb2dlbmVzaXMtYmFnby9hc3NldHMvaW1nL2VsZW1lbnRzL2F0ZW50aW9uLnN2ZztcIj4gTG9zIGNhbXBvcyBkZSBjb250cmFzZcOxYSBubyBjb2luY2lkZW4uPC9wPicpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy53b29jb21tZXJjZS1SZXNldFBhc3N3b3JkIC5jbGVhciBwJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgfSwgODAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHsgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuICAvKiAtLS0gU2VsZWN0IFByb3ZpbmNlIC0gQ2hlY2tvdXQgKEFKQVgpIC0tLSAqL1xuICB2YXIgcHJvdmluY2VTZWxlY3QgPSAkKCcjYmlsbGluZ19kaXN0cmlidXRvcl9wcm92aW5jZScpO1xuICB2YXIgbG9jYWxpdHlTZWxlY3QgPSAkKCcjYmlsbGluZ19kaXN0cmlidXRvcl9sb2NhbGl0eScpO1xuICB2YXIgZGlzdHJpYnV0b3JTZWxlY3QgPSAkKCcjYmlsbGluZ19kaXN0cmlidXRvcicpO1xuICB2YXIgYWxsU2VsZWN0cyA9ICQoJy5qcy1kaXN0cmlidXRvci1zZWxlY3QnKS5maW5kKCdzZWxlY3QnKTsgLy8gQWRkIE9wdGlvbnMgSGlkZGVuIEZvciBFYWNoIFNlbGVjdHNcblxuICBhbGxTZWxlY3RzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJykuYXR0cignaGlkZGVuJywgdHJ1ZSk7XG4gICAgJCh0aGlzKS5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQnKS5hdHRyKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgICQodGhpcykuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJykuYXR0cigndmFsdWUnLCAnJyk7XG4gIH0pOyAvLyBEaXNhYmxlZCBTZWxlY3RzIGlmIGV4aXN0IGRlZmF1bHQgZGlzdHJpYnV0aXMgcHJvcHNcblxuICBpZiAoJCgnLm1hcCcpLmhhc0NsYXNzKCdqcy1tYXAtZGlzYWJsZS1zZWxlY3RzJykpIHtcbiAgICBsb2NhbGl0eVNlbGVjdC5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIGRpc3RyaWJ1dG9yU2VsZWN0LmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gIH1cblxuICB2YXIgc2VsZWN0SXNEaXNhYmxlZCA9IHRydWU7XG4gIHByb3ZpbmNlU2VsZWN0Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWN0aW9uID0gXCJzZWxlY3RfcHJvdmluY2VfYWN0aW9uXCI7XG4gICAgdmFyIHByb3ZpbmNlID0gJCh0aGlzKS52YWwoKTtcbiAgICB2YXIgbG9jYWxpdHkgPSBsb2NhbGl0eVNlbGVjdC52YWwoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICB1cmw6IGJpb192YXJzLmFqYXhVcmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICBwcm92aW5jZTogcHJvdmluY2UsXG4gICAgICAgIGxvY2FsaXR5OiBsb2NhbGl0eSxcbiAgICAgICAgc2VsZWN0SXNEaXNhYmxlZDogc2VsZWN0SXNEaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoX3JlZikge1xuICAgICAgICB2YXIgZGF0YSA9IF9yZWYuZGF0YTtcbiAgICAgICAgdmFyIGhhc0xvY2FsaXRpZXMgPSBkYXRhLmhhc0xvY2FsaXRpZXMsXG4gICAgICAgICAgICBhbGxMb2NhbGl0aWVzID0gZGF0YS5hbGxMb2NhbGl0aWVzLFxuICAgICAgICAgICAgZGlzYWJsZWREaXN0cmlidXRvclNlbGVjdCA9IGRhdGEuZGlzYWJsZWREaXN0cmlidXRvclNlbGVjdDtcblxuICAgICAgICBpZiAoaGFzTG9jYWxpdGllcykge1xuICAgICAgICAgIHJlbmRlck9wdGlvblNlbGVjdChhbGxMb2NhbGl0aWVzLCBsb2NhbGl0eVNlbGVjdCwgJ0xvY2FsaWRhZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkaXNhYmxlZERpc3RyaWJ1dG9yU2VsZWN0KSB7XG4gICAgICAgICAgZGlzdHJpYnV0b3JTZWxlY3QuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICBkaXN0cmlidXRvclNlbGVjdC5odG1sKCcnKTtcbiAgICAgICAgICBkaXN0cmlidXRvclNlbGVjdC5hcHBlbmQoXCI8b3B0aW9uIGhpZGRlbiB2YWx1ZT0nJz5WZXRlcmluYXJpYTwvb3B0aW9uPlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdElzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgLyogLS0tIFNlbGVjdCBMb2NhbGl0eSAtIENoZWNrb3V0IChBSkFYKSAtLS0gKi9cblxuICBsb2NhbGl0eVNlbGVjdC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFjdGlvbiA9IFwic2VsZWN0X2xvY2FsaXR5X2FjdGlvblwiO1xuICAgIHZhciBsb2NhbGl0eSA9ICQodGhpcykudmFsKCk7XG4gICAgdmFyIHByb3ZpbmNlID0gcHJvdmluY2VTZWxlY3QudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgdXJsOiBiaW9fdmFycy5hamF4VXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgbG9jYWxpdHk6IGxvY2FsaXR5LFxuICAgICAgICBwcm92aW5jZTogcHJvdmluY2VcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKF9yZWYyKSB7XG4gICAgICAgIHZhciBkYXRhID0gX3JlZjIuZGF0YTtcbiAgICAgICAgdmFyIGFsbERpc3RyaWJ1dG9yID0gZGF0YS5hbGxEaXN0cmlidXRvcixcbiAgICAgICAgICAgIGhhc0Rpc3RyaWJ1dG9yID0gZGF0YS5oYXNEaXN0cmlidXRvcjtcblxuICAgICAgICBpZiAoaGFzRGlzdHJpYnV0b3IpIHtcbiAgICAgICAgICByZW5kZXJPcHRpb25TZWxlY3QoYWxsRGlzdHJpYnV0b3IsIGRpc3RyaWJ1dG9yU2VsZWN0LCAnVmV0ZXJpbmFyaWEnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pOyAvLyBDbGVhbiB0aGUgc2VsZWN0IGFuZCByZW5kZXIgb3B0aW9ucyB3aXRoaW4gaXRcblxuICB2YXIgcmVuZGVyT3B0aW9uU2VsZWN0ID0gZnVuY3Rpb24gcmVuZGVyT3B0aW9uU2VsZWN0KG9wdGlvbnMsIHNlbGVjdCwgbmFtZSkge1xuICAgIHZhciB1bmlxdWVPcHRpb25zID0gX3RvQ29uc3VtYWJsZUFycmF5KG5ldyBTZXQob3B0aW9ucy5zb3J0KCkpKTsgLy8gUmFuZG9taXplIERpc3RyaWJ1dG9yIE9wdGlvbnMgb24gZWFjaCByZW5kZXJcblxuXG4gICAgaWYgKHNlbGVjdCA9PSBkaXN0cmlidXRvclNlbGVjdCkge1xuICAgICAgdmFyIG9yaWdpbmFsID0gb3B0aW9ucztcbiAgICAgIHZhciBjb3B5ID0gW10uY29uY2F0KG9yaWdpbmFsKTtcbiAgICAgIGNvcHkuc29ydChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAwLjUgLSBNYXRoLnJhbmRvbSgpO1xuICAgICAgfSk7XG4gICAgICB1bmlxdWVPcHRpb25zID0gY29weTtcbiAgICB9XG5cbiAgICBzZWxlY3QuaHRtbCgnJyk7XG4gICAgc2VsZWN0LmFwcGVuZChcIjxvcHRpb24gaGlkZGVuIHNlbGVjdGVkIHZhbHVlPScnPlwiLmNvbmNhdChuYW1lLCBcIjwvb3B0aW9uPlwiKSk7XG4gICAgdW5pcXVlT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgIHZhciBvcHRpb25XcmFwcGVyID0gXCI8b3B0aW9uIHZhbHVlPVxcXCJcIi5jb25jYXQob3B0aW9uLCBcIlxcXCI+XCIpLmNvbmNhdChvcHRpb24sIFwiPC9vcHRpb24+XCIpO1xuICAgICAgc2VsZWN0LmFwcGVuZChvcHRpb25XcmFwcGVyKTtcbiAgICB9KTtcbiAgICBzZWxlY3QuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gIH07XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBGaWxlIHNraXAtbGluay1mb2N1cy1maXguanMuXG4gKlxuICogSGVscHMgd2l0aCBhY2Nlc3NpYmlsaXR5IGZvciBrZXlib2FyZCBvbmx5IHVzZXJzLlxuICpcbiAqIExlYXJuIG1vcmU6IGh0dHBzOi8vZ2l0LmlvL3ZXZHIyXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBpc0llID0gLyh0cmlkZW50fG1zaWUpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBpZiAoaXNJZSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGlkID0gbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSksXG4gICAgICAgICAgZWxlbWVudDtcblxuICAgICAgaWYgKCEvXltBLXowLTlfLV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBpZiAoIS9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaS50ZXN0KGVsZW1lbnQudGFnTmFtZSkpIHtcbiAgICAgICAgICBlbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG59KSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307IHJldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH0sIGU6IGZ1bmN0aW9uIGUoX2UpIHsgdGhyb3cgX2U7IH0sIGY6IEYgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gdmFyIG5vcm1hbENvbXBsZXRpb24gPSB0cnVlLCBkaWRFcnIgPSBmYWxzZSwgZXJyOyByZXR1cm4geyBzOiBmdW5jdGlvbiBzKCkgeyBpdCA9IG9bU3ltYm9sLml0ZXJhdG9yXSgpOyB9LCBuOiBmdW5jdGlvbiBuKCkgeyB2YXIgc3RlcCA9IGl0Lm5leHQoKTsgbm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTsgcmV0dXJuIHN0ZXA7IH0sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7IGRpZEVyciA9IHRydWU7IGVyciA9IF9lMjsgfSwgZjogZnVuY3Rpb24gZigpIHsgdHJ5IHsgaWYgKCFub3JtYWxDb21wbGV0aW9uICYmIGl0W1wicmV0dXJuXCJdICE9IG51bGwpIGl0W1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChkaWRFcnIpIHRocm93IGVycjsgfSB9IH07IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBzdmcgc3BhY2luZyB3aXRoaW4gaXQncyB2aWV3Ym94XG4gKi9cbnZhciBzdmdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLXN2Zy1jZW50ZXItcGF0aFwiKSxcbiAgICBtZWFzdXJlbWVudCA9IDEwMjQ7XG5cbnZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihzdmdzKSxcbiAgICBfc3RlcDtcblxudHJ5IHtcbiAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICB2YXIgc3ZnID0gX3N0ZXAudmFsdWU7XG4gICAgdmFyIHBhdGhzID0gc3ZnLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXRoJyk7XG5cbiAgICB2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHBhdGhzKSxcbiAgICAgICAgX3N0ZXAyO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoX2l0ZXJhdG9yMi5zKCk7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uKCkpLmRvbmU7KSB7XG4gICAgICAgIHZhciBwYXRoID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICB2YXIgYmJveCA9IHBhdGguZ2V0QkJveCgpLFxuICAgICAgICAgICAgdHJhbnNmb3JteCA9IChtZWFzdXJlbWVudCAtIGJib3gud2lkdGgpIC8gMiAtIGJib3gueCxcbiAgICAgICAgICAgIHRyYW5zZm9ybXkgPSAobWVhc3VyZW1lbnQgLSBiYm94LmhlaWdodCkgLyAyIC0gYmJveC55O1xuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAndHJhbnNmb3JtOnRyYW5zbGF0ZVgoJyArIHRyYW5zZm9ybXggKyAncHgpIHRyYW5zbGF0ZVkoJyArIHRyYW5zZm9ybXkgKyAncHgpOycpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2l0ZXJhdG9yMi5lKGVycik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIF9pdGVyYXRvcjIuZigpO1xuICAgIH1cbiAgfVxufSBjYXRjaCAoZXJyKSB7XG4gIF9pdGVyYXRvci5lKGVycik7XG59IGZpbmFsbHkge1xuICBfaXRlcmF0b3IuZigpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuKiAgIFRoaXMgY29udGVudCBpcyBsaWNlbnNlZCBhY2NvcmRpbmcgdG8gdGhlIFczQyBTb2Z0d2FyZSBMaWNlbnNlIGF0XG4qICAgaHR0cHM6Ly93d3cudzMub3JnL0NvbnNvcnRpdW0vTGVnYWwvMjAxNS9jb3B5cmlnaHQtc29mdHdhcmUtYW5kLWRvY3VtZW50XG4qL1xuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRhYmxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYmxpc3RcIl0nKSxcbiAgICAgIGksXG4gICAgICBrZXlzID0ge1xuICAgIGVuZDogMzUsXG4gICAgaG9tZTogMzYsXG4gICAgbGVmdDogMzcsXG4gICAgdXA6IDM4LFxuICAgIHJpZ2h0OiAzOSxcbiAgICBkb3duOiA0MCxcbiAgICBcImRlbGV0ZVwiOiA0NixcbiAgICBlbnRlcjogMTMsXG4gICAgc3BhY2U6IDMyXG4gIH0sXG4gICAgICBkaXJlY3Rpb24gPSB7XG4gICAgMzc6IC0xLFxuICAgIDM4OiAtMSxcbiAgICAzOTogMSxcbiAgICA0MDogMVxuICB9LFxuICAgICAgdGltaW5nID0gMjAwO1xuICB0YWJsaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICB2YXIgc2VsZiA9IGl0ZW0sXG4gICAgICAgIHRhYnMgPSBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyksXG4gICAgICAgIHBhbmVscyA9IGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpLFxuICAgICAgICBwYW5lbENvbnRhaW5lciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnBhbmVsLWNvbnRhaW5lcicpLFxuICAgICAgICB1bmRlcmxpbmUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdW5kZXJsaW5lJyksXG4gICAgICAgIHZlcnRpY2FsID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtb3JpZW50YXRpb24nKSA9PSAndmVydGljYWwnO1xuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnanMtYWN0aXZlJyk7XG4gICAgdGFicy5mb3JFYWNoKGZ1bmN0aW9uICh0YWIsIGkpIHtcbiAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrRXZlbnRMaXN0ZW5lcik7XG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25FdmVudExpc3RlbmVyKTtcbiAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleXVwRXZlbnRMaXN0ZW5lcik7IC8vIEJ1aWxkIGFuIGFycmF5IHdpdGggYWxsIHRhYnMgKDxidXR0b24+cykgaW4gaXRcblxuICAgICAgdGFiLmluZGV4ID0gaTtcbiAgICB9KTtcbiAgICBwYW5lbHMuZm9yRWFjaChmdW5jdGlvbiAocGFuZWwsIGkpIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJ2hpZGRlbicpO1xuICAgIH0pOyAvLyBXaGVuIGEgdGFiIGlzIGNsaWNrZWQsIGFjdGl2YXRlVGFiIGlzIGZpcmVkIHRvIGFjdGl2YXRlIGl0XG5cbiAgICBmdW5jdGlvbiBjbGlja0V2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgIHZhciB0YWIgPSBldmVudC50YXJnZXQ7XG4gICAgICBhY3RpdmF0ZVRhYih0YWIsIHRydWUpO1xuICAgIH1cblxuICAgIDsgLy8gQWN0aXZhdGVzIGFueSBnaXZlbiB0YWIgcGFuZWxcblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlVGFiKHRhYiwgc2V0Rm9jdXMpIHtcbiAgICAgIHNldEZvY3VzID0gc2V0Rm9jdXMgfHwgZmFsc2U7IC8vIEdldCB0aGUgdmFsdWUgb2YgYXJpYS1jb250cm9scyAod2hpY2ggaXMgYW4gSUQpXG5cbiAgICAgIHZhciBjb250cm9scyA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTsgLy8gRGVhY3RpdmF0ZSBhbGwgb3RoZXIgdGFic1xuXG4gICAgICBkZWFjdGl2YXRlVGFicyhjb250cm9scyk7IC8vIFJlbW92ZSB0YWJpbmRleCBhdHRyaWJ1dGVcblxuICAgICAgdGFiLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTsgLy8gU2V0IHRoZSB0YWIgYXMgc2VsZWN0ZWRcblxuICAgICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIGlmICh1bmRlcmxpbmUpIHtcbiAgICAgICAgdW5kZXJsaW5lLnN0eWxlLmxlZnQgPSB0YWIub2Zmc2V0TGVmdCArICdweCc7XG4gICAgICAgIHVuZGVybGluZS5zdHlsZS53aWR0aCA9IHRhYi5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICB9IC8vIFJlbW92ZSBoaWRkZW4gYXR0cmlidXRlIGZyb20gdGFiIHBhbmVsIHRvIG1ha2UgaXQgdmlzaWJsZVxuXG5cbiAgICAgIHZhciBhY3RpdmVUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250cm9scyk7XG4gICAgICBhY3RpdmVUYWIucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICAgIHBhbmVsQ29udGFpbmVyLnN0eWxlLm1pbkhlaWdodCA9IGFjdGl2ZVRhYi5vZmZzZXRIZWlnaHQgKyAncHgnOyAvL2dzYXAudG8oIHBhbmVsQ29udGFpbmVyLCB7IGhlaWdodDogKCBhY3RpdmVUYWIub2Zmc2V0SGVpZ2h0ICksIGR1cmF0aW9uOiB0aW1pbmcvMTAwIH0gKTtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFjdGl2ZVRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb24nKTtcbiAgICAgIH0sIHRpbWluZyk7IC8vIFNldCBmb2N1cyB3aGVuIHJlcXVpcmVkXG5cbiAgICAgIGlmIChzZXRGb2N1cykge1xuICAgICAgICB0YWIuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgO1xuICAgIH1cblxuICAgIDsgLy8gRGVhY3RpdmF0ZSBhbGwgdGFicyBhbmQgdGFiIHBhbmVsc1xuXG4gICAgZnVuY3Rpb24gZGVhY3RpdmF0ZVRhYnMoaWdub3JlKSB7XG4gICAgICB0YWJzLmZvckVhY2goZnVuY3Rpb24gKHRhYiwgaSkge1xuICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICB9KTtcbiAgICAgIHBhbmVscy5mb3JFYWNoKGZ1bmN0aW9uIChwYW5lbCwgaSkge1xuICAgICAgICBpZiAocGFuZWwuZ2V0QXR0cmlidXRlKCdpZCcpICE9PSBpZ25vcmUpIHtcbiAgICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uJyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICdoaWRkZW4nKTtcbiAgICAgICAgICB9LCB0aW1pbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICA7XG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG5cbiAgICBpZiAoJycgIT09IGhhc2ggJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCkuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICd0YWInKSB7XG4gICAgICBhY3RpdmF0ZVRhYihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmF0ZVRhYih0YWJzWzBdLCBmYWxzZSk7XG4gICAgfSAvLyBIYW5kbGUga2V5ZG93biBvbiB0YWJzXG5cblxuICAgIGZ1bmN0aW9uIGtleWRvd25FdmVudExpc3RlbmVyKGV2ZW50KSB7XG4gICAgICB2YXIga2V5ID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBrZXlzLmVuZDpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBBY3RpdmF0ZSBsYXN0IHRhYlxuXG4gICAgICAgICAgZm9jdXNMYXN0VGFiKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBrZXlzLmhvbWU6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gQWN0aXZhdGUgZmlyc3QgdGFiXG5cbiAgICAgICAgICBmb2N1c0ZpcnN0VGFiKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFVwIGFuZCBkb3duIGFyZSBpbiBrZXlkb3duXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBwcmV2ZW50IHBhZ2Ugc2Nyb2xsID46KVxuXG4gICAgICAgIGNhc2Uga2V5cy51cDpcbiAgICAgICAgY2FzZSBrZXlzLmRvd246XG4gICAgICAgICAgZGV0ZXJtaW5lT3JpZW50YXRpb24oZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICA7XG4gICAgfVxuXG4gICAgOyAvLyBIYW5kbGUga2V5dXAgb24gdGFic1xuXG4gICAgZnVuY3Rpb24ga2V5dXBFdmVudExpc3RlbmVyKGV2ZW50KSB7XG4gICAgICB2YXIga2V5ID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBrZXlzLmxlZnQ6XG4gICAgICAgIGNhc2Uga2V5cy5yaWdodDpcbiAgICAgICAgICBkZXRlcm1pbmVPcmllbnRhdGlvbihldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBrZXlzW1wiZGVsZXRlXCJdOlxuICAgICAgICAgIGRldGVybWluZURlbGV0YWJsZShldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBrZXlzLmVudGVyOlxuICAgICAgICBjYXNlIGtleXMuc3BhY2U6XG4gICAgICAgICAgYWN0aXZhdGVUYWIoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgO1xuICAgIH1cblxuICAgIDsgLy8gV2hlbiBhIHRhYmxpc3TDouKCrOKEonMgYXJpYS1vcmllbnRhdGlvbiBpcyBzZXQgdG8gdmVydGljYWwsXG4gICAgLy8gb25seSB1cCBhbmQgZG93biBhcnJvdyBzaG91bGQgZnVuY3Rpb24uXG4gICAgLy8gSW4gYWxsIG90aGVyIGNhc2VzIG9ubHkgbGVmdCBhbmQgcmlnaHQgYXJyb3cgZnVuY3Rpb24uXG5cbiAgICBmdW5jdGlvbiBkZXRlcm1pbmVPcmllbnRhdGlvbihldmVudCkge1xuICAgICAgdmFyIGtleSA9IGV2ZW50LmtleUNvZGU7XG4gICAgICB2YXIgcHJvY2VlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAodmVydGljYWwpIHtcbiAgICAgICAgaWYgKGtleSA9PT0ga2V5cy51cCB8fCBrZXkgPT09IGtleXMuZG93bikge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcHJvY2VlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoa2V5ID09PSBrZXlzLmxlZnQgfHwga2V5ID09PSBrZXlzLnJpZ2h0KSB7XG4gICAgICAgICAgcHJvY2VlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICA7XG4gICAgICB9XG5cbiAgICAgIDtcblxuICAgICAgaWYgKHByb2NlZWQpIHtcbiAgICAgICAgc3dpdGNoVGFiT25BcnJvd1ByZXNzKGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgO1xuICAgIH1cblxuICAgIDsgLy8gRWl0aGVyIGZvY3VzIHRoZSBuZXh0LCBwcmV2aW91cywgZmlyc3QsIG9yIGxhc3QgdGFiXG4gICAgLy8gZGVwZW5kaW5nIG9uIGtleSBwcmVzc2VkXG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hUYWJPbkFycm93UHJlc3MoZXZlbnQpIHtcbiAgICAgIHZhciBwcmVzc2VkID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgaWYgKGRpcmVjdGlvbltwcmVzc2VkXSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIGlmICh0YXJnZXQuaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh0YWJzW3RhcmdldC5pbmRleCArIGRpcmVjdGlvbltwcmVzc2VkXV0pIHtcbiAgICAgICAgICAgIHRhYnNbdGFyZ2V0LmluZGV4ICsgZGlyZWN0aW9uW3ByZXNzZWRdXS5mb2N1cygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJlc3NlZCA9PT0ga2V5cy5sZWZ0IHx8IHByZXNzZWQgPT09IGtleXMudXApIHtcbiAgICAgICAgICAgIGZvY3VzTGFzdFRhYigpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJlc3NlZCA9PT0ga2V5cy5yaWdodCB8fCBwcmVzc2VkID09IGtleXMuZG93bikge1xuICAgICAgICAgICAgZm9jdXNGaXJzdFRhYigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDtcbiAgICAgICAgfVxuXG4gICAgICAgIDtcbiAgICAgIH1cblxuICAgICAgO1xuICAgIH1cblxuICAgIDsgLy8gTWFrZSBhIGd1ZXNzXG5cbiAgICBmdW5jdGlvbiBmb2N1c0ZpcnN0VGFiKCkge1xuICAgICAgdGFic1swXS5mb2N1cygpO1xuICAgIH1cblxuICAgIDsgLy8gTWFrZSBhIGd1ZXNzXG5cbiAgICBmdW5jdGlvbiBmb2N1c0xhc3RUYWIoKSB7XG4gICAgICB0YWJzW3RhYnMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICA7XG4gIH0pO1xufSkoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICQoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICB0YWcuc3JjID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCI7XG4gICAgdmFyIGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuICB9KTtcbn0pKGpRdWVyeSk7XG5cbmZ1bmN0aW9uIG9uWW91VHViZUlmcmFtZUFQSVJlYWR5KCkge1xuICBqUXVlcnkoJy55b3V0dWJlLWJhY2tncm91bmQtdmlkZW8nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmlkZW8gPSBqUXVlcnkodGhpcykuZGF0YSgndmlkZW8nKSxcbiAgICAgICAgaWQgPSBqUXVlcnkodGhpcykuYXR0cignaWQnKSxcbiAgICAgICAgcGxheWVyID0gbmV3IFlULlBsYXllcihpZCwge1xuICAgICAgaGVpZ2h0OiAnMzYwJyxcbiAgICAgIHdpZHRoOiAnNjQwJyxcbiAgICAgIHZpZGVvSWQ6IHZpZGVvLFxuICAgICAgcGxheWVyVmFyczoge1xuICAgICAgICAnY29udHJvbHMnOiAwLFxuICAgICAgICAnc2hvd2luZm8nOiAwLFxuICAgICAgICAncmVsJzogMCxcbiAgICAgICAgJ2VuYWJsZWpzYXBpJzogMSxcbiAgICAgICAgJ2F1dG9wbGF5JzogMSxcbiAgICAgICAgJ2xvb3AnOiAxLFxuICAgICAgICAnd21vZGUnOiAndHJhbnNwYXJlbnQnXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgICdvblJlYWR5JzogZnVuY3Rpb24gb25SZWFkeShlKSB7XG4gICAgICAgICAgZS50YXJnZXQucGxheVZpZGVvKCk7XG4gICAgICAgICAgZS50YXJnZXQubXV0ZSgpO1xuICAgICAgICAgIGUudGFyZ2V0LnNldFBsYXliYWNrUXVhbGl0eSgnaGQ3MjAnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogZnVuY3Rpb24gb25TdGF0ZUNoYW5nZShlKSB7XG4gICAgICAgICAgaWYgKGUuZGF0YSA9PT0gWVQuUGxheWVyU3RhdGUuRU5ERUQpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnBsYXlWaWRlbygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuKGZ1bmN0aW9uICgkKSB7XG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQoXCIudmlkZW8tYnV0dG9uXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAkKHRoaXMpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICB0eXBlOiAnaWZyYW1lJyxcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICBzcmM6IGJ1dHRvbi5kYXRhKCd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pKGpRdWVyeSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQW5pbWF0aW9ucyBhcmUgbGFzdCB0byBtYWtlIHN1cmUgb3RoZXIgZWZmZWN0cyBvciBtb3ZlbWVudCBoYXBwZW4gZmlyc3QgYXMgaGVpZ2h0IGNhbGN1bGF0aW9ucyBjYW4gYWZmZWN0IHRoaXNcbiAqL1xuLy90aGlzIHJlbW92ZXMgb3VyIGZhbGxiYWNrIGNzcyBhbmltYXRpb25zIC0gZWFjaCBtb2R1bGUgc2hvdWxkIGhhdmUgYSBmYWxsYmFjayBhbmltYXRpb24gdG8gc2V0IGl0cyBvcGFjaXR5IHRvIDFcbnZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1qcycpO1xuXG4oZnVuY3Rpb24gKCQpIHtcbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgLy8gRmFkZSBJbiBVcFxuICAgIHZhciBmYWRlSW5VcCA9ICQoJy5qcy1mYWRlLWluLXVwJyk7XG4gICAgZmFkZUluVXAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgJCh0aGlzKS53YXlwb2ludCh7XG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgYW5pbWUoe1xuICAgICAgICAgICAgdGFyZ2V0czogJHNlbGZbMF0sXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBbMTAwLCAwXSxcbiAgICAgICAgICAgIG9wYWNpdHk6IFswLCAxXSxcbiAgICAgICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YWQnLFxuICAgICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICAgIGRlbGF5OiBhbmltZS5zdGFnZ2VyKDEwMCwge1xuICAgICAgICAgICAgICBzdGFydDogMzAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9LFxuICAgICAgICBvZmZzZXQ6IFwiMTAwJVwiXG4gICAgICB9KTtcbiAgICB9KTsgLy8gRmFkZSBJbiBVcCAtIEl0ZW1zXG5cbiAgICB2YXIgZmFkZUluVXBJdGVtc0NvbnRhaW5lciA9ICQoJy5qcy1mYWRlLWluLXVwLWl0ZW1zLWNvbnRhaW5lcicpO1xuICAgIGZhZGVJblVwSXRlbXNDb250YWluZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgJCh0aGlzKS53YXlwb2ludCh7XG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgYW5pbWUoe1xuICAgICAgICAgICAgdGFyZ2V0czogJHNlbGZbMF0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZhZGUtaW4tdXAtaXRlbScpLFxuICAgICAgICAgICAgdHJhbnNsYXRlWTogWzEwMCwgMF0sXG4gICAgICAgICAgICBvcGFjaXR5OiBbMCwgMV0sXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFkJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICBkZWxheTogYW5pbWUuc3RhZ2dlcigxMDAsIHtcbiAgICAgICAgICAgICAgc3RhcnQ6IDUwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0OiBcIjEwMCVcIlxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSkoalF1ZXJ5KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
