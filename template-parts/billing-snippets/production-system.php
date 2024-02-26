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
    <input type="number" class="woocommerce-Input woocommerce-Input--email input-text js-row-input js-head-number" name="billing_cattle_head_number" id="billing_cattle_head_number" autocomplete="cattle-head-number" placeholder="Número de cabeza de ganado" value="" />
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

<!-- Trash - Delete Row -->
<div class="my-account__trash-container woocommerce-form-row form-row">
    <div class="trash js-delete-row">
    </div>
</div>