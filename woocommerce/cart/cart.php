<?php
/**
 * Cart Page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.8.0
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' ); ?>

<div class="cart-container">

	<div class="cart__header js-fade-in-up">
		<h2 class="title-xl section-title">Tu Carrito</h2>
	</div>

	<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
		<?php do_action( 'woocommerce_before_cart_table' ); ?>

		<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">
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
			<tbody>
				<?php do_action( 'woocommerce_before_cart_contents' ); ?>

				<?php		
				$variationsArray = array (); // Max limit on variable products
				foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
					// Product Data
					$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
					$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
					$productVariation =  new WC_Product_Variation( $item_id );
					$variation = $cart_item['variation_id'];
					$dosisFrasco = get_post_meta( $variation , 'custom_field', true);
					$productType = $_product->get_type();
					$dosisFrascoMuesta = get_field('dosis-por-frasco', $cart_item['product_id'] );	

					// Current Quantity and Max Limit
					if($dosisFrascoMuesta) {
						$quantity =  $cart_item['quantity']*$dosisFrasco;
					} else {
						$quantity =  $cart_item['quantity'];
					}
					$shpng = get_field( 'suggested_price', $cart_item['product_id'] ); // Get Suggested Price ACF Toggle
					$productMaxLimit = get_field('max-limit', $cart_item['product_id'] );	
		
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

					// Max limit on variable products
					if (in_array($product_id, $variationsArray)) {
						$search = array_search($product_id, $variationsArray);
						$totalQuantity = $quantity + $variationsArray[$search + 1];
					} else {
						array_push($variationsArray, $product_id, $quantity);
						$totalQuantity = $quantity;
					}			

					if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) && ($currentDate <= $campaignDateEnd) ) {
						$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
						?>
						<tr class="woocommerce-cart-form__cart-item <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">
							<td class="product-remove">
								<?php
									echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
										'woocommerce_cart_item_remove_link',
										sprintf(
											'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">
											<svg width="22" height="22" viewBox="0 -5 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
												<g id="Trash Can">
													<path id="lid" d="M0 2V4H22V2H15.4C14.2654 1.35795 13.8264 0.942064 13.75 0H8.25C8.09716 0.990352 7.562 1.35421 6.6 2H0Z" fill="#AE0A0A"/>
													<path id="body" d="M20 4H2V22H20V4Z" fill="#AE0A0A"/>
													<g id="body-lines">
														<path id="Vector 3" d="M4.99999 18C5.12175 18.8234 5.2349 18.9627 5.99999 19C6.76508 19.0373 6.79918 18.9417 6.99999 18V8C6.97249 7.24625 6.74072 7.04072 5.99999 7C5.24048 7.08979 4.91305 7.2204 4.99999 8V18Z" fill="#F9F9F9"/>
														<path id="Vector 4" d="M10.0137 18C10.1354 18.8234 10.2486 18.9627 11.0137 19C11.7788 19.0373 11.8128 18.9417 12.0137 18V8C11.9862 7.24625 11.7544 7.04072 11.0137 7C10.2542 7.08979 9.92672 7.2204 10.0137 8V18Z" fill="#F9F9F9"/>
														<path id="Vector 5" d="M15.0137 18C15.1354 18.8234 15.2486 18.9627 16.0137 19C16.7788 19.0373 16.8128 18.9417 17.0137 18V8C16.9862 7.24625 16.7544 7.04072 16.0137 7C15.2542 7.08979 14.9267 7.2204 15.0137 8V18Z" fill="#F9F9F9"/>
													</g>
												</g>
											</svg>										
											</a>',
											esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
											esc_html__( 'Remove this item', 'woocommerce' ),
											esc_attr( $product_id ),
											esc_attr( $_product->get_sku() )
										),
										$cart_item_key
									);
								?>
							</td>

							<!-- Thumbnail -->
							<td class="product-thumbnail">
								<?php
								$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );

								if ( ! $product_permalink ) {
									echo $thumbnail; // PHPCS: XSS ok.
								} else {
									printf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $thumbnail ); // PHPCS: XSS ok.
								}
								?>
							</td>

							<!-- Name -->
							<td class="product-name" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
								<?php
								if ( ! $product_permalink ) {
									echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) . '&nbsp;' );
								} else {
									echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $_product->get_name() ), $cart_item, $cart_item_key ) );
								}

								do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key );
								
								// Meta data.
								echo wc_get_formatted_cart_item_data( $cart_item ); // PHPCS: XSS ok.
								// Backorder notification.
								if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) {
									echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) );
								}
								?> 

							</td>

							<!-- Price (per unit) -->
							<td class="product-price price-<?php echo $shpng; ?>" data-title="<?php esc_attr_e( 'Price', 'woocommerce' ); ?>">
								<?php
									echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
								?>
								<div class="price-per-unit">(x unidad)</div>
							</td>

							<!-- Quantity -->
							<td class="product-quantity <?php if ($totalQuantity > $productMaxLimit) echo 'max-limit-reached'; ?>" data-title="<?php esc_attr_e( 'Quantity', 'woocommerce' ); ?>">
								<?php
								if ( $_product->is_sold_individually() ) {
									$product_quantity = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
								} else {
									$product_quantity = woocommerce_quantity_input(
										array(
											'input_name'   => "cart[{$cart_item_key}][qty]",
											'input_value'  => $cart_item['quantity'],
											'max_value'    => $_product->get_max_purchase_quantity(),
											'min_value'    => '0',
											'product_name' => $_product->get_name(),
										),
										$_product,
										false
									);
								}

								echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // PHPCS: XSS ok.
								?>
								<div class="doses-calculator__container">
									<p class="doses-calculator__value <?php echo !($dosisFrascoMuesta) ? 'd-none' : '' ?>">(<?php echo $quantity;?> Dosis)</p>
								</div>
							</td>

							<!-- Subtotal -->
							<td class="product-subtotal price-<?php echo $shpng; ?>" data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>">
								<?php
									echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // PHPCS: XSS ok.
								?>
							</td>
						<!-- Max Limit Modal -->
						<td class="max-limit-td">
							<div class="max-limit" id="js-max-limit">
								<div class="max-limit__container max-limit__container--lg">
									<div class="max-limit__close-btn js-max-limit-close">
									</div>
						
									<div class="max-limit__icon-container">
										<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/max-limit-alert.svg" alt="Max Limit Alert Icon">
									</div>
									<div class="max-limit__title-container">
										<h2 class="max-limit__title">Atención: el límite establecido para <?php echo $_product->get_name() ?> es de <?php echo $productMaxLimit; echo ($dosisFrasco) ? ' dosis' : ' unidades'; ?>.</h2>
									</div>
						
									<h3 class="max-limit__subtitle"><?php the_field('max_limit_subtitle', 'option') ?></h3>
						
									<div class="max-limit__btn-container">
										<button class="max-limit__btn js-max-limit-confirmation"><?php the_field('max_limit_button_text', 'option') ?></button>
									</div>
						
							</div>
						</td>
					</div> 
						</tr>
						<?php
					}
				}
				?>

				<?php do_action( 'woocommerce_cart_contents' ); ?>

				<tr>
					<td colspan="6" class="actions">
						<button type="submit" class="button" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Update cart', 'woocommerce' ); ?></button>

						<?php do_action( 'woocommerce_cart_actions' ); ?>

						<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
					</td>
				</tr>

				<?php do_action( 'woocommerce_after_cart_contents' ); ?>
			</tbody>
		</table>
		<?php do_action( 'woocommerce_after_cart_table' ); ?>
	</form>

	<?php do_action( 'woocommerce_before_cart_collaterals' ); ?>

	<div class="cart-collaterals">
		<?php
			/**
			 * Cart collaterals hook.
			 *
			 * @hooked woocommerce_cross_sell_display
			 * @hooked woocommerce_cart_totals - 10
			 */
			do_action( 'woocommerce_cart_collaterals' );
		?>
	</div>

</div>

<?php do_action( 'woocommerce_after_cart' ); ?>

