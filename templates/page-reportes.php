<?php
/**
 * 
 * Template Name: Reportes
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();

$currentUser = wp_get_current_user();

$vetID = sanitize_text_field( get_query_var( 'vetid' ) );

?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-reportes <?php echo (is_user_logged_in() && $currentUser->roles[0] == 'administrator') ? 'admin' : ''; ?>">

        <!-- Header -->
        <section class="reports__header container-lg">
            <h1 class="title-xl js-fade-in-up">Reportes</h1>
        </section>

        <?php if (is_user_logged_in() && ($currentUser->roles[0] == 'administrator' || $currentUser->roles[0] == 'vendedor' || $currentUser->roles[0] == 'tecnico')) { ?>

            <!-- Setup Page -->
            <?php 
                $currentDateQuery = current_time('Y-m-d');
                if ($currentUser->roles[0] == 'vendedor' || $currentUser->roles[0] == 'tecnico') {
                    $args = array(
                        'posts_per_page' => '-1',
                        'date_before' => current_time('Y-m-d'),  
                        'date_after' => '2015-01-01', 
                        'vet_vendedor_id' => $currentUser->ID,
                        'type' => 'shop_order',
                        'orderby' => 'ID',
                        'order' => 'DESC'
                    ); 
                } else {
                    $args = array(
                        'posts_per_page' => '-1',
                        'date_before' => current_time('Y-m-d'),  
                        'date_after' => '2015-01-01',
                        'billing_distributor' => $vetID,
                        'type' => 'shop_order',
                        'orderby' => 'ID',
                        'order' => 'DESC'
                    ); 
                }

                $orders = wc_get_orders( $args ); 
            ?> 
            <div id="js-current-user-id" style="display: none;"><?php echo $currentUser->ID; ?></div>

            <!-- Filter -->
            <section class="reports__filters container-lg">
                <!-- Opciones -->
                <div class="reports__filters-options">
                    <!-- Campaña -->
                    <div>
                        <label for="filter-campaign">Campaña:</label>
                        <select name="report__filter-campaign" id="filter-campaign">
                            <option disabled selected hidden>Seleccionar Campaña</option>
                            <option>Todas las Campañas</option>
                            <?php $terms = get_terms( array(
                                'taxonomy' => 'campaign',
                                'hide_empty' => false,
                            )); 
                            foreach ($terms as $term) { ?>
                                <option value="<?php echo $term->term_id ?>"><?php echo $term->name ?></option>
                            <?php } ?>
                        </select>
                    </div>
                    <!-- Veterinaria -->
                    <div>
                        <?php $veterinarias = get_users(
                            array(
                                'role__in' => 'distributor',
                            )
                        ); 
                        sort($veterinarias);?>
                        <label for="filter-veterinaria">Veterinaria:</label>
                        <select name="report__filter-veterinaria" id="filter-veterinaria">
                            <option value="todas" disabled selected hidden>Seleccionar Veterinaria</option>
                            <option value="todas">Todas las Veterinarias</option>
                            <?php foreach ($veterinarias as $veterinaria) { 
                                $vetName = get_field('user_distributor_nombre_de_fantasia', 'user_'.$veterinaria->ID); 
                                $vetTecnicoVendedor = get_field('user_distributor_tecnico-vendedor','user_'.$veterinaria->ID); 
                                if ($currentUser->roles[0] == 'administrator') : ?>
                                    <option value="<?php echo $vetName ?>"><?php echo $vetName; ?></option> 
                                <?php elseif (($vetTecnicoVendedor->ID == $currentUser->ID)) : ?>
                                    <option value="<?php echo $vetName ?>"><?php echo $vetName; ?></option> 
                                <?php endif; ?>                        
                            <?php } ?>
                        </select>
                    </div>
                    <!-- Order Status -->
                    <div>
                        <label for="filter-order-status">Estado Orden:</label>
                        <select name="report__filter-order-status" id="filter-order-status">
                            <option value="todos" disabled selected hidden>Estado de la Orden</option>
                            <option value="todos">Todos los estados</option>
                            <option value="processing">Procesando</option>
                            <option value="on-hold">Límite Máximo Excedido</option>
                            <option value="completed">Completada</option>
                            <option value="refunded">Cancelada</option>
                        </select>
                    </div>
                </div>
                <!-- Botones -->
                <div class="reports__filters-btns">
                    <button name="submitFilter" class="button button--outline" id="js-filter-submit">Filtrar</button>
                    <button name="report-csv-download" class="button button--outline" id="js-reports-csv-download">Descargar CSV</button>
                </div>
            </section>

            <!-- Info -->
            <section class="reports__info container-lg">
                <p>Cantidad de Órdenes: <span id="js-report-orders-count"><?php echo(count($orders)); ?></span></p>
            </section>

            <!-- Report Table -->
            <section class="report-wrap container-lg">

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
                            $orderItems = $order->get_items(); 
                            $customerID = $order->get_user_id(); ?>
                            <tr class="order">
                                <!-- Order ID -->
                                <td>
                                    <p>Nro. De Orden:</p>
                                    <p><?php echo $order->data["number"]; ?></p>
                                </td>
                                <!-- Productor -->
                                <td>
                                    <p>Productor</p>
                                    <?php if (is_user_logged_in() && $currentUser->roles[0] == 'administrator') : ?>
                                        <a href="<?php echo site_url('/wp-admin/user-edit.php?user_id='.$customerID); ?>" target="_blank"><?php echo $order->data["billing"]["first_name"]; ?> <?php echo $order->data["billing"]["last_name"]; ?></a>
                                    <?php else : ?>
                                        <p><?php echo $order->data["billing"]["first_name"]; ?> <?php echo $order->data["billing"]["last_name"]; ?></p>
                                    <?php endif; ?>
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
                                            <p><span>Precio (total sin descuento):</span> <?php echo '$' . number_format($item->get_subtotal(), 2); ?></p>
                                            <p><span>Precio (total con descuento):</span> <?php echo '$' . number_format($item->get_total(), 2); ?></p>
                                        </li>
                                    <?php } ?>
                                    </ul>
                                </td>
                                <!-- Monto Total -->
                                <td>
                                    <p>Monto Total</p>
                                    <p><span> Sin descuento:</span><?php echo ' $' . number_format($order->get_subtotal(), 2); ?></p>
                                    <p><span> Con descuento:</span><?php echo ' $' . number_format($order->get_total(), 2); ?></p>
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
                                    <p><?php echo date_format($order->get_date_created(),"d/m/Y"); ?></p>
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
                            $orderItems = $order->get_items(); 
                            $customerID = $order->get_user_id(); ?>
                            <tr class="order">
                                <!-- Order ID -->
                                <td>
                                    <p>Nro. De Orden:</p>
                                    <p><?php echo $order->data["number"]; ?></p>
                                </td>
                                <!-- Productor -->
                                <td>
                                    <p>Productor</p>
                                    <?php if (is_user_logged_in() && $currentUser->roles[0] == 'administrator') : ?>
                                        <a href="<?php echo site_url('/wp-admin/user-edit.php?user_id='.$customerID); ?>" target="_blank"><?php echo $order->data["billing"]["first_name"]; ?> <?php echo $order->data["billing"]["last_name"]; ?></a>
                                    <?php else : ?>
                                        <p><?php echo $order->data["billing"]["first_name"]; ?> <?php echo $order->data["billing"]["last_name"]; ?></p>
                                    <?php endif; ?>
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
                                    <?php echo wc_price($order->get_total()); ?>
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
                                    <p><?php echo date_format($order->get_date_created(),"d/m/Y"); ?></p>
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

            </section>

        <?php } else { 
            wp_redirect('/login');
        } ?>

        </main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();


