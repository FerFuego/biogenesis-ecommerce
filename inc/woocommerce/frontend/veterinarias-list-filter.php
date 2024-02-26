<?php 

// AJAX Filter > Veterinarias
function filter_veterinarias() {
    $provincia = $_POST['provinceSelected'];
    $localidad = $_POST['localitySelected'];

    // Get All Distributor User 
    $allDistributor = get_users( 'role=distributor' );
    $allDistributorCompleteAddress = [];

    // Magic
    foreach( $allDistributor as $distributor ) {

        $distributorNombreFantasia = get_field('user_distributor_nombre_de_fantasia', 'user_' . $distributor->ID);
        $distributorLocality = get_field('user_distributor_locality', 'user_' . $distributor->ID);
        $distributorProvince = get_field('user_distributor_province', 'user_' . $distributor->ID);
        $distributorStreet = get_field('user_distributor_client_street', 'user_' . $distributor->ID);

        $distributorCompleteAddress = array();

        if (!empty($localidad) && $localidad != 'hidden-loc') {

            if ($distributorLocality == $localidad) {
                array_push($distributorCompleteAddress, $distributorNombreFantasia);
                array_push($distributorCompleteAddress, $distributorProvince);
                array_push($distributorCompleteAddress, $distributorLocality);
                array_push($distributorCompleteAddress, $distributorStreet);
            }
    
            if (!empty($distributorCompleteAddress)) {
                array_push($allDistributorCompleteAddress, $distributorCompleteAddress);
            }
        } else if (!empty($provincia)) {

            if ($provincia == 'todas') {
                array_push($distributorCompleteAddress, $distributorNombreFantasia);
                array_push($distributorCompleteAddress, $distributorProvince);
                array_push($distributorCompleteAddress, $distributorLocality);
                array_push($distributorCompleteAddress, $distributorStreet);
            } elseif ($distributorProvince == $provincia) {
                array_push($distributorCompleteAddress, $distributorNombreFantasia);
                array_push($distributorCompleteAddress, $distributorProvince);
                array_push($distributorCompleteAddress, $distributorLocality);
                array_push($distributorCompleteAddress, $distributorStreet);
            }
    
            if (!empty($distributorCompleteAddress)) {
                array_push($allDistributorCompleteAddress, $distributorCompleteAddress);
            }
        }
    }

    // Response
    $i = 0;
    echo '<div class="spinner" id="js-spinner-veterinarias-list">';
    echo    '<div class="double-bounce1"></div>';
    echo    '<div class="double-bounce2"></div>';
    echo '</div>';
    echo '<div class="veterinarias__mask" id="js-mask-veterinarias-list">';
    echo '</div>';
    echo '<div class="veterinarias__table-header">';
        echo '<p>Veterinaria</p>';
        echo '<p>Provincia</p>';
        echo '<p>Localidad</p>';
        echo '<p>Dirección</p>';
    echo '</div>';
    echo '<div class="veterinarias__table-body">';
    foreach ($allDistributorCompleteAddress as $distributor) {
        echo '<div class="veterinarias__table-row">';
            echo '<p>' . $allDistributorCompleteAddress[$i][0] . '</p>';
            echo '<p>' . $allDistributorCompleteAddress[$i][1] . '</p>';
            echo '<p>' . $allDistributorCompleteAddress[$i][2] . '</p>';
            echo '<p>' . $allDistributorCompleteAddress[$i][3] . '</p>';
        echo '</div>';
        $i++;
    }
    echo '</div>';

    exit;
}
add_action('wp_ajax_filter_veterinarias', 'filter_veterinarias');
add_action('wp_ajax_nopriv_filter_veterinarias', 'filter_veterinarias');
