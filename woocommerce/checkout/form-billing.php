<?php
/**
 * Checkout billing information form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-billing.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 * @global WC_Checkout $checkout
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="woocommerce-billing-fields checkout-user-data">
	<?php if ( wc_ship_to_billing_address_only() && WC()->cart->needs_shipping() ) : ?>

		<h3><?php esc_html_e( 'Billing &amp; Shipping', 'woocommerce' ); ?></h3>

	<?php else : ?>

		<h1 class="checkout-user-data__title title-xl ">Finalizar Solicitud de Beneficio</h1>

		<h3 class="checkout-user-data__subtitle title-xs "><span><?php esc_html_e( 'Paso 1 - Cargue sus Datos de Usuario', 'woocommerce' ); ?></span></h3>

	<?php endif; ?>

	<div class="checkout-user-data__content ">

		<!-- AJAX Spinner -->
		<div class="spinner" id="js-spinner-account">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
		<!-- Mask -->
		<div class="checkout-user-data__content-mask" id="js-mask-account">
		</div>

		<?php do_action( 'woocommerce_before_checkout_billing_form', $checkout ); ?>

		<div class="woocommerce-billing-fields__field-wrapper checkout-user-data__form">

			<?php
			$uid = get_current_user_id();
			$userMeta = get_user_meta($uid); 
			$userData = get_userdata($uid);
			$fields = $checkout->get_checkout_fields( 'billing' );
			$productionSystemField = $fields['billing_production_system']['label'];
			$addressField = $fields['billing_address_1']['label'];
			$phoneCelField = $fields['billing_phone_cel']['label'];
			$provinceField = $fields['billing_distributor_province']['priority'];
			$distributorField = $fields['billing_distributor']['label'];

			array_sort_by($fields, 'priority', $order = SORT_ASC); 

			foreach ( $fields as $key => $field ) :
				echo ($field['priority'] === $provinceField) ? '<div class="checkout-user-data__distributor-fields"><div class="checkout-user-data__distributor-fields-container"><h2 class="title-xs checkout-user-data__divisor-title select-vet">Paso 3 - Seleccione la veterinaria para canjear el beneficio</h2>
				<div class="vet-search" id="js-search-vet">
					<input type="radio" class="vet-search__checkbox js-select-vet-checkbox" id="" name="billing-distributor-type" value="0">
					<span class="custom-radio"></span>
					<div class="vet-search__mask"></div>
					<h3 class="vet-search__title">Buscar por nombre</h3>
					<p class="form-row form-row-wide">
						<select name="billing_distributor_search" placeholder="Nombre de la veterinaria" class="vet-search__input js-search-basic-vetes" id="js-search-vet-input">
							<option value="">Buscar Veterinaria por Nombre</option>
						</select>
					</p>
					<input type="hidden" autocomplete="off" placeholder="Localidad" id="js-search-vet-input-localidad" name="billing_distributor_search-localidad">
					<input type="hidden" autocomplete="off" placeholder="Provincia" id="js-search-vet-input-provincia" name="billing_distributor_search-provincia">
				</div>
				<div class="vet-select" id="js-select-vet">
					<input type="radio" class="vet-select__checkbox js-select-vet-checkbox" id="" name="billing-distributor-type" value="1">
					<span class="custom-radio"></span>
					<div class="vet-select__mask"></div>
					<h3 class="vet-search__title">Buscar por ubicación</h3>
					<input type="text" id="js-vet-address" name="billing_distributor_address" hidden>
					<input type="text" id="js-vet-elecmail" name="billing_distributor_elecmail" hidden>
					<input type="text" id="js-vet-elecmail-alternative" name="billing_distributor_elecmail-alternative" hidden>
					<input type="text" id="js-vet-id" name="billing_distributor_vet_id" hidden>
					<input type="text" id="js-vet-vendedor" name="billing_distributor_vet_vendedor" hidden>'
				: '';
				?>				

				<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) );
				echo ($field['label'] === $distributorField) ? '</div></div>' : '';

				// Map 
				if ($field['label'] === $distributorField) :
				?>
					<div class="checkout-user-data__distributor-map">
						<?php 
							$args = array(
								'initZoom' => 3,
								'markerSize' => array('width' => 12, 'height' => 18),
								'setDefaultDistributor' => true,
							);
							get_template_part( 'template-parts/modules/module', 'map', $args ); 
						?>
					</div>

				<?php 
				endif;

				echo ($field['label'] === $distributorField) ? '</div>' : '';

				if ($field['label'] === $addressField) :
			?>

			<?php 
				endif;
				if ($field['label'] === $phoneCelField) :
			?>
				<!-- Custom: Email -->
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small" id="billing_email_field">
					<label for="billing_email"><?php esc_html_e( 'Correo', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
					<input type="email" class="woocommerce-Input woocommerce-Input--email input-text" style="cursor: no-drop;" value="<?php echo $userData->user_email; ?>" autocomplete="email" placeholder="" disabled />
				</p>	

			<?php endif; ?>
			<?php endforeach; ?>

			<!-- Guardar Datos Btn -->
			<p class="edit-count-submit-btn edit-count-submit-btn--datos">
				<span class="edit-count-submit-response" id="js-billing-profile-response"></span>
				<?php wp_nonce_field( 'save_account_details', 'save-account-details-nonce' ); ?>
				<button type="submit" class="woocommerce-Button button" name="save_account_details" value="<?php esc_attr_e( 'Save changes', 'woocommerce' ); ?>" id="js-save-user-info"><?php esc_html_e( 'Guardar Datos', 'woocommerce' ); ?></button>
				<input type="hidden" name="action" value="save_account_details" />
			</p>

			<div class="checkout-user-data__row-generator">
				<!-- Title -->
				<div class="checkout-user-data__billing-profile-title-container">
					<h2 class="title-xs checkout-user-data__divisor-title checkout-user-data__divisor-title--w-line checkout-user-data__divisor-title--rz"><span>Paso 2 - Cargue la Razón Social vinculada al beneficio</span></h2>
					<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/alert.svg" alt="Additional Info" class="checkout-user-data__billing-profile-title-icon">
					<div class="checkout-user-data__billing-profile-title-alert">
						<p>Podés agregar más de una Razón Social para la emisión del certificado.</p> 
					</div>
				</div>

				<!-- Rows -->
				<?php get_template_part( 'template-parts/modules/module', 'billing_profiles' ); ?>
					
			</div>

		</div>

	</div>

	<?php do_action( 'woocommerce_after_checkout_billing_form', $checkout ); ?>
</div>

<?php if ( ! is_user_logged_in() && $checkout->is_registration_enabled() ) : ?>
	<div class="woocommerce-account-fields">
		<?php if ( ! $checkout->is_registration_required() ) : ?>

			<p class="form-row form-row-wide create-account">
				<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
					<input class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" id="createaccount" <?php checked( ( true === $checkout->get_value( 'createaccount' ) || ( true === apply_filters( 'woocommerce_create_account_default_checked', false ) ) ), true ); ?> type="checkbox" name="createaccount" value="1" /> <span><?php esc_html_e( 'Create an account?', 'woocommerce' ); ?></span>
				</label>
			</p>

		<?php endif; ?>

		<?php do_action( 'woocommerce_before_checkout_registration_form', $checkout ); ?>

		<?php if ( $checkout->get_checkout_fields( 'account' ) ) : ?>

			<div class="create-account">
				<?php foreach ( $checkout->get_checkout_fields( 'account' ) as $key => $field ) : ?>
					<?php woocommerce_form_field( $key, $field, $checkout->get_value( $key ) ); ?>
				<?php endforeach; ?>
				<div class="clear"></div>
			</div>

		<?php endif; ?>

		<?php do_action( 'woocommerce_after_checkout_registration_form', $checkout ); ?>
	</div>
<?php endif; ?>