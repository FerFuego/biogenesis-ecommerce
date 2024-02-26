<div class="login" id="js-login-container">

    <div class="login__container">

        <div class="login__close-btn js-login-btn-toggle">
        </div>

        <h2 class="login__title">Ingresar con tu Cuenta</h2>

        <form id="login" action="<?php echo admin_url( 'admin-ajax.php' ); ?>" method="post">
            <!--label for="username">Email</label>-->
            <input id="username" type="text" name="username" placeholder="Email">
            <!--<label for="password">Password</label>-->
            <input id="password" type="password" name="password" placeholder="Contraseña">
            <p class="status" id="js-login-status"></p>
            <a href="#!" class="lost js-lost-password-btn">¿Olvidaste tu Contraseña?</a>
            <div class="btn-container">
                <input class="submit_button" id="js-login-submit-btn" type="submit" value="Ingresar" name="submit">
            </div>
            <h5 class="new">¿Todavía no tienes Cuenta? <a href="#!" id="js-sign-up-btn-from-login">Registrarse aquí</a></h5>
            <!--<a class="close" href="">(close)</a>-->
            <?php wp_nonce_field('ajax-login-nonce', 'security'); ?>
        </form>

    </div>

</div>



