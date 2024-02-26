<?php

// Save order date (for discount code generation)
add_action( 'woocommerce_checkout_update_order_meta', 'purchase_date_save' );
function purchase_date_save( $order_id ) {
    $get_current_date_time = date('his');
    update_post_meta( $order_id, 'purchase_date', sanitize_text_field( $get_current_date_time ) );
}

// Generate Discount Code (and save it in Order Meta)
add_action( 'woocommerce_order_status_completed', 'add_codigo_descuento' );
function add_codigo_descuento($order_id) {
	$order = new WC_Order( $order_id );
	$items = $order->get_items(); 
	$order_date = get_post_meta( $order->id, 'purchase_date', true );
    if ($order_date == '') $order_date = date('his');
	$order_number = $order->get_order_number();
    $order_number  = substr($order_number, -2);
    $gen_id = $order_date . '-' . $order_number; 
    update_post_meta( $order_id, 'codigo_descuento', sanitize_text_field( $gen_id ) );
}

// Add Discount to Items
add_action( 'woocommerce_order_status_processing', 'add_discount_to_item' );
add_action( 'woocommerce_order_status_completed', 'add_discount_to_item' );
function add_discount_to_item($order_id){  
    $order = new WC_Order( $order_id );
    $items = $order->get_items(); 
    foreach ($items as $item_id => $item ) {
        $product = $item->get_product();
        $productVariationPrice = (float) $product->get_price();
        $parentProductId = $product->get_parent_id();
        $qty = (int) $item->get_quantity();
        $productParent =  wc_get_product( $parentProductId );
        $productParentPrice = $productParent->get_price();
        $maxDiscount = get_field('max_discount', $parentProductId);
        $quantitySold = $productParent->get_total_sales();
        $accesToDiscount = get_field('discount_access_units', $parentProductId);
        $absoluteDiscount = $quantitySold * 100 / $accesToDiscount;
        if ($absoluteDiscount > 100) {
          $absoluteDiscount = 100;
        }
		$relativeDiscount = $absoluteDiscount * $maxDiscount / 100;
        $relativeDiscount = intval($relativeDiscount) + 5;
        if ($relativeDiscount > $maxDiscount) $relativeDiscount = $maxDiscount;
        wc_update_order_item_meta($item_id, 'Descuento', $relativeDiscount . '%');
        $item->set_total( $productVariationPrice * $qty - ($productVariationPrice * $relativeDiscount / 100) * $qty );
        $item->save(); 
    }
    $order->calculate_totals(); 

}

// Add max limit exceeded to Order Detail 
add_action( 'woocommerce_order_status_changed', 'add_max_limit_warning' );
function add_max_limit_warning($order_id){  
    $variationsArray = array (); // Max limit on variable products
    $order = new WC_Order( $order_id );
    $items = $order->get_items(); 
    foreach ($items as $item_id => $item ) {
        $product = $item->get_product();
        $parentProductId = $product->get_parent_id();
        $productVariationID = $item['variation_id'];
        $productType = $product->get_type();
        $dosisFrascoMuesta = get_field('dosis-por-frasco', $item['product_id'] );
        $dosisFrasco = get_post_meta( $productVariationID , 'custom_field', true);

        $productMaxLimit = get_field('max-limit', $parentProductId);

        // Quantity		
        if($dosisFrascoMuesta) {
            $quantitySoldThisOrder = $item->get_quantity()*$dosisFrasco;
        } else {
            $quantitySoldThisOrder = $item->get_quantity();
        }

        // Max limit on variable products
        if (in_array($parentProductId, $variationsArray)) {
            $search = array_search($parentProductId, $variationsArray);
            $totalQuantitySoldThisOrder = $quantitySoldThisOrder + $variationsArray[$search + 1];
        } else {
            array_push($variationsArray, $parentProductId, $quantitySoldThisOrder);
        }

        if ($totalQuantitySoldThisOrder) {
            if ($totalQuantitySoldThisOrder > $productMaxLimit) {
                wc_update_order_item_meta($item_id, 'Límite de Unidades', 'Excedido');
                update_post_meta( $order_id, 'product_max_limit_exceeded', sanitize_text_field( 'Límite de Unidades Excedido' ) );
            }
        } else {
            if ($quantitySoldThisOrder > $productMaxLimit) {
                wc_update_order_item_meta($item_id, 'Límite de Unidades', 'Excedido');
                update_post_meta( $order_id, 'product_max_limit_exceeded', sanitize_text_field( 'Límite de Unidades Excedido' ) );
            }
        }


        $billingDistributor = get_post_meta( $order->id, 'billing_distributor', true );
        $billingDistributorMeta = get_user_by('login', $_POST['billing_distributor_vet_id']);
        $bligginDistributorID = $billingDistributorMeta->ID;
        //$billingDistributorEmail = get_field('email-notificaciones-veterinaria', 'user_' . $bligginDistributorID);
        //$billingDistributorEmailAlternative = get_field('email-notificaciones-veterinaria-alternativo', 'user_' . $bligginDistributorID);
        //update_post_meta( $order_id, 'billing_distributor_elecmail', sanitize_text_field( $billingDistributorEmail ) );  
        //( $order_id, 'billing_distributor_elecmail_alternative', sanitize_text_field( $billingDistributorEmailAlternative ) );  
    }
}

