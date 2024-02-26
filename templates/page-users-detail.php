<?php
/**
 * 
 * Template Name: Detalle Usuarios
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();

$queriedUserID = 12710;
$queriedUser = get_user_by( 'id', 12710 );
$queriedUserMeta = get_user_meta($queriedUserID);

$currentUser = wp_get_current_user();
if ($currentUser->roles[0] != 'administrator') {
    wp_redirect('/login');
}
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main page-detalle-usuarios">

        <br><br><br><br><br><br><br><br><br><br><br><br><br>

        <section>
            <h1><?php echo $queriedUserMeta['billing_first_name'][0] . ' ' . $queriedUserMeta['billing_last_name'][0] ?></h1>
        </section>

        <section class="user-detail__header">
            <h2>Información General</h2>
            <?php var_dump($queriedUser); ?>
        </section>

        <section class="user-detail__billing-profiles">
            <h2>Perfiles de facturación</h2>
            <?php
                $billingProfiles = $queriedUserMeta['perfil_facturacion'];
                $billingProfiles = json_decode($billingProfiles[0], JSON_FORCE_OBJECT);
                $i = 1;
                foreach ($billingProfiles as $billingProfile) { ?>
                <pre><?php // var_dump($billingProfile); ?></pre>
                <h3>Perfil <?php echo $i; ?></h3>
                <div class="user-detail__billing-profile-card">
                    <label for="">Razón Social</label> 
                    <input type="text" id="" value="<?php echo $billingProfile['razon_social']; ?>">
                    <ul>
                        <?php  foreach ($billingProfile['establecimientos'] as $establecimiento) { ?>
                            <li> <?php echo $establecimiento['nombre']; ?> </li>
                        <?php } ?>
                    </ul>
                </div>
                <?php 
                $i++; 
                } ?>            
        </section>

        <section class="user-detail__user-orders">
            <h2>Órdenes</h2>
        </section>

    </main><!-- #main -->
</div><!-- #primary -->

<?php

get_footer();
