<?php

// Remove Breadcrumb
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );

// Move category display up
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 3 );

// Make item purchasable even without price
add_filter('woocommerce_is_purchasable', '__return_TRUE');

// Replace Select with Radio Buttons
function variation_radio_buttons($html, $args) {
    $args = wp_parse_args(apply_filters('woocommerce_dropdown_variation_attribute_options_args', $args), array(
      'options'          => false,
      'attribute'        => false,
      'product'          => false,
      'selected'         => false,
      'name'             => '',
      'id'               => '',
      'class'            => '',
      'show_option_none' => __('Choose an option', 'woocommerce'),
    ));
  
    if(false === $args['selected'] && $args['attribute'] && $args['product'] instanceof WC_Product) {
      $selected_key     = 'attribute_'.sanitize_title($args['attribute']);
      $args['selected'] = isset($_REQUEST[$selected_key]) ? wc_clean(wp_unslash($_REQUEST[$selected_key])) : $args['product']->get_variation_default_attribute($args['attribute']);
    }
  
    $options               = $args['options'];
    $product               = $args['product'];
    $attribute             = $args['attribute'];
    $name                  = $args['name'] ? $args['name'] : 'attribute_'.sanitize_title($attribute);
    $id                    = $args['id'] ? $args['id'] : sanitize_title($attribute);
    $class                 = $args['class'];
    $show_option_none      = (bool)$args['show_option_none'];
    $show_option_none_text = $args['show_option_none'] ? $args['show_option_none'] : __('Choose an option', 'woocommerce');
  
    if(empty($options) && !empty($product) && !empty($attribute)) {
      $attributes = $product->get_variation_attributes();
      $options    = $attributes[$attribute];
    }
  
    $radios = '<div class="variation-radios">';
  
    if(!empty($options)) {
      if($product && taxonomy_exists($attribute)) {
        $terms = wc_get_product_terms($product->get_id(), $attribute, array(
          'fields' => 'all',
        ));
  
        foreach($terms as $term) {
          if(in_array($term->slug, $options, true)) {
            $id = $name.'-'.$term->slug;
            $radios .= '<label for="'.esc_attr($id).'"><input type="radio" id="'.esc_attr($id).'" name="'.esc_attr($name).'" value="'.esc_attr($term->slug).'" '.checked(sanitize_title($args['selected']), $term->slug, false).'><span class="custom-radio"></span>'.esc_html(apply_filters('woocommerce_variation_option_name', $term->name)).'</label>';
          }
        }
      } else {
        foreach($options as $option) {
          $id = $name.'-'.$option;
          $checked    = sanitize_title($args['selected']) === $args['selected'] ? checked($args['selected'], sanitize_title($option), false) : checked($args['selected'], $option, false);
          $radios    .= '<label for="'.esc_attr($id).'"><input type="radio" id="'.esc_attr($id).'" name="'.esc_attr($name).'" value="'.esc_attr($option).'" id="'.sanitize_title($option).'" '.$checked.'><span class="custom-radio"></span>'.esc_html(apply_filters('woocommerce_variation_option_name', $option)).'</label>';
        }
      }
    }
    $radios .= '</div>';
      
    return $html.$radios;
}
add_filter('woocommerce_dropdown_variation_attribute_options_html', 'variation_radio_buttons', 20, 2);
  
function variation_check($active, $variation) {
    if(!$variation->is_in_stock() && !$variation->backorders_allowed()) {
      return false;
    }
    return $active;
}
add_filter('woocommerce_variation_is_active', 'variation_check', 10, 2);

// Remove Product Data Tabs
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );

// Remove Related Products
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );

// Custom Success Message
add_filter ( 'wc_add_to_cart_message_html', 'wc_add_to_cart_message_html_filter', 10, 2 );
function wc_add_to_cart_message_html_filter( $message, $products ) {

    foreach( $products as $product_id => $quantity ){
        // (If needed) get the WC_Product object
        $product = wc_get_product( $product_id );
        // The product title
        $product_title = $product->get_title();
    }

    $message =sprintf('<a href="%s" tabindex="1" class="button wc-forward">%s</a> %s', esc_url( wc_get_cart_url() ), esc_html__('Ver Carrito', 'woocommerce'), esc_html($product_title . ' ha sido agregado a tu carrito') );

    return $message;
}

// Add to cart redirect
add_filter ('add_to_cart_redirect', 'redirect_to_cart');
function redirect_to_cart() {
    global $woocommerce;
    $cart_url = $woocommerce->cart->get_cart_url();
    return $cart_url;
}

/* Add custom field input > Max Limit
add_action( 'woocommerce_variation_options_pricing', 'add_max_limit_to_variations', 10, 3 );
function add_max_limit_to_variations( $loop, $variation_data, $variation ) {
    woocommerce_wp_text_input( array(
        'id' => 'max_limit[' . $loop . ']',
        'name' => 'max_limit[' . $loop . ']',
        'class' => 'short',
        'type' => 'number',
        'label' => __( 'Límite de unidades', 'woocommerce' ),
        'value' => get_post_meta( $variation->ID, 'max_limit', true )
    ) );
}

add_action( 'woocommerce_save_product_variation', 'save_max_limit_variations', 10, 2 );
function save_max_limit_variations( $variation_id, $i ) {
   $max_limit = $_POST['max_limit'][$i];
   if ( isset( $max_limit ) ) update_post_meta( $variation_id, 'max_limit', esc_attr( $max_limit ) );
}

add_filter( 'woocommerce_available_variation', 'add_max_limit_variation_data' );
function add_max_limit_variation_data( $variation ) {     
  $variation['max_limit'] = get_post_meta( $variation[ 'variation_id' ], 'max_limit', true );

  return $variation;
}*/

/* Add AJAX to Add To Cart Button
add_action('wp_ajax_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');
add_action('wp_ajax_nopriv_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');
        
function woocommerce_ajax_add_to_cart() {

    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity = empty($_POST['quantity']) ? 1 : wc_stock_amount($_POST['quantity']);
    $variation_id = absint($_POST['variation_id']);
    $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity);
    $product_status = get_post_status($product_id);

    if ($passed_validation && WC()->cart->add_to_cart($product_id, $quantity, $variation_id) && 'publish' === $product_status) {

        do_action('woocommerce_ajax_added_to_cart', $product_id);

        if ('yes' === get_option('woocommerce_cart_redirect_after_add')) {
            wc_add_to_cart_message(array($product_id => $quantity), true);
        }

        WC_AJAX :: get_refreshed_fragments();

      } else {

        $data = array(
            'error' => true,
            'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id));

        echo wp_send_json($data);
    }

    wp_die();
}*/

/* --- Related Products ---- */

// Change Image Displayed
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
add_filter('woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_images', 10);

// Add product category
add_filter('woocommerce_shop_loop_item_title', 'woocommerce_template_single_meta', 5);

?>