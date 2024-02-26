<div class="sign-up__second-step">
  <h2 class="sign-up__title">Datos de Contacto</h2>
  <h5 class="sign-up__description">Para poder realizar compras deberas completar los siguientes datos:</h5>

  <form class="sign-up__form-second-step" method="post" name="st-update-user-contact-information" id="st-update-user-contact-information">
    <div class="field">
      <label for="st-establishment-name" class="sign-up__label">Nombre de establecimiento / Razón Social *</label>
      <input type="text" autocomplete="off" name="fname" id="st-establishment-name" />
    </div>

    <div class="field">
      <label for="st-adress" class="sign-up__label">Provincia *</label>
      <select class="form-control" name="" id="st-province" placeholder="Provincia" required>
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
    </div>
    
    <div class="field">
      <label for="st-adress" class="sign-up__label">Departamento/Localidad *</label>
      <input type="text" autocomplete="off" name="lname" id="st-locality" required />
    </div>

    <div class="field">
      <label for="st-adress" class="sign-up__label">Direccion</label>
      <input type="text" autocomplete="off" name="lname" id="st-adress" />
    </div>

    <div class="field field-cuit">
      <label for="st-cuit" class="sign-up__label">CUIT *</label>
      <input type="number" maxlength="11" autocomplete="off" name="fname" id="st-cuit" />
    </div>

    <div class="field field-renspa">
      <label for="st-renspa" class="sign-up__label">RENSPA *</label>
      <input type="text" autocomplete="off" name="lname" id="st-renspa" />
    </div>

    <div class="error-message"></div>

    <div class="frm-button btn-container sign-up__submit-container">
      <a class="sign-up__submit sign-up__skip button" href="<?php echo home_url() ?>">Completar más tarde</a>
      <a href="#!" class="sign-up__submit button" id="update-user-contact-information">Guardar</a>
    </div>

  </form>
</div>