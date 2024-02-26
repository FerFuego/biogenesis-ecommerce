<?php
/**
 * Single variation cart button
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

global $product;
?>
<div class="woocommerce-variation-add-to-cart variations_button <?php echo !(get_field('dosis-por-frasco')) ? 'no-dosis' : '' ?>">
	<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

	<?php
	do_action( 'woocommerce_before_add_to_cart_quantity' );

	woocommerce_quantity_input(
		array(
			'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
			'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
			'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
		)
	);

	do_action( 'woocommerce_after_add_to_cart_quantity' );
	?>

	<div class="dosis-calculator <?php echo !(get_field('dosis-por-frasco')) ? 'd-none' : '' ?>">
		<h3 class="dosis-calculator__text">(<span id="js-total-dosis"></span> Dosis)</h3>
	</div>

	<div class="single_add_to_cart_button__btn-container">
		<button type="submit" class="single_add_to_cart_button button alt">
			<span><?php echo esc_html( $product->single_add_to_cart_text() ); ?></span>
			<!-- Loading Icon -->
			<div class="loading-icon lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
			<!-- Succes Icon-->
			<div class="added-icon">
				<div class="added-icon__tip"></div>
				<div class="added-icon__long"></div>
			</div>
		</button>
	</div>

	<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>
	<input type="hidden" name="add-to-cart" value="<?php echo absint( $product->get_id() ); ?>" />
	<input type="hidden" name="product_id" value="<?php echo absint( $product->get_id() ); ?>" />
	<input type="hidden" name="variation_id" class="variation_id" value="0" />
</div>
