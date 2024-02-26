<?php 

// Display Discount Code 
add_filter( 'woocommerce_email_order_meta', 'display_discount_code', 20, 4 );
function display_discount_code( $order, $sent_to_admin, $plain_text, $email ) {
    // Targetting specific email notifications: 
    if( ! ( 'new_order' == $email->id || 'customer_processing_order' == $email->id || 'customer_completed_order' == $email->id) ) return;

    $codigoDescuento = get_post_meta( $order->id, 'codigo_descuento', true );
    if ($codigoDescuento == '') {
        $codigoDescuento = 'Recibiras tu código de descuento una vez que finalice la respectiva campaña.';
    }
    $billing_distributor = get_post_meta( $order->id, 'billing_distributor', true );
    $billing_distributor_adress = get_post_meta( $order->id, 'vet_street', true );
    $billing_distributor_locality = get_post_meta( $order->id, 'billing_distributor_locality', true );
    $billing_distributor_province = get_post_meta( $order->id, 'billing_distributor_province', true );

    echo '<strong>Código de Descuento: </strong><br>'. $codigoDescuento .'<br><br>';
    echo '<strong>Veterinaria: </strong><br>'. $billing_distributor . '<br>' . $billing_distributor_adress . ', ' . $billing_distributor_locality . ', ' . $billing_distributor_province .'<br><br>';
}


/* --- Max Limit Exceeded --- */

// Display in On-Hold Mail (Customer)
add_filter( 'woocommerce_email_order_meta', 'display_max_limit_exceeded_customer', 20, 4 );
function display_max_limit_exceeded_customer( $order, $sent_to_admin, $plain_text, $email ) {

    if ( !( 'customer_on_hold_order' == $email->id ) ) return; // target emails

    $variationsArray = array (); // Max limit on variable products
    $maxLimitArray = array();
    $items = $order->get_items(); 
    foreach ($items as $item_id => $item ) {
        $product = $item->get_product();
        $itemName = $item->get_name();
        $variation_id = $item->get_variation_id();
        $variation    = new WC_Product_Variation( $variation_id );
        $variationName   = implode(" / ", $variation->get_variation_attributes());
        $completeName = $itemName . ' - ' . $variationName;
        $parentProductId = $product->get_parent_id();
        $maxLimit = get_field('max-limit', $parentProductId);
        $dosisFrascoMuesta = get_field('dosis-por-frasco', $item['product_id'] );	
        $dosisFrasco = get_post_meta( $variation_id , 'custom_field', true);

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
            if ($totalQuantity > $maxLimit) {
                array_push($maxLimitArray, $completeName);
            }
        } else {
            if ($quantity > $maxLimit) {
                array_push($maxLimitArray, $completeName);
            }
        }
    }
    if (count($maxLimitArray) > 0) {
        echo '<br><strong style="color: red;">Atención:</strong> Se ha excedido el límite de unidades establecido para:';
        echo '<ul>';
        foreach ($maxLimitArray as $value) {
            echo '<li>' . $value . '</li>';
        }
        echo '</ul>';
    }
}

// Display in New Order Mail (Admin)
add_filter( 'woocommerce_email_order_meta', 'display_max_limit_exceeded_admin', 20, 4 );
function display_max_limit_exceeded_admin( $order, $sent_to_admin, $plain_text, $email ) {

    if( ! ( 'new_order' == $email->id ) ) return; // target emails

    $variationsArray = array (); // Max limit on variable products
    $maxLimitArray = array();
    $items = $order->get_items(); 
    foreach ($items as $item_id => $item ) {
        $product = $item->get_product();
        $itemName = $item->get_name();
        $variation_id = $item->get_variation_id();
        $variation    = new WC_Product_Variation( $variation_id );
        $variationName   = implode(" / ", $variation->get_variation_attributes());
        $completeName = $itemName . ' - ' . $variationName;
        $parentProductId = $product->get_parent_id();
        $maxLimit = get_field('max-limit', $parentProductId);
        $dosisFrascoMuesta = get_field('dosis-por-frasco', $item['product_id'] );	
        $dosisFrasco = get_post_meta( $variation_id , 'custom_field', true);

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
            if ($totalQuantity > $maxLimit) {
                array_push($maxLimitArray, $completeName);
            }
        } else {
            if ($quantity > $maxLimit) {
                array_push($maxLimitArray, $completeName);
            }
        }
    }
    if (count($maxLimitArray) > 0) {
        echo '<br><strong style="color: red;">Atención:</strong> Se ha excedido el límite de unidades establecido para:';
        echo '<ul>';
        foreach ($maxLimitArray as $value) {
            echo '<li>' . $value . '</li>';
        }
        echo '</ul>';
    }

    // Cambio de Veterinaria 
    $sameDistributor = get_post_meta( $order->id, 'same_distributor', true );
    if (!$sameDistributor) {
        echo '<p><strong style="color: red;">Atención:</strong> Cambio de Veterinaria</p>';
    }
} 

// Change New Order Mail Subject (Admin)
add_filter('woocommerce_email_subject_new_order', 'change_admin_email_subject', 1, 2);
function change_admin_email_subject( $subject, $order ) {
    $variationsArray = array (); // Max limit on variable products
    $items = $order->get_items(); 
    foreach ($items as $item_id => $item ) {
        $product = $item->get_product();
        $parentProductId = $product->get_parent_id();
        $variation_id = $item->get_variation_id();
        $maxLimit = get_field('max-limit', $parentProductId);
        $dosisFrascoMuesta = get_field('dosis-por-frasco', $item['product_id'] );	
        $dosisFrasco = get_post_meta( $variation_id , 'custom_field', true);

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

        /* Cambio de Veterinaria?      
        $sameDistributor = get_post_meta( $order->id, 'same_distributor', true );

        if (!$sameDistributor) {
            $subject = 'Revisar Pedido - Nuevo Pedido #(' . $order->get_id() . ')';
        }

        if ($totalQuantity) {
            if ($totalQuantity > $maxLimit) {
                $subject = 'Revisar Pedido - Nuevo Pedido #(' . $order->get_id() . ')';
            } 
        } else {
            if ($quantity > $maxLimit) {
                $subject = 'Revisar Pedido - Nuevo Pedido #(' . $order->get_id() . ')';
            }  
        }*/
    }

	return $subject;
}
