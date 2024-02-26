<div class="my-account__form-billing-profiles-container" id="js-billing-profiles">

	<!-- AJAX Spinner -->
	<div class="spinner" id="js-spinner-billing-profiles">
		<div class="double-bounce1"></div>
		<div class="double-bounce2"></div>
	</div>
	<!-- Mask -->
	<div class="my-account__form-billing-profiles-container-mask" id="js-mask-billing-profiles">
	</div>

	<!-- Billing Data Varibales -->
	<?php 
		$uid = get_current_user_id();	
		$userMeta = get_user_meta($uid); 
		$billingProfiles = $userMeta['perfil_facturacion'];
		$billingProfilesCount = json_decode($billingProfiles[0], JSON_FORCE_OBJECT);
		if (empty($billingProfilesCount)) {
			$billingProfilesCount = 0;
		} else {
			$billingProfilesCount = (count($billingProfilesCount));
		}
	?>

	<?php if ($billingProfilesCount == 0 || $billingProfilesCount == 1) : ?>
	<!-- Empty -->
	<?php 
		$billingProfile = json_decode($billingProfiles[0], JSON_FORCE_OBJECT); 
		$billingProfile = $billingProfile[0]; 
		$establecimientos = $billingProfile['establecimientos']; 
	?>

	<div class="my-account__form-billing-profile billing-profile js-billing-profile active" data-index-row="0">

		<!-- Card -->
		<div class="billing-profile__card">
			<input type="radio" class="billing-profile__card-checkbox js-card-checkbox" id="billing-profile-<?php echo $index;?>" name="billing-profile-checkbox" value="<?php echo $index;?>">
			<span class="custom-radio"></span>
			<p class="billing-profile__card-title"><?php echo ($billingProfile['razon_social']) ? $billingProfile['razon_social'] : ''; ?></p>
			<p class="billing-profile__card-subtitle">CUIT: <span class="billing-profile__card-subtitle-span"><?php echo ($billingProfile['cuit']) ? $billingProfile['cuit'] : ''; ?></span></p>
			<!-- Establecimientos -->
			<ul class="billing-profile__card-establecimientos">
			<?php $z = 0; 
			if ($establecimientos) {
				foreach ($establecimientos as $establecimiento) : ?>
				<li><?php echo $establecimientos[$z]['nombre']; ?> - <?php echo $establecimientos[$z]['renspa']; ?></li>
				<?php $z++; ?>
				<?php endforeach; 
			} ?>
			</ul>
			<div class="billing-profile__card-btns">
				<!-- Delete Profile -->
				<div class="billing-profile__card-delete-btn js-delete-billing-profile">
					Eliminar Razón Social
				</div>
				<!-- Edit -->
				<div class="billing-profile__card-edit-btn js-edit-billing-profile">
					Editar
				</div>
			</div>
		</div>

		<!-- Extended (Active) -->
		<div class="billing-profile__extended">

			<!-- Close -->
			<div class="billing-profile__close js-close-billing-profile">
			</div>

			<h3 class="my-account__form-billing-profile-subtitle">Datos de la Razón Social</h3>

			<!-- Razón Social -->
			<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small razon_social_container">
				<label for="billing_razon_social"><?php esc_html_e( 'Razón Social', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
				<input type="text" class="woocommerce-Input woocommerce-Input--email input-text razon_social" name="billing_razon_social" id="billing_razon_social" autocomplete="address" placeholder="Razón Social" value="<?php echo $billingProfile['razon_social']; ?>" />
			</p>

			<!-- CUIT -->
			<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
				<label for="billing_razon_cuit"><?php esc_html_e( 'CUIT', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
				<input type="text" class="woocommerce-Input woocommerce-Input--email input-text cuit" data-mask="00-00000000-0" name="billing_razon_cuit" id="billing_razon_cuit" autocomplete="address" placeholder="CUIT" value="<?php echo $billingProfile['cuit']; ?>" />
			</p>

			<!-- Establecimientos -->
			<div class="my-account__form-establecimientos-container js-establecimientos">

				<?php if (empty($establecimientos)) { ?>

					<!-- Establecimiento -->
					<div class="my-account__form-establecimiento billing-establecimiento js-establecimiento">

						<div class="billing-establecimiento__header">
							<h3 class="my-account__form-billing-profile-subtitle">Datos del establecimiento</h3>
						</div>

						<!-- Custom: Establishment Name -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--medium">
							<label for="billing_company"><?php esc_html_e( 'Nombre de establecimiento', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation nombre_establecimiento" name="billing_company" id="billing_company" autocomplete="establishment-name" placeholder="Nombre de establecimiento" value="" />
						</p>
						<!-- Custom: Renspa -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small form-row--renspa">
							<label for="billing_renspa"><?php esc_html_e( 'RENSPA', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text renspa" data-mask="00.000.0.00000/00" name="billing_renspa" id="billing_renspa" autocomplete="renspa" placeholder="09.003.9.00321/01" value="" />
						</p>
						<div class="clear"></div>
						<!-- Custom: Province -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_province"><?php esc_html_e( 'Provincia', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<select class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-provincia" name="billing_province" id="billing_province" autocomplete="billing_province">
							<option hidden><?php echo ($userMeta['billing_province'][0]) ? $profile['establecimientos'][$z]['provincia'] : 'Provincia'; ?></option>
							<option>Buenos Aires</option>
							<option>Capital Federal</option>
							<option>Catamarca</option>
							<option>Chaco</option>
							<option>Chubut</option>
							<option>Córdoba</option>
							<option>Corrientes</option>
							<option>Entre Ríos</option>
							<option>Formosa</option>
							<option>Jujuy</option>
							<option>La Pampa</option>
							<option>La Rioja</option>
							<option>Mendoza</option>
							<option>Misiones</option>
							<option>Neuquén</option>
							<option>Río Negro</option>
							<option>Salta</option>
							<option>San Juan</option>
							<option>San Luis</option>
							<option>Santa Cruz</option>
							<option>Santa Fe</option>
							<option>Santiago del Estero</option>
							<option>Tierra del Fuego</option>
							<option>Tucumán</option>
							</select>
						</p>
						<!-- Custom: Locality -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_locality"><?php esc_html_e( 'Departamento/Localidad', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-localidad" name="billing_locality" id="billing_locality" autocomplete="locality" placeholder="Departamento/Localidad" value="" />
						</p>
						<!-- Custom: Address -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_address_1"><?php esc_html_e( 'Dirección *', 'woocommerce' ); ?></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-direccion" name="billing_address_1" id="billing_address_1" autocomplete="address" placeholder="Dirección" value="" />
						</p>

						<!-- Production Systems -->
						<h3 class="my-account__form-billing-profile-subtitle my-account__production-system-title">Sistema de producción</h3>

						<div class="my-account__form-row-items-container js-production-systems-container">

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="0">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_production_system"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system" id="billing_production_system" autocomplete="billing_production_system" value=<?php echo $establecimiento['productionSytems'][0]['sistemaProduccion']; ?>>
										<option hidden><?php echo ($establecimiento['productionSytems'][0]['sistemaProduccion']) ? $establecimiento['productionSytems'][0]['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number" id="billing_cattle_head_number" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $establecimiento['productionSytems'][0]['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type" id="billing_cattle_type" autocomplete="billing_cattle_type">
										<option hidden><?php echo ($establecimiento['productionSytems'][0]['cattleType']) ? $establecimiento['productionSytems'][0]['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

							</div>	

						</div>

						<!-- Add Production System -->
						<div class="plus js-add-production-system" data-index-btn-production-system="">Agregar otro sistema de producción</div>

					</div>

				<?php } else {
					$z = 0;
					foreach ($establecimientos as $establecimiento): ?>

					<!-- Establecimiento -->
					<div class="my-account__form-establecimiento billing-establecimiento js-establecimiento">

						<div class="billing-establecimiento__header">
							<h3 class="my-account__form-billing-profile-subtitle">Datos del establecimiento</h3>
							<!-- Delete Estbablecimiento -->
							<?php if ($z !== 0) : ?>
								<div class="billing-establecimiento__delete-btn js-delete-establecimiento">
									Eliminar
								</div>
							<?php endif; ?>
						</div>

						<!-- Custom: Establishment Name -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--medium">
							<label for="billing_company"><?php esc_html_e( 'Nombre de establecimiento', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation nombre_establecimiento" name="billing_company" id="billing_company" autocomplete="establishment-name" placeholder="Nombre de establecimiento" value="<?php echo $establecimiento['nombre']; ?>" />
						</p>
						<!-- Custom: Renspa -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small form-row--renspa">
							<label for="billing_renspa"><?php esc_html_e( 'RENSPA', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text renspa" data-mask="00.000.0.00000/00" name="billing_renspa" id="billing_renspa" autocomplete="renspa" placeholder="09.003.9.00321/01" value="<?php echo $establecimiento['renspa']; ?>" />
						</p>
						<div class="clear"></div>
						<!-- Custom: Province -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_province"><?php esc_html_e( 'Provincia', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<select class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-provincia" name="billing_province" id="billing_province" autocomplete="billing_province">
							<option hidden><?php echo ($establecimiento['provincia']) ? $establecimiento['provincia'] : 'Provincia'; ?></option>
							<option>Buenos Aires</option>
							<option>Capital Federal</option>
							<option>Catamarca</option>
							<option>Chaco</option>
							<option>Chubut</option>
							<option>Córdoba</option>
							<option>Corrientes</option>
							<option>Entre Ríos</option>
							<option>Formosa</option>
							<option>Jujuy</option>
							<option>La Pampa</option>
							<option>La Rioja</option>
							<option>Mendoza</option>
							<option>Misiones</option>
							<option>Neuquén</option>
							<option>Río Negro</option>
							<option>Salta</option>
							<option>San Juan</option>
							<option>San Luis</option>
							<option>Santa Cruz</option>
							<option>Santa Fe</option>
							<option>Santiago del Estero</option>
							<option>Tierra del Fuego</option>
							<option>Tucumán</option>
							</select>
						</p>
						<!-- Custom: Locality -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_locality"><?php esc_html_e( 'Departamento/Localidad', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-localidad" name="billing_locality" id="billing_locality" autocomplete="locality" placeholder="Departamento/Localidad" value="<?php echo $establecimiento['localidad']; ?>" />
						</p>
						<!-- Custom: Address -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_address_1"><?php esc_html_e( 'Dirección *', 'woocommerce' ); ?></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-direccion" name="billing_address_1" id="billing_address_1" autocomplete="address" placeholder="Dirección" value="<?php echo $establecimiento['direccion']; ?>" />
						</p>

						<!-- Production Systems -->
						<h3 class="my-account__form-billing-profile-subtitle my-account__production-system-title">Sistema de producción</h3>

						<div class="my-account__form-row-items-container js-production-systems-container">

							<?php if (empty($establecimiento['productionSytems'])) : ?>

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="0">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_production_system"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system" id="billing_production_system" autocomplete="billing_production_system" value=<?php echo $establecimiento['productionSytems'][0]['sistemaProduccion']; ?>>
										<option hidden><?php echo ($establecimiento['productionSytems'][0]['sistemaProduccion']) ? $establecimiento['productionSytems'][0]['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number" id="billing_cattle_head_number" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $establecimiento['productionSytems'][0]['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type" id="billing_cattle_type" autocomplete="billing_cattle_type">
										<option hidden><?php echo ($establecimiento['productionSytems'][0]['cattleType']) ? $establecimiento['productionSytems'][0]['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

							</div>	

							<?php 
								else : 
								$x = 0;
								foreach( $establecimiento['productionSytems'] as $productionSystem) : 
							?>

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="<?php echo $x; ?>">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide production-system">
									<label for="billing_production_system_<?php echo $index; ?>"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system_<?php echo $index; ?>" id="billing_production_system_<?php echo $index; ?>" autocomplete="billing_production_system" value=<?php echo $productionSystem['sistemaProduccion']; ?>>
										<option hidden><?php echo ($productionSystem['sistemaProduccion'] ) ? $productionSystem['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number_<?php echo $index; ?>"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number_<?php echo $index; ?>" id="billing_cattle_head_number_<?php echo $index; ?>" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $productionSystem['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type_<?php echo $index; ?>"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type_<?php echo $index; ?>" id="billing_cattle_type_<?php echo $index; ?>" autocomplete="billing_cattle_type" value=<?php echo $productionSystem['cattleType']; ?>>
										<option hidden><?php echo ($productionSystem['cattleType']) ? $productionSystem['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

								<!-- Trash - Delete Row -->
								<?php if ($x !== 0) : ?>
									<div class="my-account__trash-container woocommerce-form-row form-row">
										<div class="trash js-delete-row">
										</div>
									</div>
								<?php endif; ?>
							</div>	
								
							<?php
								$x++;
								endforeach;
								endif; 
							?>
						</div>

						<!-- Add Production System -->
						<div class="plus js-add-production-system" data-index-btn-production-system="">Agregar otro sistema de producción</div>

					</div>

				<?php 
					$z++;
					endforeach; 
				}?>

			</div>

			<div class="billing-profile__footer">
				<!-- Add Establcimiento -->
				<div class="billing-establecimiento__add-new button button--outline js-add-establecimiento" style="width: 100%;" data-index-btn-establecimiento="">Agregar otro Establecimiento</div>

				<?php do_action( 'woocommerce_edit_account_form' ); ?>
				<!-- Guardar Cambios -->
				<p class="edit-count-submit-btn">
					<?php wp_nonce_field( 'save_account_details', 'save-account-details-nonce' ); ?>
					<button type="submit" class="js-submit-row woocommerce-Button button" name="save_account_details" value="<?php esc_attr_e( 'Save changes', 'woocommerce' ); ?>"><?php esc_html_e( 'Guardar Cambios', 'woocommerce' ); ?></button>
					<input type="hidden" name="action" value="save_account_details" />
				</p>
				<?php do_action( 'woocommerce_edit_account_form_end' ); ?>
			</div>

		</div>

	</div>

	<?php else : ?>
	<!-- With Info -->
	<?php 
	foreach($billingProfiles as $billingProfile) : 
		$billingProfile = json_decode($billingProfile, JSON_FORCE_OBJECT); 
		$index = 0;
		foreach ($billingProfile as $profile) : 
			$establecimientos = $profile['establecimientos']?>

		<div class="my-account__form-billing-profile billing-profile js-billing-profile" data-index-row="<?php echo $index;?>">

			<!-- Card -->
			<div class="billing-profile__card <?php echo (is_checkout() ? 'billing-profile__card--checkout' : '');?>">
				<?php if (is_checkout()) { ?>
					<input type="radio" class="billing-profile__card-checkbox js-card-checkbox" id="billing-profile-<?php echo $index;?>" name="billing-profile-checkbox" value="<?php echo $index;?>">
					<span class="custom-radio"></span>
				<?php } ?>
				<p class="billing-profile__card-title"><?php echo $profile['razon_social']; ?></p>
				<p class="billing-profile__card-subtitle">CUIT: <span class="billing-profile__card-subtitle-span"><?php echo $profile['cuit']; ?></span></p>
				<!-- Establecimientos -->
				<ul class="billing-profile__card-establecimientos">
				<?php $z = 0; ?>
				<?php foreach ($establecimientos as $establecimiento) : ?>
					<li><?php echo $profile['establecimientos'][$z]['nombre']; ?> - <?php echo $profile['establecimientos'][$z]['renspa']; ?></li>
					<?php $z++; ?>
				<?php endforeach; ?>
				</ul>
				<div class="billing-profile__card-btns">
					<!-- Delete Profile -->
					<div class="billing-profile__card-delete-btn js-delete-billing-profile">
						Eliminar Razón Social
					</div>
					<!-- Edit -->
					<div class="billing-profile__card-edit-btn js-edit-billing-profile">
						Editar
					</div>
				</div>
			</div>

			<!-- Extended (Active) -->
			<div class="billing-profile__extended">

				<!-- Close -->
				<div class="billing-profile__close js-close-billing-profile">
				</div>

				<h3 class="my-account__form-billing-profile-subtitle">Datos de la Razón Social</h3>

				<!-- Razón Social -->
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small razon_social_container">
					<label for="billing_razon_social"><?php esc_html_e( 'Razón Social', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
					<input type="text" class="woocommerce-Input woocommerce-Input--email input-text razon_social" name="billing_razon_social" id="billing_razon_social" autocomplete="address" placeholder="Razón Social" value="<?php echo $profile['razon_social']; ?>" />
				</p>

				<!-- CUIT -->
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
					<label for="billing_razon_cuit"><?php esc_html_e( 'CUIT', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
					<input type="text" class="woocommerce-Input woocommerce-Input--email input-text cuit" data-mask="00-00000000-0" name="billing_razon_cuit" id="billing_razon_cuit" autocomplete="address" placeholder="CUIT" value="<?php echo $profile['cuit']; ?>" />
				</p>
				
				<!-- Establecimientos -->
				<div class="my-account__form-establecimientos-container js-establecimientos">

				<?php if (empty($establecimientos)) { ?>

					<!-- Establecimiento -->
					<div class="my-account__form-establecimiento billing-establecimiento js-establecimiento">

						<div class="billing-establecimiento__header">
							<h3 class="my-account__form-billing-profile-subtitle">Datos del establecimiento</h3>
						</div>

						<!-- Custom: Establishment Name -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--medium">
							<label for="billing_company"><?php esc_html_e( 'Nombre de establecimiento', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation nombre_establecimiento" name="billing_company" id="billing_company" autocomplete="establishment-name" placeholder="Nombre de establecimiento" value="" />
						</p>
						<!-- Custom: Renspa -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small form-row--renspa">
							<label for="billing_renspa"><?php esc_html_e( 'RENSPA', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text renspa" data-mask="00.000.0.00000/00" name="billing_renspa" id="billing_renspa" autocomplete="renspa" placeholder="09.003.9.00321/01" value="" />
						</p>
						<div class="clear"></div>
						<!-- Custom: Province -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_province"><?php esc_html_e( 'Provincia', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<select class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-provincia" name="billing_province" id="billing_province" autocomplete="billing_province">
							<option hidden>Provincia</option>
							<option>Buenos Aires</option>
							<option>Capital Federal</option>
							<option>Catamarca</option>
							<option>Chaco</option>
							<option>Chubut</option>
							<option>Córdoba</option>
							<option>Corrientes</option>
							<option>Entre Ríos</option>
							<option>Formosa</option>
							<option>Jujuy</option>
							<option>La Pampa</option>
							<option>La Rioja</option>
							<option>Mendoza</option>
							<option>Misiones</option>
							<option>Neuquén</option>
							<option>Río Negro</option>
							<option>Salta</option>
							<option>San Juan</option>
							<option>San Luis</option>
							<option>Santa Cruz</option>
							<option>Santa Fe</option>
							<option>Santiago del Estero</option>
							<option>Tierra del Fuego</option>
							<option>Tucumán</option>
							</select>
						</p>
						<!-- Custom: Locality -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_locality"><?php esc_html_e( 'Departamento/Localidad', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-localidad" name="billing_locality" id="billing_locality" autocomplete="locality" placeholder="Departamento/Localidad" value="" />
						</p>
						<!-- Custom: Address -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_address_1"><?php esc_html_e( 'Dirección *', 'woocommerce' ); ?></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-direccion" name="billing_address_1" id="billing_address_1" autocomplete="address" placeholder="Dirección" value="" />
						</p>

						<!-- Production Systems -->
						<h3 class="my-account__form-billing-profile-subtitle my-account__production-system-title">Sistema de producción</h3>

						<div class="my-account__form-row-items-container js-production-systems-container">

							<?php if (empty($profile['establecimientos'][$z]['productionSytems'])) : ?>

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="0">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_production_system"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system" id="billing_production_system" autocomplete="billing_production_system" value=<?php echo $profile['establecimientos'][$z]['productionSytems'][0]['sistemaProduccion']; ?>>
										<option hidden><?php echo ($profile['establecimientos'][$z]['productionSytems'][0]['sistemaProduccion']) ? $profile['establecimientos'][$z]['productionSytems'][0]['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number" id="billing_cattle_head_number" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $profile['establecimientos'][$z]['productionSytems'][0]['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type" id="billing_cattle_type" autocomplete="billing_cattle_type">
										<option hidden><?php echo ($profile['establecimientos'][$z]['productionSytems'][0]['cattleType']) ? $profile['establecimientos'][$z]['productionSytems'][0]['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

							</div>	

							<?php 
								else : 
								$x = 0;
								foreach( $profile['establecimientos'][$z]['productionSytems'] as $productionSystem) : 
							?>

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="<?php echo $x; ?>">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide production-system">
									<label for="billing_production_system_<?php echo $index; ?>"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system_<?php echo $index; ?>" id="billing_production_system_<?php echo $index; ?>" autocomplete="billing_production_system" value=<?php echo $productionSystem['sistemaProduccion']; ?>>
										<option hidden><?php echo ($profile['establecimientos'][$z]['productionSytems'][$x]['sistemaProduccion'] ) ? $profile['establecimientos'][$z]['productionSytems'][$x]['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number_<?php echo $index; ?>"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number_<?php echo $index; ?>" id="billing_cattle_head_number_<?php echo $index; ?>" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $productionSystem['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type_<?php echo $index; ?>"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type_<?php echo $index; ?>" id="billing_cattle_type_<?php echo $index; ?>" autocomplete="billing_cattle_type" value=<?php echo $productionSystem['cattleType']; ?>>
										<option hidden><?php echo ($productionSystem['cattleType']) ? $productionSystem['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

								<!-- Trash - Delete Row -->
								<?php if ($x !== 0) : ?>
									<div class="my-account__trash-container woocommerce-form-row form-row">
										<div class="trash js-delete-row">
										</div>
									</div>
								<?php endif; ?>
							</div>	
								
							<?php
								$x++;
								endforeach;
								endif; 
							?>
						</div>

						<!-- Add Production System -->
						<div class="plus js-add-production-system" data-index-btn-production-system="">Agregar otro sistema de producción</div>

					</div>

				<?php } else { 
				$z = 0;
				foreach ($establecimientos as $establecimiento): ?>

					<!-- Establecimiento -->
					<div class="my-account__form-establecimiento billing-establecimiento js-establecimiento">

						<div class="billing-establecimiento__header">
							<h3 class="my-account__form-billing-profile-subtitle">Datos del establecimiento</h3>
							<!-- Delete Estbablecimiento -->
							<?php if ($z !== 0) : ?>
								<div class="billing-establecimiento__delete-btn js-delete-establecimiento">
									Eliminar
								</div>
							<?php endif; ?>
						</div>

						<!-- Custom: Establishment Name -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--medium">
							<label for="billing_company"><?php esc_html_e( 'Nombre de establecimiento', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation nombre_establecimiento" name="billing_company" id="billing_company" autocomplete="establishment-name" placeholder="Nombre de establecimiento" value="<?php echo $profile['establecimientos'][$z]['nombre']; ?>" />
						</p>
						<!-- Custom: Renspa -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small form-row--renspa">
							<label for="billing_renspa"><?php esc_html_e( 'RENSPA', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text renspa" data-mask="00.000.0.00000/00" name="billing_renspa" id="billing_renspa" autocomplete="renspa" placeholder="09.003.9.00321/01" value="<?php echo $profile['establecimientos'][$z]['renspa']; ?>" />
						</p>
						<div class="clear"></div>
						<!-- Custom: Province -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_province"><?php esc_html_e( 'Provincia', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<select class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-provincia" name="billing_province" id="billing_province" autocomplete="billing_province">
							<option hidden><?php echo ($profile['establecimientos'][$z]['provincia']) ? $profile['establecimientos'][$z]['provincia'] : 'Provincia'; ?></option>
							<option>Buenos Aires</option>
							<option>Capital Federal</option>
							<option>Catamarca</option>
							<option>Chaco</option>
							<option>Chubut</option>
							<option>Córdoba</option>
							<option>Corrientes</option>
							<option>Entre Ríos</option>
							<option>Formosa</option>
							<option>Jujuy</option>
							<option>La Pampa</option>
							<option>La Rioja</option>
							<option>Mendoza</option>
							<option>Misiones</option>
							<option>Neuquén</option>
							<option>Río Negro</option>
							<option>Salta</option>
							<option>San Juan</option>
							<option>San Luis</option>
							<option>Santa Cruz</option>
							<option>Santa Fe</option>
							<option>Santiago del Estero</option>
							<option>Tierra del Fuego</option>
							<option>Tucumán</option>
							</select>
						</p>
						<!-- Custom: Locality -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_locality"><?php esc_html_e( 'Departamento/Localidad', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-localidad" name="billing_locality" id="billing_locality" autocomplete="locality" placeholder="Departamento/Localidad" value="<?php echo $profile['establecimientos'][$z]['localidad']; ?>" />
						</p>
						<!-- Custom: Address -->
						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
							<label for="billing_address_1"><?php esc_html_e( 'Dirección *', 'woocommerce' ); ?></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-direccion" name="billing_address_1" id="billing_address_1" autocomplete="address" placeholder="Dirección" value="<?php echo $profile['establecimientos'][$z]['direccion']; ?>" />
						</p>

						<!-- Production Systems -->
						<h3 class="my-account__form-billing-profile-subtitle my-account__production-system-title">Sistema de producción</h3>

						<div class="my-account__form-row-items-container js-production-systems-container">

							<?php if (empty($profile['establecimientos'][$z]['productionSytems'])) : ?>

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="0">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_production_system"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system" id="billing_production_system" autocomplete="billing_production_system" value=<?php echo $profile['establecimientos'][$z]['productionSytems'][0]['sistemaProduccion']; ?>>
										<option hidden><?php echo ($profile['establecimientos'][$z]['productionSytems'][0]['sistemaProduccion']) ? $profile['establecimientos'][$z]['productionSytems'][0]['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number" id="billing_cattle_head_number" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $profile['establecimientos'][$z]['productionSytems'][0]['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type" id="billing_cattle_type" autocomplete="billing_cattle_type">
										<option hidden><?php echo ($profile['establecimientos'][$z]['productionSytems'][0]['cattleType']) ? $profile['establecimientos'][$z]['productionSytems'][0]['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

							</div>	

							<?php 
								else : 
								$x = 0;
								foreach( $profile['establecimientos'][$z]['productionSytems'] as $productionSystem) : 
							?>

							<div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="<?php echo $x; ?>">
								<!-- Custom: Production System -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide production-system">
									<label for="billing_production_system_<?php echo $index; ?>"><?php esc_html_e( 'Sistema de producción', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system_<?php echo $index; ?>" id="billing_production_system_<?php echo $index; ?>" autocomplete="billing_production_system" value=<?php echo $productionSystem['sistemaProduccion']; ?>>
										<option hidden><?php echo ($profile['establecimientos'][$z]['productionSytems'][$x]['sistemaProduccion'] ) ? $profile['establecimientos'][$z]['productionSytems'][$x]['sistemaProduccion'] : 'Sistema de producción'; ?></option>
										<option>Feedlot</option>
										<option>Sanidad</option>
										<option>Cría</option>
										<option>Tambo</option>
										<option>Invernada</option>
										<option>Cabaña</option>
										<option>Ciclo Completo</option>
									</select>
								</p>

								<!-- Custom: Cattle Head Number -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_head_number_<?php echo $index; ?>"><?php esc_html_e( 'Número de cabeza de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number_<?php echo $index; ?>" id="billing_cattle_head_number_<?php echo $index; ?>" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $productionSystem['headNumber']; ?>" />
								</p>

								<!-- Custom: Cattle Type -->
								<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
									<label for="billing_cattle_type_<?php echo $index; ?>"><?php esc_html_e( 'Tipo de ganado', 'woocommerce' ); ?>&nbsp;<span class="required">*</span></label>
									<select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type_<?php echo $index; ?>" id="billing_cattle_type_<?php echo $index; ?>" autocomplete="billing_cattle_type" value=<?php echo $productionSystem['cattleType']; ?>>
										<option hidden><?php echo ($productionSystem['cattleType']) ? $productionSystem['cattleType'] : 'Tipo de ganado'; ?></option>
										<option>Bovino</option>
										<option>Ovino</option>
									</select>
								</p>

								<!-- Trash - Delete Row -->
								<?php if ($x !== 0) : ?>
									<div class="my-account__trash-container woocommerce-form-row form-row">
										<div class="trash js-delete-row">
										</div>
									</div>
								<?php endif; ?>
							</div>	
								
							<?php
								$x++;
								endforeach;
								endif; 
							?>
						</div>

						<!-- Add Production System -->
						<div class="plus js-add-production-system" data-index-btn-production-system="">Agregar otro sistema de producción</div>

					</div>

				<?php $z++;
				endforeach;
				}; ?>

				</div>

				<div class="billing-profile__footer">
					<!-- Add Establcimiento -->
					<div class="billing-establecimiento__add-new button button--outline js-add-establecimiento" style="width: 100%;" data-index-btn-establecimiento="">Agregar otro Establecimiento</div>

					<?php do_action( 'woocommerce_edit_account_form' ); ?>
					<!-- Guardar Cambios -->
					<p class="edit-count-submit-btn">
						<?php wp_nonce_field( 'save_account_details', 'save-account-details-nonce' ); ?>
						<button type="submit" class="js-submit-row woocommerce-Button button" name="save_account_details" value="<?php esc_attr_e( 'Save changes', 'woocommerce' ); ?>"><?php esc_html_e( 'Guardar Cambios', 'woocommerce' ); ?></button>
						<input type="hidden" name="action" value="save_account_details" />
					</p>
					<?php do_action( 'woocommerce_edit_account_form_end' ); ?>
				</div>

			</div>

		</div>

	<?php $index++; 
		endforeach;
	endforeach;
	endif; ?>

</div>

<!-- Plus - Add Profile -->
<div class="billing-profile__add-new-btn-container">
	<div class="button button--outline" id="js-add-profile" style="width: 100%;">Agregar otra Razón Social</div>
</div>

<!-- <pre><?php //print_r($billingProfile); ?></pre> -->
