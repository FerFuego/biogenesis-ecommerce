<?php

add_role('distributor', __('Distribuidor'), array());
//add_role('productor', __('Productor'), array());

// Remove unused roles
remove_role( 'editor' );
remove_role( 'author' );
remove_role( 'contributor' );
remove_role( 'distribuidor' );
remove_role( 'productor' );


// Is Shop Manager?
function is_shop_manager() {
    $user = wp_get_current_user();

    if ( isset( $user->roles[0] ) && $user->roles[0] == 'shop_manager' ) {
        return true;    // when user is shop manager
    } else {
        return false;   // when user is not shop manager
    }
}

// Rename > "Distribuidor" as "Veterinaria" & "Distribuidor" as "Veterinaria"
function change_distribuidor_role_name() {
    global $wp_roles;

    if ( ! isset( $wp_roles ) )
        $wp_roles = new WP_Roles();
    
    $wp_roles->roles['distributor']['name'] = 'Veterinaria';
    $wp_roles->role_names['distributor'] = 'Veterinaria';           

    $wp_roles->roles['subscriber']['name'] = 'Productor';
    $wp_roles->role_names['subscriber'] = 'Productor';    
}
add_action('init', 'change_distribuidor_role_name');