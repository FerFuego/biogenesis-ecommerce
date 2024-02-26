<?php
/** 
 *  - Available Fields -
 * 
 * billing_first_name
 * billing_last_name
 * billing_roll
 * billing_email
 * billing_address_1
 * billing_phone
 * billing_phone_cel
 * billing_cuit
 * billing_renspa
 * billing_locality
 * billing_province
 * billing_company
 * billing_production_system
 * billing_cattle_head_number
 * billing_cattle_type
 * */ 

// Save Fields Value on "Guardar Cambios" click
add_action('wp_ajax_save_user_data', 'save_user_data');
add_action( 'wp_ajax_nopriv_save_user_data', 'save_user_data' );
function save_user_data( $user_id ) {

    $uid = get_current_user_id();
    update_user_meta( $uid, 'billing_first_name', sanitize_text_field( $_POST['billing_first_name'] ) );
    update_user_meta( $uid, 'billing_last_name', sanitize_text_field( $_POST['billing_last_name'] ) );
    update_user_meta( $uid, 'billing_roll', sanitize_text_field( $_POST['billing_roll'] ) );
    update_user_meta( $uid, 'billing_phone', sanitize_text_field( $_POST['billing_phone'] ) );
    update_user_meta( $uid, 'billing_phone_cel', sanitize_text_field( $_POST['billing_phone_cel'] ) );
}

// Remove all possible fields For My Account
add_filter('woocommerce_save_account_details_required_fields', 'wc_remove_my_account_fields');
function wc_remove_my_account_fields( $fields ) {
    unset($fields["billing_email"]);
    unset($fields["account_email"]);
    unset($fields["account_display_name"]);
    unset($fields["account_first_name"]);
    unset($fields["account_last_name"]);

    return $fields;
}

// Billing Profile Generator
add_action('wp_ajax_update_billing_profile_action', 'ajax_update_billing_profile');
add_action('wp_ajax_nopriv_update_billing_profile_action', 'ajax_update_billing_profile');
function ajax_update_billing_profile() {

    if ($_POST['action'] == 'update_billing_profile_action') {

        $billingProfiles = $_POST['perfil_facturacion'];

        $user_id = get_current_user_id();
        
        if (!empty($billingProfiles)) {

            update_user_meta( $user_id, 'perfil_facturacion', $billingProfiles);

            wp_send_json_success(array(
                'isRowUpdate' => true,
                'array' => $billingProfiles,
            ));
        } else {
            wp_send_json_error(array(
                'isRowUpdate' => false,
            ));
        }
    
    }
    
    die();
}