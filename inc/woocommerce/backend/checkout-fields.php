<?php 

$userMeta = get_user_meta(get_current_user_id());

// Remove all possible fields
function wc_remove_checkout_fields( $fields ) {

  // Billing fields
  unset( $fields['billing']['billing_state'] );
  unset( $fields['billing']['billing_address_2'] );
  unset( $fields['billing']['billing_city'] );
  unset( $fields['billing']['billing_postcode'] );
  unset( $fields['billing']['billing_address_1'] );
  unset( $fields['billing']['billing_province'] );
  unset( $fields['billing']['billing_locality'] );
  unset( $fields['billing']['billing_country'] );
  unset( $fields['billing']['billing_company'] );
  unset( $fields['billing']['billing_cuit'] );
  unset( $fields['billing']['billing_renspa'] );
  
  // Order fields
  unset( $fields['order']['order_comments'] );

  return $fields;
}
add_filter( 'woocommerce_checkout_fields', 'wc_remove_checkout_fields' );

// Add custom field to the checkout page
add_filter('woocommerce_billing_fields', 'custom_woocommerce_billing_fields');
function custom_woocommerce_billing_fields($fields) {
  $uid = get_current_user_id();
  $userMeta = get_user_meta($uid); 

  $allRolls = array(
    'Productor' => 'Productor', 
    'Veterinario' => 'Veterinario', 
    'Ing Agronomo' => 'Ing Agrónomo', 
    'Zootecnista' => 'Zootecnista', 
    'Lic en Marketing' => 'Lic en Marketing', 
    'Lic en RRHH' => 'Lic en RRHH', 
    'Abogado' => 'Abogado', 
    'Ingeniero (Otro)' => 'Ingeniero (Otro)', 
    'Auxiiar Veterinario' => 'Auxiiar Veterinario', 
    'Lic en Economia Agraria' => 'Lic en economía agraria', 
    'Economista' => 'Economista', 
    'Tecnico Agropecuario' => 'Técnico Agropecuario'
  );

  // Roll
  $fields['billing_roll'] = array(
    'clear' => false, // add clear or not
    'type'          => 'select',
    'class'         => array('form-row-wide form-row--small'),
    'label'         => __('Rol'),
    'required'    => true,
    'options'     => $allRolls 
  );

  $allProvinces = array(
    'Buenos Aires' => 'Buenos Aires', 
    'Capital Federal' => 'Capital Federal', 
    'Catamarca' => 'Catamarca', 
    'Chaco' => 'Chaco', 
    'Chubut' => 'Chubut', 
    'Córdoba' => 'Córdoba', 
    'Corrientes' => 'Corrientes', 
    'Entre Ríos' => 'Entre Ríos', 
    'Formosa' => 'Formosa', 
    'Jujuy' => 'Jujuy', 
    'La Pampa' => 'La Pampa',
    'La Rioja' => 'La Rioja',
    'Mendoza' => 'Mendoza',
    'Misiones' => 'Misiones',
    'Neuquén' => 'Neuquén',
    'Río Negro' => 'Río Negro',
    'Salta' => 'Salta',
    'San Juan' => 'San Juan',
    'San Luis' => 'San Luis',
    'Santa Cruz' => 'Santa Cruz',
    'Santa Fe' => 'Santa Fe',
    'Santiago del Estero' => 'Santiago del Estero',
    'Tierra del Fuego' => 'Tierra del Fuego',
    'Tucumán' => 'Tucumán',
  );

  // Tel Phone
  $fields['billing_phone'] = array(
    'label' => __('Teléfono fijo', 'woocommerce'), 
    'placeholder' => _x('(0011) 2744-8300', 'placeholder', 'woocommerce'), 
    'required' => false, 
    'clear' => false, 
    'type' => 'tel', 
    'class' => array('form-row-wide form-row--small') 
  );

  // Cel Phone
  $fields['billing_phone_cel'] = array(
    'label' => __('Teléfono celular', 'woocommerce'), 
    'placeholder' => _x('(0011) 2744-8300', 'placeholder', 'woocommerce'), 
    'required' => true, 
    'clear' => false, 
    'type' => 'tel', 
    'class' => array('form-row-wide form-row--small') 
  );
  
  // Get All Distributor User 
  $allDistributor = get_users( 'role=distributor' );
  $allDistributorNickName = []; 
  $allDistributorLocality = [];
  $allDistributorProvince = [];

  // Get Nick Name For Distributor
  foreach( $allDistributor as $distributor ) {
    array_push($allDistributorNickName, $distributor->nickname);

    $distributorLocality = get_field('user_distributor_locality', 'user_' . $distributor->ID);
    $distributorLocality && array_push($allDistributorLocality, $distributorLocality);
    

    $distributorProvince = get_field('user_distributor_province', 'user_' . $distributor->ID);
    $distributorProvince && array_push($allDistributorProvince, $distributorProvince);
    
  }
  sort($allDistributorProvince);
  $allDistributorNickName = array_combine($allDistributorNickName, $allDistributorNickName);
  $allDistributorLocality = array_combine($allDistributorLocality, $allDistributorLocality);
  $allDistributorProvince = array_combine($allDistributorProvince, $allDistributorProvince);
  array_unshift( $allDistributorProvince , 'Provincia') ;

  // Select Province
  $fields['billing_distributor_province'] = array(
    'type'          => 'select',
    'class'         => array('form-row-wide js-distributor-select'),
    'label'         => __(''),
    'required'    => false,
    'options'     => $allDistributorProvince,
  );


  // Select Locality
  $fields['billing_distributor_locality'] = array(
    'type'          => 'select',
    'class'         => array('form-row-wide js-distributor-select'),
    'label'         => __(''),
    'required'    => false,
    'options'     => array('Localidad'),
  );

  // Select Distributor
  $fields['billing_distributor'] = array(
    'type'          => 'select',
    'class'         => array('form-row-wide js-distributor-select'),
    'label'         => false,
    'required'    => false,
    'options'     => array('Veterinaria'),
  );

  return $fields;

}

