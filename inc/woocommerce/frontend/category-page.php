<?php

// Product category archive pages > Redirect to shop
add_action( 'template_redirect', 'wc_redirect_to_shop');
function wc_redirect_to_shop() {
    if ( is_product_category() ) {
        wp_redirect( wc_get_page_permalink( 'shop' ) );
        exit();
    }
}

?>