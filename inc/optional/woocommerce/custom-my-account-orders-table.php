<?php

/* --- Remove --- */
add_filter( 'woocommerce_account_orders_columns', 'add_account_orders_column', 10, 1 );
function add_account_orders_column( $columns ){
    unset( $columns['order-status'] );
    unset( $columns['order-number'] );
    unset( $columns['order-total'] );
    unset( $columns['order-actions'] );

    return $columns;
}

/* --- Prepare to add --- */
// Column: Product
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column', 10, 1 );
function additional_my_account_orders_column( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-products'] = __( 'Producto', 'woocommerce' );
    }
    return $new_columns;
}
// Edit: Products
add_action( 'woocommerce_my_account_my_orders_column_order-products', 'additional_my_account_orders_column_content', 10, 1 );
function additional_my_account_orders_column_content( $order ) {
    $details = array();

    if (wp_is_mobile()) {
        foreach( $order->get_items() as $item )
        // var_dump($item);
            $details[] = '<p class="orders-table__product-name">' . $item->get_name() . '</p><p class="orders-table__presentation">' . $item['presentacion'] . '</p><p class="orders-table__quantity">' . $item->get_quantity() . ' unidades</p>';
    } else {
        foreach( $order->get_items() as $item )
        // var_dump($item);
            $details[] = '<p class="orders-table__product-name">' . $item->get_name() . '</p>';
    }

    echo count( $details ) > 0 ? implode( '', $details ) : '&ndash;';
}


// Column: Quantity
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column_order_quantity', 10, 1 );
function additional_my_account_orders_column_order_quantity( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-quantity'] = __( 'Cantidad', 'woocommerce' );
        
    }
    return $new_columns;
}
// Edit: Quantity
add_action( 'woocommerce_my_account_my_orders_column_order-quantity', 'additional_my_account_orders_column_content_order_quantity', 10, 1 );
function additional_my_account_orders_column_content_order_quantity( $order ) {
    $details = array();

    foreach( $order->get_items() as $item )
    $details[] = '<p class="orders-table__quantity">' . $item->get_quantity() . ' unidades</p>' . '<p class="orders-table__presentation">(' . $item['presentacion'] . ')</p>';

    echo count( $details ) > 0 ? implode( '', $details ) : '&ndash;';
}

// Column: Discount Code
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column_order_discount_code', 10, 1 );
function additional_my_account_orders_column_order_discount_code( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-descount-code'] = __( 'Código de Descuento', 'woocommerce' );
        
    }
    return $new_columns;
}
// Edit: Discount Code
add_action( 'woocommerce_my_account_my_orders_column_order-discount-code', 'additional_my_account_orders_column_content_descount_code', 10, 1 );
function additional_my_account_orders_column_content_descount_code( $order ) {
    $codigoDescuento = get_post_meta( $order->id, 'codigo_descuento', true );
    $order_data = $order->get_data();
    $order_status = $order_data['status'];

    if ($order_status == 'completed') {
        echo $codigoDescuento;
    } else if ( $order_status == 'processing') {
        echo 'Esperando que finalice la Campaña.';
    } else if ( $order_status == 'on-hold' ) {
        echo 'Límite de Unidades Excedido';
    } else if ( $order_status == 'refunded' ) {
        echo 'Orden cancelada';
    }
    

}

// Column: Discount
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column_order_discount', 10, 1 );
function additional_my_account_orders_column_order_discount( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-discount'] = __( '% Descuento', 'woocommerce' );
        
    }
    return $new_columns;
}
// Edit: Discount
add_action( 'woocommerce_my_account_my_orders_column_order-discount', 'additional_my_account_orders_column_content_discount', 10, 1 );
function additional_my_account_orders_column_content_discount( $order ) {
    $items = $order->get_items(); 

    foreach ($items as $item_id => $item ) {
        $reachedDiscount = $order->get_item_meta($item_id, 'Descuento', true);
        echo '<p>'. $reachedDiscount . '</p>';
    }
}


// Column: Order Number
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column_order_number_code', 10, 1 );
function additional_my_account_orders_column_order_number_code( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-number-code'] = __( 'Orden N°', 'woocommerce' );
        
    }
    return $new_columns;
}
// Edit: Order Number
add_action( 'woocommerce_my_account_my_orders_column_order-number-code', 'additional_my_account_orders_column_content_number_code', 10, 1 );
function additional_my_account_orders_column_content_number_code( $order ) {
    $order_number = $order->get_order_number();
    echo $order_number;

    // Mobile
    if (wp_is_mobile()) {
        setlocale(LC_ALL,"es_ES");
        $order_date = $order->get_date_created()->format ('d-m-Y');
        echo '<br>' . $order_date;
    }
}


// Column: CUIT
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column_order_cuit', 10, 1 );
function additional_my_account_orders_column_order_cuit( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-cuit'] = __( 'CUIT', 'woocommerce' );
        
    }
    return $new_columns;
}
// Edit: CUIT
add_action( 'woocommerce_my_account_my_orders_column_order-cuit', 'additional_my_account_orders_column_content_cuit', 10, 1 );
function additional_my_account_orders_column_content_cuit( $order ) {
    $orderCuit = get_post_meta( $order->id, 'billing_cuit', true );
    echo $orderCuit;
}

// Column: Delete Order
add_filter( 'woocommerce_my_account_my_orders_columns', 'additional_my_account_orders_column_order_delete', 10, 1 );
function additional_my_account_orders_column_order_delete( $columns ) {
    $new_columns = [];

    foreach ( $columns as $key => $name ) {
        $new_columns[ $key ] = $name;
        $new_columns['order-delete'] = __( 'Eliminar Orden', 'woocommerce' );
        
    }
    return $new_columns;
}
// Edit: Delete Order
add_action( 'woocommerce_my_account_my_orders_column_order-delete', 'additional_my_account_orders_column_content_delete', 10, 1 );
function additional_my_account_orders_column_content_delete( $order ) {
    if ($order->get_status() == 'processing' || $order->get_status() == 'on-hold') {
        echo '<div class="trash js-cancel-order"></div>';
    } 

}

/* --- Reorder Table --- */
function woodmart_custom_account_orders_columns() {
    if (wp_is_mobile()) {
        $columns = array(
            'order-number-code' => __( 'Orden N°', 'woocommerce' ),
            'order-cuit' => __( 'CUIT', 'woocommerce' ),
            'order-discount-code'   => __( 'Código de Descuento', 'woocommerce' ),
            'order-discount' => __( '% Descuento', 'woocommerce' ),
            'order-products'  => __( 'Productos', 'woocommerce' ),
            'order-date'    => __( 'Date', 'woocommerce' ),
            'order-quantity' => __( 'Cantidad', 'woocommerce' ),
            'order-delete'    => __( '', 'woocommerce' ),
        );
    
        return $columns;
    } else {
        $columns = array(
            'order-products'  => __( 'Productos', 'woocommerce' ),
            'order-number-code' => __( 'Orden N°', 'woocommerce' ),
            'order-cuit' => __( 'CUIT', 'woocommerce' ),
            'order-discount-code'   => __( 'Código de Descuento', 'woocommerce' ),
            'order-discount' => __( '% Descuento', 'woocommerce' ),
            'order-quantity' => __( 'Cantidad', 'woocommerce' ),
            'order-date'    => __( 'Date', 'woocommerce' ),
            'order-delete'    => __( '', 'woocommerce' ),
        );
    
        return $columns;
    }
}
add_filter( 'woocommerce_my_account_my_orders_columns', 'woodmart_custom_account_orders_columns' );