<?php 
// If Max Limit Exceeded -> Status Order = 'on-hold' else 'processing'
/* add_action( 'woocommerce_payment_complete', 'action_woocommerce_payment_complete', 10, 3 );
function action_woocommerce_payment_complete( $order_id ) {  
    
    if( ! $order_id ) return;

    $order = wc_get_order( $order_id ); 
    $variationsArray = array (); // Max limit on variable products
    $items = $order->get_items(); 
    $totalQuantity = 0;
    $exceeded = 'false';

    foreach ($items as $item ) {
        $product = $item->get_product();
        $parentProductId = $product->get_parent_id();
        $productVariationID = $item['variation_id'];
        $productMaxLimit = get_field('max-limit', $parentProductId);
        $dosisFrascoMuesta = get_field('dosis-por-frasco', $item['product_id'] );	
        $dosisFrasco = get_post_meta( $productVariationID , 'custom_field', true);

        // Quantity		
        if($dosisFrascoMuesta) {
            $quantity =  (int) $item->get_quantity()*$dosisFrasco;
        } else {
            $quantity =  (int) $item->get_quantity();
        }

        // Max limit on variable products
        if (in_array($parentProductId, $variationsArray)) {
            $search = array_search($parentProductId, $variationsArray);
            $totalQuantity = $quantity + $variationsArray[$search + 1];
        } else {
            array_push($variationsArray, $parentProductId, $quantity);
        }

        if ($totalQuantity > $productMaxLimit || $quantity > $productMaxLimit) {
            $exceeded = 'true';
        }
    }
    
    if ( $exceeded == 'true') {
        $order->update_status( 'on-hold' );
    } else {
        $order->update_status( 'processing' );
    }   
};  */

// If Max Limit Exceeded -> Order on hold/'pending payment' 
add_filter( 'woocommerce_payment_complete_order_status', 'max_limit_exceeded_update_order_status', 10, 2 );
function max_limit_exceeded_update_order_status( $order_status, $order_id ) {
    $variationsArray = array (); // Max limit on variable products
    $order = new WC_Order( $order_id );
    $items = $order->get_items(); 
    $exceeded = '';
    foreach ($items as $item_id => $item ) {
        $product = $item->get_product();
        $parentProductId = $product->get_parent_id();
        $productVariationID = $item['variation_id'];
        $productType = $product->get_type();
        $productMaxLimit = get_field('max-limit', $parentProductId);
        $dosisFrascoMuesta = get_field('dosis-por-frasco', $item['product_id'] );	
        $dosisFrasco = get_post_meta( $productVariationID , 'custom_field', true);

        // Quantity		
        if($dosisFrascoMuesta) {
            $quantity =  (int) $item->get_quantity()*$dosisFrasco;
        } else {
            $quantity =  (int) $item->get_quantity();
        }

        // Max limit on variable products
        if (in_array($parentProductId, $variationsArray)) {
            $search = array_search($parentProductId, $variationsArray);
            $totalQuantity = $quantity + $variationsArray[$search + 1];
        } else {
            array_push($variationsArray, $parentProductId, $quantity);
        }

        if ($totalQuantity) {
            if ($totalQuantity > $productMaxLimit) {
                $exceeded = 'true';
            }
        } else {
            if ($quantity > $productMaxLimit) {
                $exceeded = 'true';
            }
        }
    }
    if ( $exceeded == 'true') {
        return 'on-hold'; 
    } else {
        return 'processing'; 
    }
}

