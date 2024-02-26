<?php 

// Order Cancelled by User
function productor_canel_order() {
    $orderID = (int) $_POST['orderId'];
    $order = wc_get_order( $orderID );

    if ($order->get_status() == 'processing' || $order->get_status() == 'on-hold') {
        $order->update_status('cancelled', 'Orden cancelada por usuario'); 
    } 

    wp_die();
}
add_action('wp_ajax_productor_canel_order', 'productor_canel_order');
add_action('wp_ajax_nopriv_productor_canel_order', 'productor_canel_order');

?>