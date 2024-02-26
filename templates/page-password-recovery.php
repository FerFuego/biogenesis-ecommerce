<?php

/**
 * 
 * Template Name: Recuperar Contraseña
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

if ( !is_user_logged_in() ) {

get_header();
?>

<?php $loginBackgroundMobile = get_field('login__background-mobile', 'options') ?>
<div class="recovery" id="js-recovery-modal"  style="background-image:url('<?php echo wp_is_mobile() && $loginBackgroundMobile ? the_field('login__background-mobile', 'options') : the_field('login__background', 'options'); ?>');">

	<div class="recovery__container">

		<div class="recovery__close-btn" id="js-recovery-modal-close">
        </div>

		<form method="post" class="woocommerce-ResetPassword lost_reset_password" onkeydown="return event.key != 'Enter';">

			<div class="recovery__icon-container">
            	<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/lost-password-lock.svg" alt="Lost Password Icon">
        	</div>

			<?php if(get_field('lost_password_title', 'options')): ?>
				<h2 class="recovery__title"><?php the_field('lost_password_title', 'options') ?></h2>
			<?php endif; ?>

			<?php if(get_field('lost_password_text', 'options')): ?>
				<h3 class="recovery__subtitle recovery__subtitle--sm"><?php the_field('lost_password_text', 'options') ?></h3>
			<?php endif; ?>

			<p class="recovery__input woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
				<label for="user_login" class="recovery__label">Email</label>
				<input class="woocommerce-Input woocommerce-Input--text input-text js-recovery-mail" type="text" name="user_login" id="user_login" placeholder="Correo Electrónico no válido" autocomplete="username" />
				<div class="pt-2" id="js-lostpass-message"></div>
			</p>

			<div class="recovery__input-succes"> 
				<h4>¡Listo! Hemos enviado a tu email las instrucciones a seguir.<br> ¿No recibiste la información? <span id="js-lost-password-btn">Enviar de nuevo</span></h4>
			</div>

			<div class="clear"></div>

			<?php do_action( 'woocommerce_lostpassword_form' ); ?>

			<div class="woocommerce-form-row form-row recovery__btn-container recovery__btn-container--recovery">
				<input type="hidden" name="wc_reset_password" value="true" />
				<button type="submit" class="woocommerce-Button button recovery__btn recovery__btn--inverted" id="js-lost-password-submit-btn" value="<?php esc_attr_e( 'Reset password', 'woocommerce' ); ?>" disabled><?php esc_html_e( 'Enviar', 'woocommerce' ); ?></button>
				<button class="woocommerce-Button button recovery__btn recovery__btn--success" id="js-lost-password-submit-btn" value="<?php esc_attr_e( 'Reset password', 'woocommerce' ); ?>" disabled><?php esc_html_e( 'Correo Enviado', 'woocommerce' ); ?></button>
			</div>

			<?php wp_nonce_field( 'lost_password', 'woocommerce-lost-password-nonce' ); ?>

		</form>
		
		<?php do_action( 'woocommerce_before_lost_password_form' ); ?>

		<?php do_action( 'woocommerce_after_lost_password_form' ); ?>
		
	</div>

</div>

<?php 
get_footer();

} 