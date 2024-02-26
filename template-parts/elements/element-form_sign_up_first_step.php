<div class="sign-up__first-step">
  <h2 class="sign-up__title">Crear Cuenta</h2>

  <h3 class="sign-up__sub-title">Registrarte con tu Email</h3>

  <form method="post" name="st-register-form" id="st-register-form">
    <div class="field field-email">
      <label for="st-email" class="sign-up__label">Email</label>
      <input type="text" autocomplete="off" name="mail" id="st-email" />
    </div>

    <div class="field field-password">
      <label for="st-psw" class="sign-up__label">Contraseña</label>
      <input type="password" name="password" id="st-psw" />
      <div class="sign-up__change-view" id="js-change-view-password"></div>
    </div>

    <!-- TyC -->
    <?php $termsAndConditionsLink = get_field('terms_and_conditions-link', 'options'); ?>
    <div class="sign-up__terms-and-conditions">
      <input type="checkbox" name="checkbox" id="st-terms-and-conditions" />
      <?php if ($termsAndConditionsLink) : ?>
        <label class="sign-up__terms-and-conditions-copy" for="st-terms-and-conditions">Al registrarte, aceptas nuestros <a href="<?php echo $termsAndConditionsLink['url']; ?>" target='<?php echo $termsAndConditionsLink['target']; ?>' ><?php echo $termsAndConditionsLink['title']; ?></a></label>
      <?php endif; ?>
    </div>

    <div class="error-message"></div>

    <?php wp_nonce_field('ajax-login-nonce', 'security'); ?>

    <!-- CTA -->
    <div class="frm-button btn-container sign-up__submit-container">
      <a class="sign-up__submit button" id="register-me">Registrarse</a>
    </div>

  </form>
</div>