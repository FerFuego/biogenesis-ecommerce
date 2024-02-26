<?php
/**
 * Empty cart page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-empty.php.
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

?>
<div class="cart-container">

	<div class="cart__header">
		<h2 class="title-xl section-title js-fade-in-up">Tu Carrito</h2>
	</div>

	<div class="woocommerce-cart-form empty js-fade-in-up-items-container">
		<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents js-fade-in-up-item" cellspacing="0">
				<thead>
					<tr>
						<th class="product-name"><?php esc_html_e( 'Product', 'woocommerce' ); ?></th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
						<th class="product-price"><?php esc_html_e('Precio de referencia'); ?></th>
						<th class="product-quantity"><?php esc_html_e('Cantidad frascos'); ?></th>
						<th class="product-subtotal"><?php esc_html_e('Total'); ?></th>
					</tr>
				</thead>
				<tbody class="js-fade-in-up-item">
					<tr>
						<td>Tu carrito esta vacío.</td>
					</tr>
				</tbody>
		</table>
		<?php if ( wc_get_page_id( 'shop' ) > 0 ) : ?>
			<p class="return-to-shop">
				<a class="button wc-backward" href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>">
					<?php
						/**
						 * Filter "Return To Shop" text.
						 *
						 * @since 4.6.0
						 * @param string $default_text Default text.
						 */
						echo esc_html( apply_filters( 'woocommerce_return_to_shop_text', __( 'Return to shop', 'woocommerce' ) ) );
					?>
				</a>
			</p>
		<?php endif; ?>
	</div>



</div>