// Add Custom Fields to Order Detail
add_action( 'woocommerce_checkout_update_order_meta', 'saving_checkout_cf_data');
function saving_checkout_cf_data( $order_id ) {

    // Provincia y Localidad 
    if (isset($_POST['billing-distributor-type']) && $_POST['billing-distributor-type'] == '0')  { // Search
        $billing_distributor = $_POST['billing_distributor_search'];
        $billing_distributor_locality = $_POST['billing_distributor_search-localidad'];
        $billing_distributor_province = $_POST['billing_distributor_search-provincia'];
    } else if (isset($_POST['billing-distributor-type']) && $_POST['billing-distributor-type'] == '1') { // Select
        $billing_distributor = $_POST['billing_distributor'];
        $billing_distributor_locality = $_POST['billing_distributor_locality'];
        $billing_distributor_province = $_POST['billing_distributor_province'];
    }

    if ( ! empty( $billing_distributor ) )
        update_post_meta( $order_id, 'billing_distributor', sanitize_text_field( $billing_distributor ) );
    if ( ! empty( $billing_distributor_locality ) )
        update_post_meta( $order_id, 'billing_distributor_locality', sanitize_text_field( $billing_distributor_locality ) );
    if ( ! empty( $billing_distributor_province ) )
        update_post_meta( $order_id, 'billing_distributor_province', sanitize_text_field( $billing_distributor_province ) );

    // Adress
    $billing_distributor_address = $_POST['billing_distributor_address'];
    update_post_meta($order_id, 'vet_street', sanitize_text_field( $billing_distributor_address ));
        
    // ID Veterinaria
    $bligginDistributorID = 0;
    if ( ! empty( $_POST['billing_distributor_vet_id'] )) {
        $bligginDistributorID = $_POST['billing_distributor_vet_id'];
        update_post_meta( $order_id, 'vet_id', sanitize_text_field( $bligginDistributorID ) );
    }

    // Técnico/Vendedor
    if (isset($_POST['billing_distributor_vet_vendedor'])) {
        update_post_meta($order_id, 'vet_vendedor_id', sanitize_text_field($_POST['billing_distributor_vet_vendedor']));
    }

    // Select Billing Profile
    if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '0')  {
        $selectedProfile = 0;
    } else if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '1') {
        $selectedProfile = 1;
    } else if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '2') {
        $selectedProfile = 2;
    } else if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '3') {
        $selectedProfile = 3;
    } else if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '4') {
        $selectedProfile = 4;
    } else if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '5') {
        $selectedProfile = 5;
    } else if (isset($_POST['billing-profile-checkbox']) && $_POST['billing-profile-checkbox'] == '6') {
        $selectedProfile = 6;
    } else {
        $selectedProfile = 0;
    }

    // Add Billing Profile 
    $uid = get_current_user_id();	
    $userMeta = get_user_meta($uid); 
    $billingProfiles = $userMeta['perfil_facturacion'];
    $billingProfiles = json_decode($billingProfiles[0], JSON_FORCE_OBJECT); 
    $billingCuit = $billingProfiles[$selectedProfile]['cuit'];
    $billingRazonSocial = $billingProfiles[$selectedProfile]['razon_social'];
    update_post_meta($order_id, 'billing_profiles', $billingProfiles);
    update_post_meta($order_id, 'billing_razon_social', $billingRazonSocial);
    update_post_meta($order_id, 'billing_cuit', $billingCuit);

    /* Cambio de Veterinaria - Determine if distributor changed and update order meta's */
    do_action('check_distributor_change', $order_id, $bligginDistributorID, $billing_distributor);

    // Distributor Email
    $billingDistributorEmail = $_POST['billing_distributor_elecmail'];
    $billingDistributorEmailAlternative = $_POST['billing_distributor_elecmail-alternative'];
    update_post_meta( $order_id, 'billing_distributor_elecmail', sanitize_text_field( $billingDistributorEmail ) );  
    update_post_meta( $order_id, 'billing_distributor_elecmail_alternative', sanitize_text_field( $billingDistributorEmailAlternative ) );  

}

