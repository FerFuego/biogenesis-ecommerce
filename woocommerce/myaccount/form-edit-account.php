<?php
/**
 * Edit account form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/form-edit-account.php.
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

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_edit_account_form' ); ?>

<form class="woocommerce-EditAccountForm edit-account my-account-form" action="" method="post" <?php do_action( 'woocommerce_edit_account_form_tag' ); ?> >

	<h3 class="my-account__subtitle title-xs"><span><?php esc_html_e( 'Datos Usuario', 'woocommerce' ); ?></span></h3>

	<?php do_action( 'woocommerce_edit_account_form_start' ); ?>

	<!-- Get User Meta -->
	<?php 
		$uid = get_current_user_id();
		$userMeta = get_user_meta($uid); 
		$userData = get_userdata($uid);
	?>

	<!-- User Data -->
	<div class="my-account__form-user-data-container" id="js-user-data-container">

		<!-- AJAX Spinner -->
		<div class="spinner" id="js-spinner-account">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
		<!-- Mask -->
		<div class="my-account__form-user-data-container-mask" id="js-mask-account">
		</div>

		<!-- Custom: First Name -->
		<p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first form-row--small">
			<label for="billing_first_name"><?php esc_html_e( 'Nombre', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
			<input type="text" class="woocommerce-Input woocommerce-Input--text input-text js-length-validation" name="billing_first_name" id="billing_first_name" autocomplete="given-name" value="<?php echo $userMeta['billing_first_name'][0]; ?>" placeholder="Nombre" />
		</p>

		<!-- Custom: Last Name -->
		<p class="woocommerce-form-row woocommerce-form-row--last form-row form-row-last form-row--small">
			<label for="billing_last_name"><?php esc_html_e( 'Apellido', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
			<input type="text" class="woocommerce-Input woocommerce-Input--text input-text js-length-validation" name="billing_last_name" id="billing_last_name" autocomplete="family-name" value="<?php echo $userMeta['billing_last_name'][0]; ?>" placeholder="Apellido" />
		</p>
		<div class="clear"></div>

		<!-- Custom: Roll -->
		<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
			<label for="billing_roll"><?php esc_html_e( 'Rol', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
			<select class="woocommerce-Input woocommerce-Input--email input-text js-length-validation" name="billing_roll" id="billing_roll" autocomplete="billing_roll">
				<option hidden><?php echo ($userMeta['billing_roll'][0]) ? $userMeta['billing_roll'][0] : 'Rol'; ?></option>
				<option>Productor</option>
				<option>Veterinario</option>
				<option>Ing Agrónomo</option>
				<option>Zootecnista</option>
				<option>Lic en Marketing</option>
				<option>Lic en RRHH</option>
				<option>Abogado</option>
				<option>Ingeniero (Otro)</option>
				<option>Auxiliar Veterinario</option>
				<option>Lic en economía agraria</option>
				<option>Economista</option>
				<option>Técnico Agropecuario</option>
			</select>
		</p>

		<!-- Custom: Phone Tel -->
		<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
			<label for="billing_phone"><?php esc_html_e( 'Teléfono fijo', 'woocommerce' ); ?></label>
			<input type="tel" class="woocommerce-Input woocommerce-Input--email input-text" data-mask="(0000) 0000-0000" name="billing_phone" id="billing_phone" autocomplete="billing_phone" placeholder="(011) 2744-8300" value="<?php echo $userMeta['billing_phone'][0]; ?>"/>
		</p>

		<!-- Custom: Phone Cel -->
		<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
			<label for="billing_phone_cel"><?php esc_html_e( 'Teléfono celular', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
			<input type="tel" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation" data-mask="(0000) 0000-0000" name="billing_phone_cel" id="billing_phone_cel" autocomplete="billing_phone_cel" placeholder="(011) 15-2744-8300" value="<?php echo $userMeta['billing_phone_cel'][0]; ?>" />
		</p>

		<!-- Custom: Email -->
		<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
			<label for="billing_email"><?php esc_html_e( 'Correo', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
			<input type="email" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation" style="cursor: no-drop;" autocomplete="email" value="<?php echo $userData->user_email; ?>" placeholder="" disabled />
		</p>

		<!-- Guardar Datos Btn -->
		<p class="edit-count-submit-btn edit-count-submit-btn--datos">
			<span class="edit-count-submit-response" id="js-billing-profile-response"></span>
			<?php wp_nonce_field( 'save_account_details', 'save-account-details-nonce' ); ?>
			<button type="submit" class="woocommerce-Button button" name="save_account_details" value="<?php esc_attr_e( 'Save changes', 'woocommerce' ); ?>" id="js-save-user-info"><?php esc_html_e( 'Guardar Datos', 'woocommerce' ); ?></button>
			<input type="hidden" name="action" value="save_account_details" />
		</p>

	</div>
	
	<!-- Perfiles de facturación -->
	<div class="my-account__billing-profile-title-container">
		<h3 class="my-account__subtitle my-account__billing-profile-title title-xs"><span><?php esc_html_e( 'El certificado se emitirá para la Razón Social:', 'woocommerce' ); ?></span></h3>
		<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/alert.svg" alt="Additional Info" class="my-account__billing-profile-title-icon">
		<div class="my-account__billing-profile-title-alert">
			<p>Podés agregar más de una Razón Social para la emisión del certificado.</p> 
		</div>
	</div>


	<?php get_template_part( 'template-parts/modules/module', 'billing_profiles' ); ?>

</form>

<?php do_action( 'woocommerce_after_edit_account_form' ); ?>



