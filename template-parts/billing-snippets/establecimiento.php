<div class="billing-establecimiento__header">
    <h3 class="my-account__form-billing-profile-subtitle">Datos del establecimiento</h3>
    <!-- Delete Estbablecimiento -->
    <div class="billing-establecimiento__delete-btn js-delete-establecimiento">
        Eliminar
    </div>
</div>

<!-- Custom: Establishment Name -->
<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--medium">
    <label for="billing_company">Nombre de establecimiento&nbsp;<span class="required">*</span></label>
    <input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation nombre_establecimiento" name="billing_company" id="billing_company" autocomplete="establishment-name" placeholder="Nombre de establecimiento" value="" />
</p>
<!-- Custom: Renspa -->
<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small form-row--renspa">
    <label for="billing_renspa">RENSPA&nbsp;<span class="required">*</span></label>
    <input type="text" class="woocommerce-Input woocommerce-Input--email input-text renspa" data-mask="00.000.0.00000/00" name="billing_renspa" id="billing_renspa" autocomplete="renspa" placeholder="09.003.9.00321/01" value="" />
</p>
<div class="clear"></div>
<!-- Custom: Province -->
<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
    <label for="billing_province">Provincia&nbsp;<span class="required">*</span></label>
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
    <label for="billing_locality">Departamento/Localidad&nbsp;<span class="required">*</span></label>
    <input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-length-validation js-localidad" name="billing_locality" id="billing_locality" autocomplete="locality" placeholder="Departamento/Localidad" value="" />
</p>
<!-- Custom: Address -->
<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide form-row--small">
    <label for="billing_address_1">Dirección</label>
    <input type="text" class="woocommerce-Input woocommerce-Input--email input-text js-direccion" name="billing_address_1" id="billing_address_1" autocomplete="address" placeholder="Dirección" value="" />
</p>

<!-- Production Systems -->
<h3 class="my-account__form-billing-profile-subtitle my-account__production-system-title">Sistema de producción</h3>

<div class="my-account__form-row-items-container js-production-systems-container">

    <div class="my-account__form-row-item billing-production-system js-production-system" data-index-row="0">
        <!-- Custom: Production System -->
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="billing_production_system">Sistema de producción&nbsp;<span class="required">*</span></label>
            <select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-production-system-select" name="billing_production_system" id="billing_production_system" autocomplete="billing_production_system" value="">
                <option hidden>Sistema de producción</option>
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
            <label for="billing_cattle_head_number">Número de cabeza de ganado&nbsp;<span class="required">*</span></label>
            <input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number" id="billing_cattle_head_number" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="<?php echo $establecimiento['productionSytems'][0]['headNumber'] ?? ''; ?>" />
        </p>

        <!-- Custom: Cattle Type -->
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="billing_cattle_type">Tipo de ganado&nbsp;<span class="required">*</span></label>
            <select class="woocommerce-Input woocommerce-Input--email input-text js-row-select js-cattle-type" name="billing_cattle_type" id="billing_cattle_type" autocomplete="billing_cattle_type">
                <option hidden>Tipo de ganado</option>
                <option>Bovino</option>
                <option>Ovino</option>
            </select>
        </p>

    </div>	

</div>

<!-- Add Production System -->
<div class="plus js-add-production-system" data-index-btn-production-system="">Agregar otro sistema de producción</div>
