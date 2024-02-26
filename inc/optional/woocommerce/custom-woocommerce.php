<?php
/* Custom Woo Comerce
    1. General
    2. Product Single
        2.1 Product Summary
        2.2 Related Products
    3. Cart
    4. Checkout
    5. User interaction
    6. My Profile
    7. Reset Password strength
*/

/* --- 1. General --- */

// Add Custom Fields Products - Section Product Data Woocommerce
function cf_section_product_data()
{
}

// Disable all payment method
add_filter ('woocommerce_cart_needs_payment', '__return_false');


/* --- 3. Cart --- */

// Remove variation name from title
add_filter( 'woocommerce_product_variation_title_include_attributes', '__return_false' );

// "Volver al Shop" redirect to Homepage
add_filter( 'woocommerce_return_to_shop_redirect', 'st_woocommerce_shop_url' );
function st_woocommerce_shop_url(){
    return site_url() ;
}

// Dispplay "Dosis por Frasco" in Cart
add_filter( 'woocommerce_get_item_data', 'display_custom_field_as_item_data', 20, 2 );
function display_custom_field_as_item_data( $cart_data, $cart_item ) {
    if( $value = get_post_meta( $cart_item['data']->get_id(), 'custom_field', true ) ){
        $cart_data[] = array(
            'label' => __( 'DosisFrasco', 'woocommerce' ),
            'value' => sanitize_text_field( $value . ' Dosis por frasco')
        );
    }

    return $cart_data;
}

// Remove Notices
add_filter('woocommerce_cart_item_removed_notice_type', '__return_null');

/* --- 4. Checkout  --- */


// Remove Billing (Facturación) label from error
function remove_billing_label_from_error( $error ) {
  if ( strpos( $error, 'Facturación ' ) !== false ) {
      $error = str_replace("Facturación", "", $error);
  }
  return $error;
}
add_filter( 'woocommerce_add_error', 'remove_billing_label_from_error' );

// Remove Coupoun Section 
remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 ); 


/* --- User interaction --- */

// After Lost Password email input > Redirect to Login
function custom_process_lost_password() {
	if ( isset( $_POST['wc_reset_password'], $_POST['user_login'] ) ) {
		$nonce_value = wc_get_var( $_REQUEST['woocommerce-lost-password-nonce'], wc_get_var( $_REQUEST['_wpnonce'], '' ) ); // @codingStandardsIgnoreLine.

		if ( ! wp_verify_nonce( $nonce_value, 'lost_password' ) ) {
			return;
		}

		$success = WC_Shortcode_My_Account::retrieve_password();

		if ( $success ) {
			$redirect_url = get_permalink( get_page_by_path( 'recuperar-contrasena' ) );
			wp_redirect($redirect_url);
			exit;
		}
	}
}
add_action( 'wp_loaded', 'custom_process_lost_password', 19 );

// After password reset > Redirect to Homepage
/*function lost_password_redirect() {
    $redirect_home = get_site_url();
    wp_redirect($redirect_home);
    exit;
}
add_action('after_password_reset', 'lost_password_redirect');*/
function woocommerce_new_pass_redirect( $user ) {
    $redirect_home = get_home_url();
    wp_redirect( get_site_url());
    exit;
  }
  
add_action( 'woocommerce_customer_reset_password', 'woocommerce_new_pass_redirect' );


/* --- 6. My Profile  --- */

/**
 * Menu My Account
 */
require get_template_directory() . '/inc/optional/woocommerce/custom-my-account-menu.php';

/**
 * Orders Table
 */
require get_template_directory() . '/inc/optional/woocommerce/custom-my-account-orders-table.php';


/**
 * Filter Products
 */
require get_template_directory() . '/inc/optional/woocommerce/custom-filter-products.php';



add_action('admin_head', 'admin_product_custom_css');

function admin_product_custom_css() {
  echo '<style>
    .woocommerce_variable_attributes .upload_image,
    .woocommerce_variable_attributes .variable_sku0_field,
    .woocommerce_variable_attributes .variable_sku1_field,
    .woocommerce_variable_attributes .variable_sku2_field,
    .woocommerce_variable_attributes .variable_sku3_field,
    .woocommerce_variable_attributes .options,
    .woocommerce_variable_attributes .variable_sale_price0_field,
    .woocommerce_variable_attributes .variable_sale_price1_field,
    .woocommerce_variable_attributes .variable_sale_price2_field,
    .woocommerce_variable_attributes .variable_sale_price3_field,
    .woocommerce_variable_attributes .variable_stock_status,
    .woocommerce_variable_attributes .variable_weight0_field,
    .woocommerce_variable_attributes .variable_weight1_field,
    .woocommerce_variable_attributes .variable_weight2_field,
    .woocommerce_variable_attributes .variable_weight3_field,
    .woocommerce_variable_attributes .hide_if_variation_virtual,
    .woocommerce_variable_attributes .variable_description0_field, 
    .woocommerce_variable_attributes .variable_description1_field, 
    .woocommerce_variable_attributes .variable_description2_field, 
    .woocommerce_variable_attributes .variable_description3_field, 
    #postexcerpt .wp-editor-tools {
        display: none !important;
    }
    .woocommerce_variable_attributes .variable_regular_price_0_field,
    .woocommerce_variable_attributes .variable_regular_price_1_field,
    .woocommerce_variable_attributes .variable_regular_price_2_field,
    .woocommerce_variable_attributes .variable_regular_price_3_field {
        width: 100%;
    }
    span.inline {
        display: none;
    }
    [data-slug="woo-order-export-lite"] {
        display: none;
    }
    </style>';
}



add_action( 'current_screen', function( $screen ) {

	if ( empty( $screen->id ) ) return;

	$exluded_post_types = ['product'];
	$post_type          = isset( $screen->post_type ) ? $screen->post_type : '';

	// Stop when the post type isn't excluded.
	if ( ! in_array( $post_type, $exluded_post_types, true ) ) return;

	add_filter( 'manage_' . $screen->id . '_columns', function( $columns ) {
		unset( $columns['tsf-quick-edit'] );
		return $columns;
	}, 11 );
} );


/* Cambiar nivel de fortaleza de contraseñas en WooCommerce
 * Ajustes de fortaleza
 * 4 = Fuerte
 * 3 = Medio (por defecto) 
 * 2 = Débil pero algo más fuerte 
 * 1 = Débil
 * 0 = Muy débil / cualquier cosa
 */
add_filter( 'woocommerce_min_password_strength', 'ayudawp_cambiar_nivel_claves_wc' );
function ayudawp_cambiar_nivel_claves_wc( $strength ) {
    return 0;
}

add_filter( 'password_hint', function( $hint ) {
    return __('Para mayor seguridad te sugerimos que generes una contraseña de al menos 6 caracteres, realizando una combinación de números y letras.');
});

add_action( 'wp_enqueue_scripts',  'misha_password_messages', 9999 );
function misha_password_messages() {
	wp_localize_script( 
		'wc-password-strength-meter', 
		'pwsL10n', 
		array(
			'short' => 'Débil',
			'bad' => 'Pobre',
			'good' => 'Buena',
			'strong' => 'Fuerte',
			'mismatch' => 'Sus contraseñas no coinciden, por favor, vuelva a introducirlas.'
		)
	);   
}