// Display Custom Fields in Order Detail
add_action( 'woocommerce_admin_order_data_after_order_details', 'display_additional_info_in_order_detail' );
function display_additional_info_in_order_detail( $order ){ 
    ?>
        <div class="order_data_column" style="width:100%">
            <h3>Información adicional</h3>
            <?php 
                // Código Descuento
                $codigoDescuento = get_post_meta( $order->id, 'codigo_descuento', true );
                if ($codigoDescuento == '') {
                    $codigoDescuento = 'Esperando cierre de campaña.';
                }
                echo '<p><strong>' . __( 'Código de descuento' ) . ': </strong><br>' . $codigoDescuento . '</p>';
            ?>
            <br class="clear" />
            <?php
                // Veterinaria
                $billingDistributor = get_post_meta( $order->id, 'billing_distributor', true );
                $billingDistributorID = get_post_meta( $order->id, 'vet_id', true );
                $billingDistributorEmail = get_post_meta( $order->id, 'billing_distributor_elecmail', true );
                $billingDistributorEmailAlternative = get_post_meta( $order->id, 'billing_distributor_elecmail_alternative', true );
                $billing_distributor_locality = get_post_meta( $order->id, 'billing_distributor_locality', true );
                $billing_distributor_province = get_post_meta( $order->id, 'billing_distributor_province', true );
                $tecnicoVendedorID = get_post_meta( $order->id, 'vet_vendedor_id', true );
                $tecnicoVendedorNameOrder = get_user_by('id', $tecnicoVendedorID)->display_name;
                // Edit Veterinaria
                $allDistributors = get_users([
                    'role__in' => 'distributor',
                ]);
                foreach ($allDistributors as $distributor) {
                    $vetName = get_field('user_distributor_nombre_de_fantasia', 'user_'.$distributor->ID); 
                    $vetOptions[$distributor->ID] = $vetName;
                    // Check if distributor exist to be selected
                    if ($billingDistributor === $vetName) 
                        $billingDistributorID = $distributor->ID;
                }
            ?>
            <a href="#" class="edit_address">Edit</a>
            <div class="address">
                <?php
                    echo '<p><strong>' . __( 'Veterinaria' ) . ': </strong></p>';
                    echo '<p>' . $billingDistributorID .' - ' . $billingDistributor. '</p>';
                    echo '<p>' . $billing_distributor_locality . ', ' . $billing_distributor_province . '</p>';
                    echo '<p>' . $billingDistributorEmail . '<br>' . $billingDistributorEmailAlternative . '</p>';
                    echo '<p><strong>' .__( 'Vendedor/Técnico' ) .': </strong>' . $tecnicoVendedorNameOrder . '</p>';
                ?>
            </div>
            <div class="edit_address">
                <?php
                    woocommerce_wp_select( array(
                        'id' => 'billing_distributor_id',
                        'label' => 'Veterinaria:',
                        'options' => $vetOptions,
                        'value' => $billingDistributorID,
                        'wrapper_class' => 'form-field-wide'
                    ) );                    
                ?>
            </div>
            <?php
                // Max limit exceeded?
                $productMaxLimitExceeded = get_post_meta( $order->id, 'product_max_limit_exceeded', true );
                if ($productMaxLimitExceeded) {
                    echo '<p style="color: red;"><strong>' . __( 'Límite de Unidades Excedido' ) . '</strong></p>';
                }
            ?>
        </div>
    <?php 
}

