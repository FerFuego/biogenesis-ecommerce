<?php

// After Checkout > Redirect to HomePage + Empty Cart
add_action( 'template_redirect', 'woocommerce_redirect_after_checkout' );
function woocommerce_redirect_after_checkout() {
    global $wp;
    if ( is_checkout() && ! empty( $wp->query_vars['order-received'] ) ) {
        $redirect_url = get_site_url();
        WC()->cart->empty_cart();
        wp_redirect($redirect_url);
        exit;
    }
}


?>