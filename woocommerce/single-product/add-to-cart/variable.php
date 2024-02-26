<?php
/**
 * Variable product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/variable.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.5
 */

defined( 'ABSPATH' ) || exit;

global $product;

$attribute_keys  = array_keys( $attributes );
$variations_json = wp_json_encode( $available_variations );
$variations_attr = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );

do_action( 'woocommerce_before_add_to_cart_form' ); ?>

<form class="variations_form cart  js-fade-in-up-item" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data' data-product_id="<?php echo absint( $product->get_id() ); ?>" data-product_variations="<?php echo $variations_attr; // WPCS: XSS ok. ?>">
	<?php do_action( 'woocommerce_before_variations_form' ); ?>

	<?php if ( empty( $available_variations ) && false !== $available_variations ) : ?>
		<p class="stock out-of-stock"><?php echo esc_html( apply_filters( 'woocommerce_out_of_stock_message', __( 'This product is currently out of stock and unavailable.', 'woocommerce' ) ) ); ?></p>
	<?php else : ?>
		<table class="variations" cellspacing="0">
			<tbody>
				<?php foreach ( $attributes as $attribute_name => $options ) : ?>
					<tr>
						<td class="label"><label for="<?php echo esc_attr( sanitize_title( $attribute_name ) ); ?>"><?php echo wc_attribute_label( $attribute_name ); // WPCS: XSS ok. ?></label></td>
						<td class="value">
							<?php
								wc_dropdown_variation_attribute_options(
									array(
										'options'   => $options,
										'attribute' => $attribute_name,
										'product'   => $product,
									)
								);
							?>
							<div class="dosis-frasco-container <?php echo !(get_field('dosis-por-frasco')) ? 'd-none' : '' ?>">
								<?php
									global $product;
									$variations = $product->get_available_variations();
									foreach ($variations as $variation) {
										$variation_id = $variation['variation_id'];
										echo '<div class="dosis-frasco">(' . get_post_meta( $variation_id , 'custom_field', true ) . ' dosis por frasco) </div>';
									} 
								?>
							</div>
						</td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>

		<?php 
			// Get Campaign Taxonomy
			$terms = get_the_terms( get_the_ID(), 'campaign' );
			// Get ACF From Campaign
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
		?>

		<?php if ( is_user_logged_in() && ($currentDate <= $campaignDateEnd)) { ?>
			<div class="single_variation_wrap">
				<?php
					/**
					 * Hook: woocommerce_before_single_variation.
					 */

					do_action( 'woocommerce_before_single_variation' );

					/**
					 * Hook: woocommerce_single_variation. Used to output the cart button and placeholder for variation data.
					 *
					 * @since 2.4.0
					 * @hooked woocommerce_single_variation - 10 Empty div for variation data.
					 * @hooked woocommerce_single_variation_add_to_cart_button - 20 Qty and cart button.
					 */
					do_action( 'woocommerce_single_variation' ); 

					/**
					 * Hook: woocommerce_after_single_variation.
					 */
					do_action( 'woocommerce_after_single_variation' );
				?>
			</div>
		<?php }
		if ( !is_user_logged_in() ) { ?>

			<div class="single_variation_wrap single_variation_wrap--unlogged">
				<?php do_action( 'woocommerce_single_variation' );  ?>
			</div>

			<div class="user-not-logged-in">
				<div class="user-not-logged-in__text">
					<p class="user-not-logged-in__title">¿Querés obtener este descuento?</p> 
					<p class="user-not-logged-in__subtitle">Registrate para acceder a los beneficios únicos que <strong>Biogénesis Bagó</strong> tiene para vos.</p>
				</div>
				<?php 
					$signUpPage = get_page_by_path( 'registro' );
					$signUpPageId = $signUpPage->ID; 
				?>
				<a href="<?php echo get_permalink($signUpPageId) ?>" class="user-not-logged-in__cta">Registrarse</a>
			</div>
		<?php }
		if (!($currentDate <= $campaignDateEnd) && is_user_logged_in()) { ?>
			<div class="single_variation_wrap single_variation_wrap--unlogged">
				<?php do_action( 'woocommerce_single_variation' );  ?>
			</div>

			<div class="user-not-logged-in">
				<div class="user-not-logged-in__text">
					<p class="user-not-logged-in__title">¿Querés obtener este descuento?</p> 
					<p class="user-not-logged-in__subtitle">Deberás esperar a que el producto vuelva a disponibilizarse entre nuestras próximas campañas. Visita nuestro catálogo para ver otros productos disponibles.</p>
				</div>
				<?php 
					$allProductsPage = get_page_by_path( 'todos-los-productos' );
					$allProductsPageId = $allProductsPage->ID; 
				?>
				<a href="<?php echo get_permalink($allProductsPageId); ?>" class="user-not-logged-in__cta">Ver otros Productos</a>
			</div>
		<?php }

	endif; ?>

	<?php do_action( 'woocommerce_after_variations_form' ); ?>
</form>

<?php
do_action( 'woocommerce_after_add_to_cart_form' );
