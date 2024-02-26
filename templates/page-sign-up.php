<?php

/**
 * 
 * Template Name: Registro/Sign Up
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>

<?php $signUpBackgroundMobile = get_field('signUp__background-mobile', 'options') ?>
<div class="sign-up" style="background-image:url('<?php echo wp_is_mobile() && $signUpBackgroundMobile ? the_field('signUp__background-mobile', 'options') : the_field('signUp__background', 'options'); ?>');">

  <div class="sign-up__container">

      <a href="<?php echo get_home_url(); ?>" class="sign-up__close-btn"></a>

      <?php get_template_part( 'template-parts/elements/element', 'form_sign_up_first_step' ); ?>
      <?php get_template_part( 'template-parts/elements/element', 'form_sign_up_second_step' ); ?>

          
      <?php $loginPageLink = get_field('login_page-link', 'options'); ?>
      <div class="sign-up__bottom-cta">
        ¿Ya tienes una cuenta? 
        <a href='<?php echo $loginPageLink['url']; ?>' target='<?php echo $loginPageLink['target']; ?>'>Inicia sesión aquí</a>
      </div>

  </div>
 
</div>

<?php 
get_footer();