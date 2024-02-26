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

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_lost_password_form' );
?>

<?php $loginBackgroundMobile = get_field('login__background-mobile', 'options') ?>
<div class="reset-password" style="background-image:url('<?php echo wp_is_mobile() && $loginBackgroundMobile ? the_field('login__background-mobile', 'options') : the_field('login__background', 'options'); ?>');">

	<div class="reset-password__container">

		<h2 class="reset-password__copy">El link de recupero no es válido o ya ha sido utilizado.</h2>

		<div class="reset-password__btn-container">
			<a href="/login" class="reset-password__btn" style="text-align: center;">Ingresar</a>
		</div>

	</div>

</div>

<?php
do_action( 'woocommerce_after_lost_password_form' );
