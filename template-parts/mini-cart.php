<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/mini-cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;

?>

<div class="mini-cart" id="js-mini-cart-empty">

	<?php do_action( 'woocommerce_before_mini_cart' ); 

	if ( ! WC()->cart->is_empty() ) : ?>

</div>

<div class="mini-cart" id="js-mini-cart">

	<ul class="woocommerce-mini-cart cart_list product_list_widget <?php echo esc_attr( $args['list_class'] ); ?>">
		<?php
		do_action( 'woocommerce_before_mini_cart_contents' );

		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

			// Remove Finished Campaign Products from Cart
			$terms = get_the_terms( $cart_item['product_id'], 'campaign' );
			if ( $terms && ! is_wp_error( $terms ) ){
				foreach ( $terms as $term ) {
					$campaignDateEnd = get_field('campaign_date_end', $term);
				}
			}
			$campaignDateEnd = new DateTime($campaignDateEnd);
			$campaignDateEnd->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
			$campaignDateEnd->setTime(23, 59, 59);
			$currentDate = new DateTime(date("Y/m/d"));
			$currentDate->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
			$intervalDays = date_diff( $currentDate, $campaignDateEnd);
			$intervalDays = $intervalDays->days; 
			if ($currentDate >= $campaignDateEnd) {
				WC()->cart->remove_cart_item( $cart_item_key );
			}

			if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) && ($currentDate <= $campaignDateEnd) ) {
				$product_name      = apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key );
				$thumbnail         = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
				$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
				?>
				<li class="woocommerce-mini-cart-item <?php echo esc_attr( apply_filters( 'woocommerce_mini_cart_item_class', 'mini_cart_item', $cart_item, $cart_item_key ) ); ?>">
					<?php if ( empty( $product_permalink ) ) : ?>
						<?php echo $thumbnail . $product_name ; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php else : ?>
						<div class="thumbnail-container">
							<?php echo $thumbnail ?>
						</div>
						<a href="<?php echo esc_url( $product_permalink ); ?>">
							<?php echo $product_name; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<?php echo wc_get_formatted_cart_item_data( $cart_item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<?php echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<span class="quantity">&ensp;x ' . sprintf( $cart_item['quantity'], $product_price ) . '</span>', $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</a>
					<?php endif; ?>
				</li>
				<?php
			}
		}

		do_action( 'woocommerce_mini_cart_contents' );
		?>
	</ul>
	
	<div class="mini-cart__cta-container">
		<a href="<?php echo site_url(); ?>/cart" class="mini-cart__cta button button--outline">Ir a mi carrito</a>
	</div>

	<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>

	<?php do_action( 'woocommerce_widget_shopping_cart_after_buttons' ); ?>

<?php else : ?>

	<p class="woocommerce-mini-cart__empty-message"><?php esc_html_e( 'No products in the cart.', 'woocommerce' ); ?></p>

<?php endif; ?>
</div>
<?php do_action( 'woocommerce_after_mini_cart' ); ?>
