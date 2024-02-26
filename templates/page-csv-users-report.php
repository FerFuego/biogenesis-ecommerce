<?php

/**
 * 
 * Template Name: Reportes CSV (Usuarios)
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

// Get Info
$productores = get_users(
    array(
        'role__in' => 'subscriber',
    )
);

/* POST > Filters
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
} */

/*$args = array(
    'posts_per_page' => '-1',
    'date_before' => $campaignEndDate,  
    'date_after' => $campaignStartDate, 
    'billing_distributor' => $vetName,
    'status'=> array($orderStatus) 
); 

$orders = wc_get_orders( $args ); */

/*$results = array (

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
}*/

$filename = 'usuariosProductores_' . date("j-m-o") . '.csv';

header("Content-type: csv; charset=UTF-8;");
header("Content-Disposition: arrachment; filename=$filename");

$output = fopen("php://output", "w");

$header = array('Nombre', 'Apellido', 'Rol', 'Tel. fijo', 'Tel. celular', 'Mail', mb_convert_encoding('Técnico/Vendedor', 'UTF-16LE', 'UTF-8'), mb_convert_encoding('Razón Social', 'UTF-16LE', 'UTF-8'), 'CUIT', 'Establecimiento', 'RENSPA', 'Provincia', 'Departamento/Localidad', mb_convert_encoding('Dirección', 'UTF-16LE', 'UTF-8'), mb_convert_encoding('Sistema de Producción', 'UTF-16LE', 'UTF-8'), mb_convert_encoding('N° de cabeza de ganado', 'UTF-16LE', 'UTF-8'), 'Tipo de ganado');

fputcsv($output, $header);

$usuariosSinDatos = array();
$usuariosDatosDesactualizados = array();

foreach ($productores as $productor) {
    // Get Info
    $meta = get_user_meta($productor->ID);
    $perfilesFacturacion = $meta['perfil_facturacion'];
    $perfilesFacturacion = json_decode($perfilesFacturacion[0], JSON_FORCE_OBJECT);
    // Users without billing data > skip from loop, save in array, and display them on the bottom
    if ($meta["billing_first_name"][0] == '') {
        array_push($usuariosSinDatos, $productor);
        continue;
    } else if (!$perfilesFacturacion) {
        array_push($usuariosDatosDesactualizados, $productor);
        continue;
    }
    // Loop and display
    fputcsv(
        $output, 
        array(
            mb_convert_encoding($meta["billing_first_name"][0], 'UTF-16LE', 'UTF-8'),
            mb_convert_encoding($meta["billing_last_name"][0], 'UTF-16LE', 'UTF-8'),
            mb_convert_encoding($meta["billing_roll"][0], 'UTF-16LE', 'UTF-8'),
            $meta["billing_phone"][0],
            $meta["billing_phone_cel"][0],
            $productor->user_email,
        )
    );
    // Perfiles de facturación
    if (is_array($perfilesFacturacion)) {
        foreach ($perfilesFacturacion as $perfilFacturacion) {
            fputcsv(
                $output, 
                array(
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    mb_convert_encoding($perfilFacturacion['razon_social'], 'UTF-16LE', 'UTF-8'),
                    $perfilFacturacion['cuit'],
                )
            );
            // Establecimientos
            $establecimientos = $perfilFacturacion['establecimientos'];
            if (is_array($establecimientos)) {
                foreach ($establecimientos as $establecimiento) {
                    fputcsv(
                        $output, 
                        array(
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            mb_convert_encoding($establecimiento['nombre'], 'UTF-16LE', 'UTF-8'),
                            $establecimiento['renspa'],
                            mb_convert_encoding($establecimiento['provincia'], 'UTF-16LE', 'UTF-8'),
                            mb_convert_encoding($establecimiento['localidad'], 'UTF-16LE', 'UTF-8'),
                            mb_convert_encoding($establecimiento['direccion'], 'UTF-16LE', 'UTF-8'),
                        )
                    );
                    // Sistemas de Producción
                    $sistemasProduccion = $establecimiento['productionSytems'];
                    if (is_array($sistemasProduccion)) {
                        foreach ($sistemasProduccion as $sistemaProduccion) {
                            fputcsv(
                                $output, 
                                array(
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    '',
                                    mb_convert_encoding($sistemaProduccion['sistemaProduccion'], 'UTF-16LE', 'UTF-8'),
                                    $sistemaProduccion['headNumber'],
                                    $sistemaProduccion['cattleType']
                                )
                            );
                        }
                    }
                };
            }
        };
    }
}
// Usuarios con datos desactualizados
fputcsv(
    $output, 
    array ('') // Empty Row for spacing
);
fputcsv(
    $output, 
    array ('USUARIOS SIN DATOS FACTURACION')
);
foreach ($usuariosDatosDesactualizados as $productor) {
    $meta = get_user_meta($productor->ID);
    $perfilesFacturacion = $meta['perfil_facturacion'];
    $perfilesFacturacion = json_decode($perfilesFacturacion[0], JSON_FORCE_OBJECT);
    fputcsv(
        $output, 
        array(
            mb_convert_encoding($meta["billing_first_name"][0], 'UTF-16LE', 'UTF-8'),
            mb_convert_encoding($meta["billing_last_name"][0], 'UTF-16LE', 'UTF-8'),
            mb_convert_encoding($meta["billing_roll"][0], 'UTF-16LE', 'UTF-8'),
            $meta["billing_phone"][0],
            $meta["billing_phone_cel"][0],
            $productor->user_email,
        )
    );
}
// Usuarios sin datos de facturación
fputcsv(
    $output, 
    array ('') // Empty Row for spacing
);
fputcsv(
    $output, 
    array ('USUARIOS SIN DATOS')
);
foreach ($usuariosSinDatos as $productor) {
    fputcsv(
        $output, 
        array(
            $productor->user_email,
        )
    );
}

fclose($output);

return;


?>