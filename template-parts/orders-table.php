
<span id="js-refreshed-order-count" style="display: none;"><?php echo(count($orders)); ?></span>

<!-- AJAX Spinner -->
<div class="spinner" id="js-spinner-report-orders">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
</div>
<!-- Mask -->
<div class="report-wrap__mask" id="js-mask-report-orders">
</div>

<!-- Table Desktop -->
<table class="table-desktop">
    <tbody class="report-body">
        <?php foreach ($orders as $order) { 
            $orderItems = $order->get_items(); ?>
            <tr class="order">
                <!-- Order ID -->
                <td>
                    <p>Nro. De Orden:</p>
                    <p><?php echo $order->data["number"]; ?></p>
                </td>
                <!-- Productor -->
                <td>
                    <p>Productor</p>
                    <p><?php echo $order->data["billing"]["first_name"]; ?> <?php echo $order->data["billing"]["last_name"]; ?></p>
                </td>
                <!-- Productos -->
                <td class="order-products">
                    <p>Productos:</p>
                    <ul>
                    <?php foreach ($orderItems as $item_id => $item) { ?>
                        <li>
                            <p><?php echo $item->get_product()->name; ?> x <?php echo $item->get_quantity(); ?></p>
                            <p><span>Presentación:</span> <?php echo $item->get_meta_data()[0]->value; ?></p>
                            <p><span>Descuento:</span> <?php echo $item->get_data()["meta_data"][1]->value; ?></p> 
                        </li>
                    <?php } ?>
                    </ul>
                </td>
                <!-- Monto Total -->
                <td>
                    <p>Monto Total</p>
                    <?php echo '$ ' . $order->get_total(); ?>
                </td>
                <!-- Código de Descuento -->
                <td>
                    <?php 
                    $codigoDescuento = get_post_meta( $order->id, 'codigo_descuento', true );
                    if ($codigoDescuento == '') {
                        $codigoDescuento = 'Campaña en curso.';
                    }
                    ?>
                    <p>Código de Descuento:</p>
                    <p><?php echo $codigoDescuento; ?></p>
                </td>
            </tr>
            <tr class="order-second-row">
                <!-- Veterinaria -->
                <td colspan="3">
                    <?php 
                    $billingDistributor = get_post_meta( $order->id, 'billing_distributor', true ); ?>
                    <p>Veterinaria:</p>
                    <p><?php echo $billingDistributor; ?></p>
                </td>
                <!-- Técnico/Vendedor -->
                <td colspan="2">
                    <?php 
                        $tecnicoVendedorID = get_post_meta( $order->id, 'vet_vendedor_id', true );
                        $tecnicoVendedor = get_user_by('id', $tecnicoVendedorID)->display_name;
                    ?>
                    <p>Técnico/Vendedor:</p>
                    <p><?php echo $tecnicoVendedor; ?></p>
                </td>
            </tr>
            <tr class="order-third-row">
                <!-- Fecha Orden -->
                <td colspan="2">
                    <p>Fecha Orden:</p>
                    <p><?php echo $order->order_date; ?></p>
                </td>
                <!-- Campaña -->
                <td colspan="2">
                    <?php foreach ($order->get_items() as $item_id => $item) { 
                        $terms = get_the_terms( $item['product_id'], 'campaign' ); ?>
                        <p>Campaña:</p>
                        <p><?php echo $terms[0]->name; ?></p>
                        <?php break;
                    } ?>
                </td>
                <!-- Estado Orden -->
                <?php $orderStatus = $order->get_status(); 
                switch ($orderStatus) {
                    case 'processing':
                        $orderStatusDisplay = 'Procesando';
                        break;
                    case 'on-hold':
                        $orderStatusDisplay = 'Límite Máximo Excedido';
                        break;
                    case 'completed':
                        $orderStatusDisplay = 'Completado';
                        break;
                    case 'refunded':
                        $orderStatusDisplay = 'Cancelado';
                        break;
                    default:
                        $orderStatus;
                } ?>
                <td class="<?php echo $orderStatus; ?>">
                    <p>Estado Orden:</p>
                    <?php var_dump() ?>
                    <p><?php echo $orderStatusDisplay; ?></p>
                </td>
            </tr>
            <tr class="order-fourth-row"  style="padding-bottom: 10px;">
                <!-- Link Orden -->
                <td colspan="5">
                    <a href="<?php echo site_url('/wp-admin/post.php?post='. $order->data["number"] .'&action=edit'); ?>" target="_blank">Ver Orden</a>
                </td>
            </tr>
            <!-- Separator -->
            <tr>
                <td colspan="5" style="border: none;"></td>
            </tr>
        <?php } ?>
    </tbody>
