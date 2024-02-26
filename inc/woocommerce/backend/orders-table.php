<?php

// Add Max Limit Exceeded Column
add_filter( 'manage_edit-shop_order_columns', 'add_max_limit_exceeded_column');
function add_max_limit_exceeded_column($columns) {
    $new_columns = array();

    foreach ( $columns as $column_name => $column_info ) {
        $new_columns[ $column_name ] = $column_info;

        if ( 'order_total' === $column_name ) {
            $new_columns['order_max-limit-exceeded'] = __( 'Límite de Unidades Excedido', 'my-textdomain' );
        }
    }

    return $new_columns;
}

// Add Max Limit Exceeded Column Content
function add_max_limit_exceeded_column_content( $column ) {
    global $post;

    if ( 'order_max-limit-exceeded' === $column ) {
        $order    = wc_get_order( $post->ID );
        $productMaxLimitExceeded = get_post_meta( $order->id, 'product_max_limit_exceeded', true );

        if ($productMaxLimitExceeded) {
            echo '<p style="color: red;"><strong>' . __( 'Límite de Unidades Excedido' ) . '</strong></p>';
        }
    }
}
add_action( 'manage_shop_order_posts_custom_column', 'add_max_limit_exceeded_column_content' );

?>