// Rename 'On Hold' to 'Límite Máximo Excedido'
add_filter( 'wc_order_statuses', 'rename_on_hold_order_status' );
function rename_on_hold_order_status( $order_statuses ) {
    foreach ( $order_statuses as $key => $status ) {
        if ( 'wc-on-hold' === $key ) 
            $order_statuses['wc-on-hold'] = _x( 'Límite Máximo Excedido', 'Order status', 'woocommerce' );
    }
    return $order_statuses;
}
// Also rename on admin top menu 
function wc_rename_order_status_type( $order_statuses ) {
    foreach ( $order_statuses as $key => $status ) {
        $new_order_statuses[ $key ] = $status;
        if ( 'wc-on-hold' === $key ) {
            $order_statuses['wc-on-hold']['label_count'] = _n_noop( 'Límite Máximo Excedido <span class="count">(%s)</span>', 'Límite Máximo Excedido <span class="count">(%s)</span>', 'woocommerce' );
        }
    }
    return $order_statuses;
}
add_filter( 'woocommerce_register_shop_order_post_statuses', 'wc_rename_order_status_type' );

// Unset 'On Hold' from dropdown bulk actions
add_filter( 'bulk_actions-edit-shop_order', 'bulk_actions_order_status', 20, 1 );
function bulk_actions_order_status( $actions ) {
    unset( $actions['mark_on-hold']);
    return $actions;
}

// Stock/Sales management depending of order status
add_action( 'woocommerce_order_status_changed', 'update_product_total_sales_on_status_change', 10, 4 );
function update_product_total_sales_on_status_change( $order_id, $old_status, $new_status, $order ){
    // Pending to On-Hold (Max Limit Exceeded)
    if ($old_status == 'pending' &&  $new_status == 'on-hold') {

        foreach ( $order->get_items() as $item ) {
            $product = $item->get_variation_id() > 0 ? wc_get_product( $item->get_product_id() ) : $item->get_product();

            $total_sales   = (int) $product->get_total_sales(); // get product total sales
            $item_quantity = (int) $item->get_quantity(); // Get order item quantity

            $product->set_total_sales( $total_sales - $item_quantity ); // Decrease product total sales
            $product->save(); // save to database
        }
        $order->save(); // save to database
    // On-Hold to Processing/Complete
    } else if ($old_status == 'on-hold' &&  in_array($new_status, array('processing', 'completed'))) {

        foreach ( $order->get_items() as $item ) {
            $product = $item->get_variation_id() > 0 ? wc_get_product( $item->get_product_id() ) : $item->get_product();

            $total_sales   = (int) $product->get_total_sales(); 
            $item_quantity = (int) $item->get_quantity(); 

            $product->set_total_sales( $total_sales + $item_quantity ); 
            $product->save(); 
        }
        $order->save(); 
    // Porcessing/Complete to On-Hold
    } else if (in_array( $old_status, array('processing', 'completed') ) && in_array( $new_status, array('cancelled', 'refunded') )
    && ! $order->get_meta('_order_is_canceled')) {

        foreach ( $order->get_items() as $item ) {
            
            $product = $item->get_variation_id() > 0 ? wc_get_product( $item->get_product_id() ) : $item->get_product();

            $total_sales   = (int) $product->get_total_sales();
            $item_quantity = (int) $item->get_quantity(); 

            $product->set_total_sales( $total_sales - $item_quantity ); 
            $product->save(); 
        }
        $order->update_meta_data('_order_is_canceled', '1'); // Flag the order as been cancelled to avoid repetitions
        $order->save(); 
    }
}

// If order cancelled > move to refund
add_action( 'woocommerce_order_status_cancelled', 'change_status_to_refund', 10, 1 );
function change_status_to_refund( $order_id ){
    $order = new WC_Order( $order_id );  
    $order->update_status('wc-refunded', 'Orden Cancelada');
}

// Remove "Failed" Order Status
add_filter( 'wc_order_statuses', 'remove_failer_order_status' );
function remove_failer_order_status( $statuses ){

    if( isset( $statuses['wc-failed'] ) ){
        unset( $statuses['wc-failed'] );
    }

    return $statuses;
}

// Allow Order Edit From BackEnd (Only for Processing and MaxLimit Exceeded)
function order_is_editable( $editable, $order ) {
    if( $order->get_status() == 'processing' || $order->get_status() == 'on-hold' ){
        $editable = true;
    }
    return $editable;
}
add_filter( 'wc_order_is_editable', 'order_is_editable', 10, 2 );
