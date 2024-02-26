<?php
/**
 * Cart totals
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-totals.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 2.3.6
 */

defined( 'ABSPATH' ) || exit;

?>
<div class="cart_totals <?php echo ( WC()->customer->has_calculated_shipping() ) ? 'calculated_shipping' : ''; ?>">

	<?php do_action( 'woocommerce_before_cart_totals' ); ?>

	<!-- Order Total (Only Mobile) -->
	<div class="order-total">
		<div data-title="<?php esc_attr_e( 'Total', 'woocommerce' ); ?>">
			<div class="order-total-text">
				Total
			</div>
			<div class="order-total-number">
				<?php wc_cart_totals_order_total_html(); ?>
			</div>
		</div>
	</div>

	<!-- Btns -->
	<div class="cart__btn-section">

		<div class="keep-buying__btn-container">
			<a href="/todos-los-productos" class="keep-buying__btn">Agregar productos</a>
		</div>

		<div class="wc-proceed-to-checkout">
			<?php do_action( 'woocommerce_proceed_to_checkout' ); ?>
		</div>

	</div>



	<?php do_action( 'woocommerce_after_cart_totals' ); ?>

</div>