</table>
<!-- Table Mobile -->
<table class="table-mobile">
    <tbody class="report-body">
        <?php foreach ($orders as $order) { 
            $orderItems = $order->get_items(); ?>
            <tr class="order">
                <!-- Order ID -->
                <td>
                    <p>Nro. De Orden:</p>
                    <p><?php echo $order->data["number"]; ?></p>
                </td>
                <!-- Productor -->
                <td>
                    <p>Productor</p>
                    <p><?php echo $order->data["billing"]["first_name"]; ?> <?php echo $order->data["billing"]["last_name"]; ?></p>
                </td>
            </tr>
            <tr>
                <!-- Productos -->
                <td colspan="2" class="order-products">
                    <p>Productos:</p>
                    <ul>
                    <?php foreach ($orderItems as $item_id => $item) { ?>
                        <li>
                            <p><?php echo $item->get_product()->name; ?> x <?php echo $item->get_quantity(); ?></p>
                            <p><span>Presentación:</span> <?php echo $item->get_meta_data()[0]->value; ?></p>
                            <p><span>Descuento:</span> <?php echo $item->get_data()["meta_data"][1]->value; ?></p> 
                        </li>
                    <?php } ?>
                    </ul>
                </td>
            </tr>
            <tr>
                <!-- Monto Total -->
                <td>
                    <p>Monto Total</p>
                    <?php echo '$ ' . $order->get_total(); ?>
                </td>
                <!-- Código de Descuento -->
                <td>
                    <?php 
                    $codigoDescuento = get_post_meta( $order->id, 'codigo_descuento', true );
                    if ($codigoDescuento == '') {
                        $codigoDescuento = 'Campaña en curso.';
                    }
                    ?>
                    <p>Código de Descuento:</p>
                    <p><?php echo $codigoDescuento; ?></p>
                </td>
            </tr>
            <tr>
                <!-- Veterinaria -->
                <td>
                    <?php 
                    $billingDistributor = get_post_meta( $order->id, 'billing_distributor', true ); ?>
                    <p>Veterinaria:</p>
                    <p><?php echo $billingDistributor; ?></p>
                </td>
                <!-- Técnico/Vendedor -->
                <td>
                    <?php 
                        $tecnicoVendedorID = get_post_meta( $order->id, 'vet_vendedor_id', true );
                        $tecnicoVendedor = get_user_by('id', $tecnicoVendedorID)->display_name;
                    ?>
                    <p>Técnico/Vendedor:</p>
                    <p><?php echo $tecnicoVendedor; ?></p>
                </td>
            </tr>
            <tr>
                <!-- Fecha Orden -->
                <td>
                    <p>Fecha Orden:</p>
                    <p><?php echo $order->order_date; ?></p>
                </td>
                <!-- Campaña -->
                <td>
                    <?php foreach ($order->get_items() as $item_id => $item) { 
                        $terms = get_the_terms( $item['product_id'], 'campaign' ); ?>
                        <p>Campaña:</p>
                        <p><?php echo $terms[0]->name; ?></p>
                        <?php break;
                    } ?>
                </td>
            </tr>
            <tr>
                <!-- Estado Orden -->
                <?php $orderStatus = $order->get_status(); 
                switch ($orderStatus) {
                    case 'processing':
                        $orderStatusDisplay = 'Procesando';
                        break;
                    case 'on-hold':
                        $orderStatusDisplay = 'Límite Máximo Excedido';
                        break;
                    case 'completed':
                        $orderStatusDisplay = 'Completado';
                        break;
                    case 'refunded':
                        $orderStatusDisplay = 'Cancelado';
                        break;
                    default:
                        $orderStatus;
                } ?>
                <td colspan="2" class="<?php echo $orderStatus; ?>">
                    <p>Estado Orden:</p>
                    <p><?php echo $orderStatusDisplay; ?></p>
                </td>
            </tr>
            <tr class="order-fourth-row"  style="padding-bottom: 10px;">
                <!-- Link Orden -->
                <td colspan="5">
                    <a href="<?php echo site_url('/wp-admin/post.php?post='. $order->data["number"] .'&action=edit'); ?>" target="_blank">Ver Orden</a>
                </td>
            </tr>
            <!-- Separator -->
            <tr>
                <td style="border: none;"></td>
            </tr>
        <?php } ?>
    </tbody>
</table>