// Display Custom Fields in Order Detail and Allow Edit
add_action( 'woocommerce_admin_order_data_after_billing_address', 'editable_order_meta_general' );
function editable_order_meta_general( $order ){  ?>
   
		<br class="clear" />
		<a href="#" class="edit_address">Edit</a>
		<?php 
            $razonSocial = get_post_meta( $order->id, 'billing_razon_social', true );
            $cuit = get_post_meta( $order->id, 'billing_cuit', true );
            $customerId = $order->get_customer_id();
            $customerMeta = get_user_meta($customerId);
            $perfilesFacturacion = $customerMeta['perfil_facturacion'][0];
            $perfilesFacturacion = json_decode($perfilesFacturacion, JSON_FORCE_OBJECT);

            $razonSocialKeys = array();
            $razonSocialValues = array();

            $cuitKeys = array();
            $cuitValues = array();
            
            foreach ($perfilesFacturacion as $perfilFacturacion) {
                array_push($razonSocialKeys, $perfilFacturacion['razon_social']);
                array_push($razonSocialValues, $perfilFacturacion['razon_social']);
                array_push($cuitKeys, $perfilFacturacion['cuit']);
                array_push($cuitValues, $perfilFacturacion['cuit']);
            }

            $razonSocialOptions = array_combine($razonSocialKeys, $razonSocialValues);
            $cuitOptions = array_combine($cuitKeys, $cuitValues);
		?>
		<div class="address">
			<?php
				?>
					<p><strong>Razón Social:</strong> <?php echo $razonSocial ?></p>
					<p><strong>CUIT:</strong> <?php echo $cuit ?></p>
				<?php
			?>
		</div>
		<div class="edit_address"><?php
		            
			woocommerce_wp_select( array(
				'id' => 'billing_razon_social',
				'label' => 'Razón Social:',
				'value' => $razonSocial,
				'options' => $razonSocialOptions,
				'wrapper_class' => 'form-field-wide'
			) );
            
			woocommerce_wp_select( array(
				'id' => 'billing_cuit',
				'label' => 'CUIT:',
				'value' => $cuit,
                'options' => $cuitOptions,
				'wrapper_class' => 'form-field-wide'
			) );
            
		?></div>
   
    
<?php }

add_action( 'woocommerce_process_shop_order_meta', 'save_general_details' );
function save_general_details( $ord_id ){
    // Veterinaria
    $newDistributorID = wc_clean($_POST[ 'billing_distributor_id' ]);
    update_post_meta( $ord_id, 'billing_distributor',  get_field('user_distributor_nombre_de_fantasia', 'user_'.$newDistributorID));
    update_post_meta( $ord_id, 'billing_distributor_locality', get_field('user_distributor_locality', 'user_'.$newDistributorID) );
    update_post_meta( $ord_id, 'billing_distributor_province', get_field('user_distributor_province', 'user_'.$newDistributorID) );
    update_post_meta( $ord_id, 'billing_distributor_elecmail', get_field('email-notificaciones-veterinaria', 'user_'.$newDistributorID) );
    update_post_meta( $ord_id, 'billing_distributor_elecmail_alternative', get_field('email-notificaciones-veterinaria-alternativo', 'user_'.$newDistributorID) );
    update_post_meta( $ord_id, 'vet_vendedor_id', get_field('user_distributor_tecnico-vendedor', 'user_'.$newDistributorID)->ID );
    // Facturación
	update_post_meta( $ord_id, 'billing_razon_social', wc_clean( $_POST[ 'billing_razon_social' ] ) );
	update_post_meta( $ord_id, 'billing_cuit', wc_clean( $_POST[ 'billing_cuit' ] ) );
	// wc_clean() and wc_sanitize_textarea() are WooCommerce sanitization functions
}

// Determine if distributor changed and update order meta's
add_action( 'check_distributor_change', 'check_distributor_change', 10, 3 );
function check_distributor_change( $order_id, $bligginDistributorID, $billing_distributor ) {
    // Get Orders of Distributor
	$orders = wc_get_orders([
        'customer_id' => get_current_user_id(),
        'limit' => -1, 
        'orderby' => 'date', 
        'order' => 'ASC',
    ]);
    // Get number of orders
    $ordersCount = count( $orders ); 
    // Delete last order (current order)
    array_pop( $orders ); 
    // Get last order (previous order)
    $lastOrder = end( $orders ); 
    $last_distributor = ($lastOrder) ? get_post_meta($lastOrder->get_id(), 'last_distributor', true) : '';

    // New Methd verification
    if ( $last_distributor === $bligginDistributorID || $ordersCount === 1 || $last_distributor === "" ) {
        // Validation of ID
        update_post_meta($order_id, 'same_distributor', true);
    } else if ( trim(strtoupper($last_distributor)) === trim(strtoupper($billing_distributor)) ) {
        // Validation of Name
        update_post_meta($order_id, 'same_distributor', true);
    } else {
        // No matches
        update_post_meta($order_id, 'same_distributor', false);
    }
    // Update Last Distributor
    update_post_meta($order_id, 'last_distributor', $bligginDistributorID);
}