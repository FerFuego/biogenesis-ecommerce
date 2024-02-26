<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout.
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}


?>

<form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">

	<?php if ( $checkout->get_checkout_fields() ) : ?>

		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

		<div class="checkout-user-data__content" id="customer_details">

			<div class="checkout-user-data__form">
				<?php do_action( 'woocommerce_checkout_billing' ); ?>
			</div>

		</div>

		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

	<?php endif; ?>
	
	<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
	
	<section class="your-order">
		<div class="your-order__title-container">
			<img class="your-order__icon" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/check.svg" alt="">
			<h3 class="your-order__title title-s" id="order_review_heading"><?php esc_html_e( 'Paso 4 - Revise su Solicitud de Beneficio', 'woocommerce' ); ?></h3>
		</div>
		
		<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

		<div id="order_review" class="woocommerce-checkout-review-order">
			<?php do_action( 'woocommerce_checkout_order_review' ); ?>
		</div>
	</section>


	<div class="your-order__btn-container">
		<button class="your-order__btn js-cancel-purchase">Cancelar</button>
		<!-- Finalizar Compra -->
		<?php echo apply_filters( 'woocommerce_order_button_html', '<button type="submit" class="your-order__btn-check" name="woocommerce_checkout_place_order" id="place_order" value="Finalizar" data-value="Finalizar">Finalizar Beneficio</button>' ); // @codingStandardsIgnoreLine ?>
		<div class="your-order__incomplete-warning" id="js-checkout-errors-container">
			<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/incomplete-fields-warning.svg" alt="Warning: Incomplete Fields Icon">
			<p id="js-error-message">Por favor asegurate que todos los campos esten completos antes de finalizar la operación.</p>
		</div>
	</div>
	
	<!-- Cancel Order Modal -->
	<div class="cancel-modal" id="js-cancel-modal">
		<div class="cancel-modal__container cancel-modal__container--lg">	

			<div class="cancel-modal__close-btn js-cancel-purchase">
			</div>

			<div class="cancel-modal__icon-container">
				<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/alert.svg" alt="">
			</div>

			<h2 class="cancel-modal__title">¿Seguro que quieres cancelar?</h2>

			<h3 class="cancel-modal__subtitle">Los Productos seguirán disponibles en tu Carrito.</h3>

			<div class="cancel-modal__btn-container">
				<a href="<?php echo site_url() ?>" class="cancel-modal__btn cancel-modal__btn--gray" id="js-cancel-btn-confirmation">Sí, estoy seguro</a>
				<button class="cancel-modal__btn cancel-modal__btn--inverted js-cancel-purchase">Continuar el pedido</button>
			</div>
			
		</div>
	</div>

	<!-- Order Details Confirmarion Modal -->
	<div class="confirmation" id="js-confirmation-modal">
		<div class="confirmation__container confirmation__container--lg">	

			<div class="confirmation__close-btn js-incorrect-details">
			</div>

			<h2 class="confirmation__title">Su Solicitud de Beneficio</h2>

			<h3 class="confirmation__subtitle">Por favor verificá que los datos sean correctos.</h3>

			<div class="confirmation__order-details">
				<div class="confirmation__order-details-name">
					<p class="confirmation__order-detail-title">Nombre y Apellido</p>
					<p class="confirmation__order-detail-info" id="js-order-confirmation-name"></p>
				</div>
				<div class="confirmation__order-details-razon-social">
					<p class="confirmation__order-detail-title">Razón Social</p>
					<p class="confirmation__order-detail-info" id="js-order-confirmation-razon-social"></p>
				</div>
				<div class="confirmation__order-details-productos">
					<p class="confirmation__order-detail-title">Pedido</p>
					<?php foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
						$product = $cart_item['data']; ?>
						<p class="confirmation__order-detail-info"><?php echo $product->get_name() . ' ' . $product->attributes["presentacion"] ?> <span>x <?php echo $cart_item['quantity']; ?> unidades</span></p>
					<?php } ?>
				</div>
				<div class="confirmation__order-details-cuit">
					<p class="confirmation__order-detail-title">CUIT</p>
					<p class="confirmation__order-detail-info" id="js-order-confirmation-cuit"></p>
				</div>
				<div class="confirmation__order-details-veterinaria">
					<p class="confirmation__order-detail-title">Veterinaria Seleccionada</p>
					<p class="confirmation__order-detail-info" id="js-order-confirmation-vete-name"></p>
				</div>
				<div class="confirmation__order-details-veterinaria-location">
					<p class="confirmation__order-detail-title">Ubicación</p>
					<p class="confirmation__order-detail-info" id="js-order-confirmation-vete-adress"></p>
				</div>
			</div>

			<div class="confirmation__btn-container">
				<button class="confirmation__btn confirmation__btn--gray js-incorrect-details">Volver al pedido</button>
				<button class="confirmation__btn confirmation__btn--inverted" id="js-correct-details">Sí, son correctos</button>
			</div>
			
		</div>
	</div>


	<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>

</form>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>

<!-- Delete Profile Modal -->
<?php get_template_part('template-parts/modules/module', 'delete_profile_modal'); ?>
