<section class="delete-profile" id="js-cancel-order-modal">

    <div class="delete-profile__container success-checkout__container--lg">

        <div class="delete-profile__close-btn js-cancel-cancel-order">
        </div>

        <div class="delete-profile__icon-container">
            <img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/alert.svg" alt="">
        </div>

        <div class="delete-profile__title-container">
            <h2 class="delete-profile__title delete-profile__title--lg">¿Seguro que quieres cancelar esta orden?</h2> 
        </div>

        <div class="delete-profile__btn-container">
            <button class="delete-profile__btn delete-profile__btn" id="js-confirm-cancel-order">Sí, estoy seguro</button>
            <button class="delete-profile__btn delete-profile__btn--inverted js-cancel-cancel-order">Cancelar</button>
        </div>

    </div>
    
</section>