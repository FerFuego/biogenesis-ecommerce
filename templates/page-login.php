<?php

/**
 * 
 * Template Name: Login
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>

<?php $loginBackgroundMobile = get_field('login__background-mobile', 'options') ?>
<div class="login" style="background-image:url('<?php echo wp_is_mobile() && $loginBackgroundMobile ? the_field('login__background-mobile', 'options') : the_field('login__background', 'options'); ?>');">

    <div class="login__container">

        <a href="<?php echo get_home_url(); ?>" class="login__close-btn"></a>

        <h2 class="login__title">Ingresar con tu Cuenta</h2>

        <form id="login" action="<?php echo admin_url( 'admin-ajax.php' ); ?>" method="post">
            <div class="field-email">
                <label for="username" class="login__label">Email</label>
                <input id="username" type="text" name="username">
            </div>

            <div class="field-password">
                <label for="password" class="login__label">Contraseña</label>
                <input id="password" type="password" name="password">
                <div class="login__change-view" id="js-change-btn-password"></div>
            </div>

            <p class="error-message" id="js-login-status"></p>
            <?php $lostPasswordLink = get_field('lost-password-link', 'options'); ?>
            <?php if ($lostPasswordLink) : ?>
                <a href='<?php echo $lostPasswordLink  ['url']; ?>' target='<?php echo $lostPasswordLink   ['target']; ?>' class="lost"><?php echo $lostPasswordLink  ['title']; ?></a>
            <?php endif; ?>
            <div class="btn-container">
                <a class="submit_button button" id="js-login-submit-btn" type="submit" value="Ingresar" name="submit">Ingresar</a>
            </div>

            <?php $signUpPageLink = get_field('sign-up_page-link', 'options'); ?>
            <h5 class="new">¿Todavía no tienes Cuenta? <a href='<?php echo $signUpPageLink['url']; ?>' target='<?php echo $signUpPageLink['target']; ?>'>Registrarse aquí</a></h5>

            <?php wp_nonce_field('ajax-login-nonce', 'security'); ?>
        </form>

    </div>

</div>

<?php 
get_footer();