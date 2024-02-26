<div class="sign-up" id="js-sign-up-container">
  <div class="sign-up__grid">
    <div class="sign-up__container">

        <div class="sign-up__close-btn js-sign-up-btn-toggle"></div>

        <?php get_template_part( 'template-parts/elements/element', 'form_sign_up_first_step' ); ?>
        <?php get_template_part( 'template-parts/elements/element', 'form_sign_up_second_step' ); ?>

        <div class="sign-up__bottom-cta">
          ¿Ya tienes una cuenta? 
          <a id="js-login-here" href="#">Inicia sesión aquí</a>
        </div>

    </div>

    <div class="sign-up__image" style="background-image:url(<?php echo get_field('sign-up__image', 'options')['url']; ?>);"></div>

  </div>
</div>
