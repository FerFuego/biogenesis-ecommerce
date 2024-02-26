<?php
/**
 * 
 * Template Name: Veterinarias
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-all-products">
        
            <section class="veterinarias">
                <div class="veterinarias__container container-lg">
                    
                    <!-- Header -->
                    <?php if(get_field('veterinarias_page-title')): ?>
                        <h1 class="veterinarias__title title-xl"><?php the_field('veterinarias_page-title') ?></h1>
                    <?php endif; ?>

                    <?php if(get_field('veterinarias_page-subtitle')): ?>
                        <h3 class="veterinarias__subtitle"><?php the_field('veterinarias_page-subtitle') ?></h3>
                    <?php endif; ?>

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

                    <div class="veterinarias__select-container">
                        <h2 class="veterinarias__filter-title">Buscar por ubicación de la veterinaria</h2>
                        <select name="billing_distributor_province" id="billing_distributor_province">
                            <option value="hidden-prov" hidden="hidden">Provincia</option>
                            <option value="todas">TODAS LAS PROVINCIAS</option>
                            <?php 
                                sort($allDistributorProvince);
                                foreach($allDistributorProvince as $distributorProvince=>$value) {
                                    echo '<option value="' . $value .'">'. $value .'</option>';
                                }
                            ?>
                        </select>
                        <select name="billing_distributor_locality" id="billing_distributor_locality">
                        <option value="hidden-loc" hidden="hidden">Localidad</option>
                            <?php 
                                foreach($allDistributorLocality as $distributorLocality=>$value) {
                                    echo '<option value="' . $value .'">'. $value .'</option>';
                                }
                            ?>
                        </select>

                        <!-- Search -->
                        <div class="vet-search" id="js-search-vet">
                            <h2 class="veterinarias__filter-title">Buscar por nombre</h2>
                            <div class="vet-search__mask"></div>
                            <input type="text" autocomplete="off" placeholder="Nombre de la veterinaria" class="vet-search__input" id="js-search-vet-input" name="billing_distributor_search">
                            <input type="hidden" autocomplete="off" placeholder="Localidad" id="js-search-vet-input-localidad" name="billing_distributor_search-localidad">
                            <input type="hidden" autocomplete="off" placeholder="Provincia" id="js-search-vet-input-provincia" name="billing_distributor_search-provincia">
                            <div class="vet-search__overlay" id="js-search-vet-overlay">
                                <div class="vet-search__spinner" id="js-search-vet-spinner">
                                    <div class="double-bounce1"></div>
                                    <div class="double-bounce2"></div>
                                </div>
                                <datalist class="vet-search__results" id="js-search-vet-results">
                                </datalist>
                            </div>
                        </div>

                    </div>

                    <div class="veterinarias__view">

                        <!-- Listado (Default View) -->
                        <?php get_template_part( 'template-parts/modules/module', 'veterinarias_map_on_load' ); ?>

                    </div>
                    

                </div>
            </section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();