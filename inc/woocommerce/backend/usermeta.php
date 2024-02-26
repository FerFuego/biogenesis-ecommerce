<?php 

/* --- CUIT AND RENSPA --- */
// Meta fields
function mysite_custom_define() {
	$custom_meta_fields = array();
    $custom_meta_fields['billing_first_name'] = 'Nombre';
    $custom_meta_fields['billing_last_name'] = 'Apellido';
    $custom_meta_fields['billing_roll'] = 'Rol';
    $custom_meta_fields['billing_phone'] = 'Teléfono Fijo';
    $custom_meta_fields['billing_phone_cel'] = 'Teléfono Celular';
    $custom_meta_fields['billing_email'] = 'Correo';
	$custom_meta_fields['billing_cuit'] = 'CUIT';
	$custom_meta_fields['billing_renspa'] = 'RENSPA';
    $custom_meta_fields['billing_company'] = 'Nombre de establecimiento / Razón Social';
    $custom_meta_fields['billing_province'] = 'Provincia';
    $custom_meta_fields['billing_locality'] = 'Departamento/Localidad';
    $custom_meta_fields['billing_address_1'] = 'Dirección';
	return $custom_meta_fields;
}
/* Create column
function mysite_columns($defaults) {
	$meta_number = 0;
	$custom_meta_fields = mysite_custom_define();
	foreach ($custom_meta_fields as $meta_field_name => $meta_disp_name) {
		$meta_number++;
		$defaults[('mysite-usercolumn-' . $meta_number . '')] = __($meta_disp_name, 'user-column');
	}
	return $defaults;
}*/
/* Fill Column
function mysite_custom_columns($value, $column_name, $id) {
	$meta_number = 0;
	$custom_meta_fields = mysite_custom_define();
	foreach ($custom_meta_fields as $meta_field_name => $meta_disp_name) {
		$meta_number++;
		if( $column_name == ('mysite-usercolumn-' . $meta_number . '') ) {
		return get_the_author_meta($meta_field_name, $id );
		}
	}
}*/
// Show Info
function mysite_show_extra_profile_fields($user) {

	// If User is "Productor" > show additional info
	if ( in_array( 'subscriber', (array) $user->roles ) ) {
		print('<h3>Información Adicional</h3>');

		print('<table class="form-table">');

		$meta_number = 0;
		$custom_meta_fields = mysite_custom_define();
		foreach ($custom_meta_fields as $meta_field_name => $meta_disp_name) {
			$meta_number++;
			print('<tr>');
			print('<th><label for="' . $meta_field_name . '">' . $meta_disp_name . '</label></th>');
			print('<td>');
			print('<input type="text" name="' . $meta_field_name . '" id="' . $meta_field_name . '" value="' . esc_attr( get_the_author_meta($meta_field_name, $user->ID ) ) . '" class="regular-text" /><br />');
			print('<span class="description"></span>');
			print('</td>');
			print('</tr>');
		}
		print('</table>');
	}
}
// Save changes
function mysite_save_extra_profile_fields($user_id) {

	if (!current_user_can('edit_user', $user_id))
	  return false;
  
	$meta_number = 0;
	$custom_meta_fields = mysite_custom_define();
	foreach ($custom_meta_fields as $meta_field_name => $meta_disp_name) {
	  $meta_number++;
	  update_usermeta( $user_id, $meta_field_name, $_POST[$meta_field_name] );
	}
}

add_action('show_user_profile', 'mysite_show_extra_profile_fields');
add_action('edit_user_profile', 'mysite_show_extra_profile_fields');
add_action('personal_options_update', 'mysite_save_extra_profile_fields');
add_action('edit_user_profile_update', 'mysite_save_extra_profile_fields');
//add_action('manage_users_custom_column', 'mysite_custom_columns', 15, 3);
//add_filter('manage_users_columns', 'mysite_columns', 15, 1);   


/* --- Yoast > Remove unused social fields --- */
add_filter('user_contactmethods', 'yoast_seo_admin_user_remove_social');
function yoast_seo_admin_user_remove_social ( $contactmethods ) {
    unset( $contactmethods['facebook'] );
    unset( $contactmethods['instagram'] );
    unset( $contactmethods['linkedin'] );
    unset( $contactmethods['myspace'] );
    unset( $contactmethods['pinterest'] );
    unset( $contactmethods['soundcloud'] );
    unset( $contactmethods['tumblr'] );
    unset( $contactmethods['twitter'] );
    unset( $contactmethods['youtube'] );
    unset( $contactmethods['wikipedia'] );
    return $contactmethods;
}

/* --- Woocomerce > Remove unused shipping and billing info --- */
add_filter( 'woocommerce_customer_meta_fields', 'remove_shipping_fields' );
function remove_shipping_fields( $show_fields ) {
    unset( $show_fields['shipping'] );
	//unset( $show_fields['billing'] );
    return $show_fields;
}



?>