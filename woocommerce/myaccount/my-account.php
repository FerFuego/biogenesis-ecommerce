<?php
/**
 * My Account page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/my-account.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * My Account navigation.
 *
 * @since 2.6.0
 */
?>

<div class="woocommerce-MyAccount-content my-account">

	<!-- AJAX Mask + Spinner -->
	<div class="my-account__mask" id="js-my-account-mask">
		<div class="my-account__spinner" id="js-my-account-spinner">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
	</div>
	
	<h1 class="my-account__title title-xl js-fade-in-up">Mi Perfil</h1>

	<!-- Form Edit Account -->
	<div class="js-fade-in-up">
		<?php    
			wc_get_template( 'myaccount/form-edit-account.php');
		?>
	</div>

	<!-- Orders (log) -->
	<div class="my-orders js-fade-in-up">
		<?php    
			wc_get_template( 'myaccount/my-orders.php', array(
					'current_user'  => get_user_by( 'id', get_current_user_id() ),
			));
		?>
	</div>
	
	<div class="d-none">
		<?php do_action( 'woocommerce_account_content' ); ?>
	</div>

</div>

<div class="js-fade-in-up">
	<?php do_action( 'woocommerce_account_navigation' ); ?>
</div>

<!-- Delete Profile Modal -->
<?php get_template_part('template-parts/modules/module', 'delete_profile_modal'); ?>

<!-- Cancel Order -->
<?php get_template_part('template-parts/modules/module', 'cancel_order_modal'); ?>



