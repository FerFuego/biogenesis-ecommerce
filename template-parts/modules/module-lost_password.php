<?php
/**
 * Lost password form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/form-lost-password.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.2
 */

defined( 'ABSPATH' ) || exit; ?> 

<div class="recovery" id="js-recovery-modal">

	<div class="recovery__container">

		<div class="recovery__close-btn" id="js-recovery-modal-close">
        </div>

		<form method="post" class="woocommerce-ResetPassword lost_reset_password">

			<?php if(get_field('lost_password_title', 'options')): ?>
				<h2 class="recovery__title"><?php the_field('lost_password_title', 'options') ?></h2>
			<?php endif; ?>

			<?php if(get_field('lost_password_text', 'options')): ?>
				<h3 class="recovery__subtitle recovery__subtitle--sm"><?php the_field('lost_password_text', 'options') ?></h3>
			<?php endif; ?>

			<div class="recovery__icon-container">
            	<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/lost-password-lock.svg" alt="Lost Password Icon">
        	</div>

			<p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
				<input class="woocommerce-Input woocommerce-Input--text input-text" type="text" name="user_login" placeholder="Email" id="user_login" autocomplete="username" />
			</p>

			<div class="clear"></div>

			<?php do_action( 'woocommerce_lostpassword_form' ); ?>

			<div class="woocommerce-form-row form-row recovery__btn-container recovery__btn-container--recovery">
				<input type="hidden" name="wc_reset_password" value="true" />
				<button type="submit" class="woocommerce-Button button recovery__btn recovery__btn--inverted" id="js-lost-password-submit-btn" value="<?php esc_attr_e( 'Reset password', 'woocommerce' ); ?>" disabled><?php esc_html_e( 'Enviar', 'woocommerce' ); ?></button>
				<button class="woocommerce-Button button recovery__btn recovery__btn--success" id="js-lost-password-submit-btn" value="<?php esc_attr_e( 'Reset password', 'woocommerce' ); ?>" disabled><?php esc_html_e( 'Correo Enviado', 'woocommerce' ); ?></button>
			</div>

			<h4 class="recovery__try-again">¿No recibiste la información? <span class="js-lost-password-btn">Probar de nuevo</span></h4>

			<?php wp_nonce_field( 'lost_password', 'woocommerce-lost-password-nonce' ); ?>

		</form>
		
		<?php do_action( 'woocommerce_before_lost_password_form' ); ?>

		<?php do_action( 'woocommerce_after_lost_password_form' ); ?>
		
	</div>

</div>