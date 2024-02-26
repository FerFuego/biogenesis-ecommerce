<?php

// Logout > Redirect Homepage
add_action('wp_logout','logout_redirect');
function logout_redirect(){

    wp_redirect(home_url());
    exit;
}


?>