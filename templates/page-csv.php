<?php
/**
 * 
 * Template Name: Reportes CSV 
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

$vetId = sanitize_text_field( get_query_var( 'securityid' ) );
$vetName = sanitize_text_field( get_query_var( 'vetname' ) );
$vetNameCheck = get_field('user_distributor_nombre_de_fantasia', 'user_'.$vetId);
$campaignStartDate = sanitize_text_field( get_query_var( 'campaignstart' ) );
$campaignStartEnd = sanitize_text_field( get_query_var( 'campaignend' ) );


if ($vetName == $vetNameCheck) {
    $args = array(
        'posts_per_page' => '-1',
        'date_before' => $campaignStartEnd,  
        'date_after' => $campaignStartDate, 
        'billing_distributor' => $vetName,
        'status' => array('processing', 'completed')
    ); 
    
    $orders = wc_get_orders( $args ); 
    
    $results = array (
    
    );
    foreach ($orders as $order) {
    
        $orderDetails = array(
            $order->data["number"], // Order ID
            $order->data["billing"]["first_name"] . $order->data["billing"]["last_name"], // Productor
            $order->get_total() // Total
        );
    
        // Get Items
        $orderItems = $order->get_items();
    
        $orderItemsNameCSV = array();
        foreach ($orderItems as $item_id => $item) {
            $itemName = $item->get_product()->name;
            array_push($orderItemsNameCSV, $itemName);
        }
        $orderItemsQuantityCSV = array();
        foreach ($orderItems as $item_id => $item) { 
            $itemQuantity = $item->get_quantity();
            array_push($orderItemsQuantityCSV, $itemQuantity);
        } 
    
        // Push
        array_push($results, $orderDetails);
    }
    
    $filename = 'listadoOrdenes.csv';
    
    header('Content-Encoding: UTF-8');
    header("Content-type: csv; charset=utf-8");
    header("Content-Disposition: arrachment; filename=$filename");
    
    $output = fopen("php://output", "w");
    
    $header = array('Order ID', 'Veterinaria', 'Mail Veterinaria', 'Mail Veterinaria Alternativo', 'Provincia', 'Localidad', 'Tecnico/Vendedor', 'Codigo de Descuento', 'Producto', 'Presentacion', 'Cantidad', 'Descuento Alcanzado', 'Monto Total', 'Productor', 'Razon Social', 'CUIT', 'Email', 'Telefono', 'Fecha Orden', 'Estado Orden');
    
    fputcsv($output, $header);
    
    foreach ($orders as $order) {
        // Get Info
        $billingDistributor = get_post_meta( $order->id, 'billing_distributor', true );
        $billingDistributorEmail = get_post_meta( $order->id, 'billing_distributor_elecmail', true );
        $billingDistributorEmailAlternative = get_post_meta( $order->id, 'billing_distributor_elecmail_alternative', true );
        $billingDistributorLocality = get_post_meta( $order->id, 'billing_distributor_locality', true );
        $billingDistributorProvince = get_post_meta( $order->id, 'billing_distributor_province', true );
        $tecnicoVendedorID = get_post_meta( $order->id, 'vet_vendedor_id', true );
        $tecnicoVendedor = get_user_by('id', $tecnicoVendedorID)->display_name;
        $codigoDescuento = get_post_meta( $order->id, 'codigo_descuento', true );
        if ($codigoDescuento == '') {
            $codigoDescuento = 'Campana en curso.';
        }
        $billingRazonSocial = get_post_meta( $order->id, 'billing_razon_social', true );
        $billingCUIT = get_post_meta( $order->id, 'billing_cuit', true);
        $orderStatus = $order->get_status(); 
        switch ($orderStatus) {
            case 'processing':
                $orderStatus = 'Procesando';
                break;
            case 'on-hold':
                $orderStatus = 'Limite Máximo Excedido';
                break;
            case 'completed':
                $orderStatus = 'Completado';
                break;
            case 'refunded':
                $orderStatus = 'Cancelado';
                break;
            default:
                $orderStatus;
        }
    
        $orderItems = $order->get_items();
        // Loop and display
        foreach ($orderItems as $item_id => $item) {
            fputcsv(
                $output, 
                array(
                    $order->data["number"], 
                    //$billingDistributor,
                    $billingDistributorEmail,
                    $billingDistributorEmailAlternative,
                    $billingDistributorProvince,
                    $billingDistributorLocality,
                    $tecnicoVendedor,
                    $codigoDescuento,
                    $item->get_product()->name, 
                    $item->get_meta_data()[0]->value,
                    $item->get_quantity(),
                    $item->get_data()["meta_data"][1]->value,
                    '$' . $order->get_total(),
                    $order->data["billing"]["first_name"] . $order->data["billing"]["last_name"],
                    $billingRazonSocial,
                    $billingCUIT,
                    $order->data["billing"]["email"],
                    $order->data["billing"]["phone"],
                    $order->order_date,
                    $orderStatus
                )
            );
        };
    }
    
    fclose($output);
} else {
    wp_redirect('/');
}






