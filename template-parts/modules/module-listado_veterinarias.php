<!-- Veterinarias Select -->
<?php   
    // Get All Distributor User 
    $allDistributor = get_users( 'role=distributor' );
    $alldistributorStreet = [];
    $alldistributorNombreFantasia = [];
    $allDistributorLocality = [];
    $allDistributorProvince = []; 
    $allDistributorComplete = [];
    $allDistributorCompleteAddress = [];
    // Get Nick Name For Distributor
    foreach( $allDistributor as $distributor ) {

        $distributorCompleteAddress = array();

        $distributorNombreFantasia = get_field('user_distributor_nombre_de_fantasia', 'user_' . $distributor->ID);
        array_push($distributorCompleteAddress, $distributorNombreFantasia);
        array_push($alldistributorNombreFantasia, $distributorNombreFantasia);

        $distributorProvince = get_field('user_distributor_province', 'user_' . $distributor->ID);
        array_push($distributorCompleteAddress, $distributorProvince);
        array_push($allDistributorProvince, $distributorProvince);

        $distributorLocality = get_field('user_distributor_locality', 'user_' . $distributor->ID);
        array_push($distributorCompleteAddress, $distributorLocality);
        array_push($allDistributorLocality, $distributorLocality);

        $distributorStreet = get_field('user_distributor_client_street', 'user_' . $distributor->ID);
        array_push($distributorCompleteAddress, $distributorStreet);
        array_push($alldistributorStreet, $distributorStreet);
        
        array_push($allDistributorCompleteAddress, $distributorCompleteAddress);
    }
    $alldistributorNombreFantasia = array_combine($alldistributorNombreFantasia, $alldistributorNombreFantasia);
    $alldistributorStreet = array_combine($alldistributorStreet, $alldistributorStreet);
    $allDistributorLocality = array_combine($allDistributorLocality, $allDistributorLocality);
    $allDistributorProvince = array_combine($allDistributorProvince, $allDistributorProvince);
?>

<!-- Listado -->
<div class="veterinarias__table">

    <!-- AJAX Spinner -->
    <div class="spinner" id="js-spinner-veterinarias-list">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
    <!-- Mask -->
    <div class="veterinarias__mask" id="js-mask-veterinarias-list">
    </div>

    <!-- Table Header -->
    <div class="veterinarias__table-header">
        <p>Veterinaria</p>
        <p>Provincia</p>
        <p>Localidad</p>
        <p>Dirección</p>
    </div>
    <!-- Table Body -->
    <div class="veterinarias__table-body">
        <!-- Table Row -->        
        <?php
        sort($allDistributorCompleteAddress);
        foreach($allDistributorCompleteAddress  as $distributor) {
            echo '<div class="veterinarias__table-row">';
                echo '<p>' . $distributor[0] .'</p>';
                echo '<p>' . $distributor[1] . '</p>';
                echo '<p>' . $distributor[2] . '</p>';
                echo '<p>' . $distributor[3] . '</p>';
            echo '</div>';
        }
        ?>
    </div>
</div> 

<!-- CTA --> 
<div class="veterinarias__change-view js-veterinarias-map-view">Ver Mapa</div>