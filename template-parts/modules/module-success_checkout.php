<section class="success-checkout <?php echo($_SERVER['HTTP_REFERER'] == site_url('checkout/')  ? 'from-checkout' : ''); ?>" id="js-success-modal">

    <div class="success-checkout__container success-checkout__container--lg">

        <div class="success-checkout__close-btn" id="js-keep-buying-modal-close">
        </div>

        <div class="success-checkout__icon-container">
            <img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/checkout_succes.svg" alt="">
        </div>

        <div class="success-checkout__title-container">
            <h2 class="success-checkout__title success-checkout__title--lg">¡Felicitaciones! <br> Tu beneficio fue generado con éxito.</h2> 
        </div>

        <h3 class="success-checkout__subtitle">Hemos enviado a tu Email el <span class="success-checkout__bold">Comprobante.</span> <br> Al finalizar la promoción de suscripción se enviará la confirmación del <span class="success-checkout__bold">Descuento final.</span></h3>

        <div class="success-checkout__btn-container">
            <button class="success-checkout__btn success-checkout__btn--inverted" id="js-keep-buying">Volver al inicio</button>
        </div>

    </div>
    
</section>