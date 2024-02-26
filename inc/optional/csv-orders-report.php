<?php 

function download_report_csv() {

    // Get Info
	$veterinarias = get_users(
		array(
			'role__in' => 'distributor',
		)
	);

    // POST > Filters
	$campaignID = $_POST['campaign'];
    $orderStatus = $_POST['orderStatus'];
	$vetName = $_POST['vetName'];
    if ($vetName == 'todas') {
		$vetName = array();
		foreach ($veterinarias as $veterinaria) {
			array_push($veterinaria, $vetName);
		}
	}

	$terms = get_terms( array(
		'taxonomy' => 'campaign',
		'hide_empty' => false,
	)); 
	foreach ($terms as $term) {
		if ($term->term_id == $campaignID) {
			$campaignStartDate = get_field('campaign_date_start', $term);
			$campaignEndDate = get_field('campaign_date_end', $term);
		}
	} 

	$args = array(
		'posts_per_page' => '-1',
		'date_before' => $campaignEndDate,  
		'date_after' => $campaignStartDate, 
        'billing_distributor' => $vetName,
		'status'=> array($orderStatus) 
	); 
    
    $orders = wc_get_orders( $args ); 

    $results = array (

    );
    foreach ($orders as $order) {

        $orderDetails = array(
            $order->data["number"], // Order ID
            $order->data["billing"]["first_name"] . $order->data["billing"]["last_name"], // Productor
            //implode(',', $orderItemsNameCSV), // Items Names
            //implode(',', $orderItemsQuantityCSV), // Items Quantity
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

    $filename = 'orders.csv';

    header("Content-type: csv");
    header("Content-Disposition: arrachment; filename=$filename");

    $output = fopen("php://output", "w");

    $header = array('Nro. De Orden', 'Veterinaria', 'Mail Veterinaria', 'Mail Veterinaria Alternativo', 'Provincia', 'Localidad', 'Técnico/Vendedor', 'Código de Descuento', 'Producto', 'Presentación', 'Cantidad', 'Descuento Alcanzado', 'Monto Total', 'Productor', 'Razón Social', 'CUIT', 'Email', 'Teléfono', 'Fecha Orden', 'Estado Orden');

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
            $codigoDescuento = 'Campaña en curso.';
        }
        $billingRazonSocial = get_post_meta( $order->id, 'billing_razon_social', true );
        $billingCUIT = get_post_meta( $order->id, 'billing_cuit', true);
        $orderStatus = $order->get_status(); 
        switch ($orderStatus) {
            case 'processing':
                $orderStatus = 'Procesando';
                break;
            case 'on-hold':
                $orderStatus = 'Límite Máximo Excedido';
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
                    //$order->data["number"], 
                    $billingDistributor,
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

    return fclose($output);


}
add_action('wp_ajax_download_report_csv', 'download_report_csv');
add_action('wp_ajax_nopriv_download_report_csv', 'download_report_csv');


// For Vets & Técnicos/Vendedores Download
function rc_custom_query_vetid($vars) {
    $vars[] .= 'securityid';
    return $vars;
}
add_filter( 'query_vars', 'rc_custom_query_vetid' );

function rc_custom_query_vetname($vars) {
    $vars[] .= 'vetname';
    return $vars;
}
add_filter( 'query_vars', 'rc_custom_query_vetname' );

function rc_custom_query_tecnico_vendedor_id($vars) {
    $vars[] .= 'tecnicovendedorid';
    return $vars;
}
add_filter( 'query_vars', 'rc_custom_query_tecnico_vendedor_id' );

function rc_custom_query_campaign_start($vars) {
    $vars[] .= 'campaignstart';
    return $vars;
}
add_filter( 'query_vars', 'rc_custom_query_campaign_start' );

function rc_custom_query_campaign_end($vars) {
    $vars[] .= 'campaignend';
    return $vars;
}
add_filter( 'query_vars', 'rc_custom_query_campaign_end' );
?>