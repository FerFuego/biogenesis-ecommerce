<?php
add_action('wp_ajax_check_lost_password', 'check_lost_password');
add_action('wp_ajax_nopriv_check_lost_password', 'check_lost_password');

function check_lost_password () {
    if ( email_exists(sanitize_text_field($_POST['email'])) ) {
        wp_send_json_success([
            'message' => '<p class="text-success">Email registrado</p>',
        ]);
    } else {
        wp_send_json_error([
            'message' => '<p class="text-danger">No se encontró ningún usuario registrado con este mail.</p>',
        ]);
    }
}