// Make a required field not required
add_filter( 'woocommerce_billing_fields', 'wc_unrequire_fields');
function wc_unrequire_fields( $fields ) {
  $fields['billing_phone']['required'] = false;
  $fields['billing_phone_cel']['required'] = true;
  $fields['billing_roll']['required'] = true;
  return $fields;
}

// Change input field labels and placeholders
add_filter('woocommerce_checkout_fields', 'custom_override_checkout_fields');
function custom_override_checkout_fields($fields) {
	$uid = get_current_user_id();
  $userMeta = get_user_meta($uid); 

  // Billing: name
  $fields['billing']['billing_first_name']['label'] = 'Nombre'; 
  $fields['billing']['billing_first_name']['default'] = $userMeta['billing_first_name'][0];; 
  // Billing: last_name
  $fields['billing']['billing_last_name']['label'] = 'Apellido';
  $fields['billing']['billing_last_name']['default'] = $userMeta['billing_last_name'][0];
  // Billing: phone
  $fields['billing']['billing_phone']['default'] = $userMeta['billing_phone'][0];
  $fields['billing']['billing_phone']['required'] = false;
  // Billing: email
  $fields['billing']['billing_email']['class'] = ['hidden', 'd-none'];
  // Billing: Placeholder
  $fields['billing']['billing_first_name']['placeholder'] = 'Nombre*'; 
  $fields['billing']['billing_last_name']['placeholder'] = 'Apellido*';
  // Shipping: Label
  $fields['shipping']['shipping_first_name']['label'] = 'Nombre';
  $fields['shipping']['shipping_last_name']['label'] = 'Apellido';
  $fields['shipping']['shipping_company']['label'] = 'Nombre del Establecimiento'; 

  // Shipping: Placeholder
  $fields['shipping']['shipping_first_name']['placeholder'] = 'Nombre';
  $fields['shipping']['shipping_last_name']['placeholder'] = 'Apellido';
  $fields['shipping']['shipping_company']['placeholder'] = 'Nombre del Establecimiento'; 

  // Add Class
  $fields['billing']['billing_first_name']['class'] = array('form-row--small'); 
  $fields['billing']['billing_last_name']['class'] = array('form-row--small'); 
  $fields['billing']['billing_roll']['class'] = array('form-row--small'); 
  $fields['billing']['billing_phone']['class'] = array('form-row--small'); 
  $fields['billing']['billing_phone_cel']['class'] = array('form-row--small');
  $fields['billing']['billing_first_name']['priority'] = 10; 
  $fields['billing']['billing_last_name']['priority'] = 20; 
  $fields['billing']['billing_roll']['priority'] = 30; 
  $fields['billing']['billing_phone']['priority'] = 40;
  $fields['billing']['billing_phone_cel']['priority'] = 50;
  $fields['billing']['billing_distributor_province']['priority'] = 140; 
  $fields['billing']['billing_distributor_locality']['priority'] = 150;
  $fields['billing']['billing_distributor']['priority'] = 160; 
  
  return $fields;
 }

 // Save Field Value
 function woocommerce_checkout_update_user_meta( $user_id ) {
  $userMeta = get_user_meta(get_current_user_id());
}
add_action( 'woocommerce_checkout_update_user_meta', 'woocommerce_checkout_update_user_meta', 10, 2 );



