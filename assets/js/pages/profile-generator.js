// Row Generator 
jQuery(document).ready(function ($) {
  if (document.body.classList.contains('woocommerce-account') || document.body.classList.contains('woocommerce-checkout') ) {

    // Checkout Page?
    let isCheckout = false
    if (document.body.classList.contains('woocommerce-checkout')) {
       isCheckout = true
    }

    /* ---- VARIABLES ---- */
    let rowsQuantity = document.querySelectorAll('.js-billing-profile').length;
    let rowIndex = rowsQuantity;

    // Containers
    const rowsContainer = document.getElementById('js-billing-profiles'); // billing profiles container
    let billingProfiles = document.querySelectorAll('.js-billing-profile') // billing profile array

    // Fields
    let allUserFields = document.querySelectorAll('#js-user-data-container > .woocommerce-form-row > .woocommerce-Input')

    // Add
    let addRow = document.getElementById('js-add-profile'); // add billing profile btn
    document.body.addEventListener('click', addProductionSystem) // New Production System
    document.body.addEventListener('click', addEstablecimiento) // New Establecimiento System

    // Delete
    let deleteBillingProfile = document.querySelectorAll('.js-delete-billing-profile');
    document.body.addEventListener('click', handleDeleteEsablecimiento) // Delete Establecimiento
    

    // Save
    const submitUserInfo = document.getElementById('js-save-user-info')
    let submitRow = document.querySelectorAll('.js-submit-row');
    let alternativeSaveChanges = document.querySelectorAll('.js-submit-row-alternative')  // Save Changes Alternative
    const submitOrder = document.getElementById('place_order')

    // Checkout Checkboxes
    let checkBoxes = document.querySelectorAll('.js-card-checkbox')

    
    /* --- BILLING PROFILE  --- */

    /* -- Create Container -- */
    const createRow = (rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('my-account__form-billing-profile');
      row.classList.add('js-billing-profile');
      row.classList.add('billing-profile');
      row.classList.add('active');
      row.setAttribute('data-index-row', rowIndex);

      return row;
    }

    /* -- Add -- */
    const handleAddBillingProfile = () => {    

      // Create Billing Profile Container
      const rowItemsContainer = createRow(rowIndex);
      billingProfiles.forEach(profile => {
        profile.classList.remove('active')
      })
      rowsContainer.appendChild(rowItemsContainer);
    
      // Ajax GET snippet
      getBillingProfile(rowItemsContainer)

      // Ajax POST input values
      getAllValues();
    }
    
    if (addRow) {
      addRow.addEventListener('click', handleAddBillingProfile);
    }

    const getBillingProfile = (appendLocation) => {

      $.ajax({
        type: "GET",
        dataType: "html",
        url: templatePath.templateUrl + '/template-parts/billing-snippets/billing-profile.php',
        success: function (data) {
          appendLocation.innerHTML = data
          updateBtns()
          updateVariables()
          updateCompleteEstablishmentValidation()
          updateDeleteConfirmationModal()
          if (isCheckout) {
            assignIndexToBillingProfile()
          }
          updateCheckBoxes()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('ERROR gettin billing profile');
        }
      });
    }

    // Add Close Btn
    document.body.addEventListener('click', closeBillingProfile)
    function closeBillingProfile (e) {
      if (e.target.classList.contains('js-close-billing-profile')) {
        let thisBillingProfile = e.target.closest('.js-billing-profile')
        thisBillingProfile.classList.remove('active')
      }
    }

    // Add Edit Btn + Option
    document.body.addEventListener('click', editBillingProfile)
    function editBillingProfile (e) {
      if (e.target.classList.contains('js-edit-billing-profile')) {
        let thisBillingProfile = e.target.closest('.js-billing-profile')
        thisBillingProfile.classList.remove('invalid-profile')
        thisBillingProfile.classList.add('active')
      }
    }

    /* -- Checkout > Passing Index to Billing Profile -- */
    const assignIndexToBillingProfile = function () {
      let currentProfileIndex = billingProfiles.length - 1
      
      checkBoxes[currentProfileIndex].value = currentProfileIndex
      checkBoxes[currentProfileIndex].id = 'billing-profile-' + currentProfileIndex
      checkBoxes[currentProfileIndex].checked = true
    }
    
    /* -- Delete -- */
    const handleDeleteProfile = ({ target }) => {	
      target.closest('.js-billing-profile').remove();
      // Event Submit and Save Changes
      $("[name='save_account_details']").trigger("click");

      const rowValues = getAllValues();
      $.ajax({
          type: "POST",
          dataType: "json",
          url: bio_vars.ajaxUrl,
          async: false,
          data: {
              action: 'update_billing_profile_action',
              perfil_facturacion: JSON.stringify(rowValues)
          },
          success: function () {
              location.reload(); 
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log('ERROR');
          }
      });
    }

    // Delete Confirmation Modal
    const deleteProfileConfirmationModal = document.getElementById('js-delete-profile-validation') 
    const deleteProfileConfirmationBtn = document.getElementById('js-confirm-delete-profile')
    const deleteProfileCancelBtn = document.querySelectorAll('.js-cancel-delete-profile')
    if (deleteBillingProfile) {
      deleteBillingProfile.forEach(element => {
        element.addEventListener('click', (event) => {      
          event.preventDefault()
          deleteProfileConfirmationModal.classList.add('active');
          deleteProfileConfirmationBtn.addEventListener('click', () => {
            handleDeleteProfile(event)  
            deleteProfileConfirmationModal.classList.remove('active');
          })    
          deleteProfileCancelBtn.forEach(btn => {
            btn.addEventListener('click', () => {
              deleteProfileConfirmationModal.classList.remove('active');
            })
          })
        });
      });
    }


    /* --- ESTABLECIMIENTO  --- */

    /* -- Create Container -- */
    function createEstablecimiento(rowIndex) {
      const establecimiento = document.createElement('div');
      establecimiento.classList.add('my-account__form-establecimiento');
      establecimiento.classList.add('billing-establecimiento');
      establecimiento.classList.add('js-establecimiento');
      establecimiento.setAttribute('data-index-row', rowIndex);

      return establecimiento;
    }

    /* -- Add -- */
    function handleAddEstablecimiento(addEstablecimientoBtn){ 

      // Create Row Items Container
      const rowItemsContainer = createEstablecimiento(addEstablecimientoBtn);
      addEstablecimientoBtn.appendChild(rowItemsContainer);
    
      // Ajax GET snippet
      getEstablecimiento(rowItemsContainer);
      
      // Ajax POST input values
      getAllValues();
    }

    function addEstablecimiento (e) {
      if (e.target.classList.contains('js-add-establecimiento')) {
        let btnContainer = e.target.closest('.billing-profile__footer')
        let index = btnContainer.previousElementSibling
        handleAddEstablecimiento(index)
      }
    }
    
    const getEstablecimiento = (appendLocation) => {

      $.ajax({
        type: "GET",
        dataType: "html",
        url: templatePath.templateUrl + '/template-parts/billing-snippets/establecimiento.php',
        success: function (data) {
          appendLocation.innerHTML = data
          updateVariables();
          updateBtns();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('ERROR fetching new establishment');
        }
      });
    }

    /* -- Delete -- */
    function handleDeleteEsablecimiento (e) {	
      if (e.target.classList.contains('js-delete-establecimiento')) {
        e.target.closest('.js-establecimiento').remove();
        updateVariables();
      }
    } 


    /* --- SISTEMA DE PRODUCCION --- */

    /* -- Add -- */
    const handleAddProductionSystem = (addProductionSystemBtn) => {

      // Create Production System Container
      const rowItemsContainer = createProductionSystem(rowIndex);
      addProductionSystemBtn.appendChild(rowItemsContainer);

      // Ajax GET snippet
      getProductionSytem(rowItemsContainer);

      // Ajax POST input values
      getAllValues();
    }

    function addProductionSystem (e) {
      if (e.target.classList.contains('js-add-production-system')) {
        let index = e.target.previousElementSibling
        handleAddProductionSystem(index)
      }
    }

    const getProductionSytem = (appendLocation) => {

      $.ajax({
        type: "GET",
        dataType: "html",
        url: templatePath.templateUrl + '/template-parts/billing-snippets/production-system.php',
        success: function (data) {
          appendLocation.innerHTML = data
          updateVariables()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('ERROR fetching new production system');
        }
      });
    }
    
    /* -- Delete -- */
    document.body.addEventListener('click', handleDeleteProductionSystem)
    function handleDeleteProductionSystem (e) {	
      if (e.target.classList.contains('js-delete-row')) {
        e.target.closest('.js-production-system').remove();
      }
    }
    
    /* -- Create Container -- */
    const createProductionSystem = (rowIndex) => {
      const productionSystem = document.createElement('div');
      productionSystem.classList.add('my-account__form-row-item');
      productionSystem.classList.add('billing-production-system');
      productionSystem.classList.add('js-production-system');
      productionSystem.setAttribute('data-index-row', rowIndex);

      return productionSystem;
    }
    

    /* ---- GET VALUES ---- */
    const getAllValues = () => {
      let allBillingProfiles = Array.from(document.querySelectorAll('.js-billing-profile'));
      let allValues = []

      // Object: Campo
      function Campo(razonSocial, cuit, arrEstablecimientos) {
        this.razon_social = razonSocial
        this.cuit = cuit
        this.establecimientos = arrEstablecimientos
      } 
      // Object: Establecimiento
      function Establecimiento(establishmentName, renspa, provincia, localidad, direccion, arrayProductionSystems) {
        this.nombre = establishmentName
        this.renspa = renspa
        this.provincia = provincia
        this.localidad = localidad
        this.direccion = direccion
        this.productionSytems = arrayProductionSystems
      };

      // Object: Production Sytem
      function SistemaProduccion(sistemaProduccion, headNumber, cattleType) {
        this.sistemaProduccion = sistemaProduccion
        this.headNumber = headNumber
        this.cattleType = cattleType
      };

      /* -- Get Values -- */
      // Get Values From Billing Profiles
      allBillingProfiles.forEach(element => {
        const allEstablecimientos = Array.from(element.querySelectorAll('.js-establecimiento'));
        const inputs = element.querySelectorAll('.woocommerce-Input');

        // Variable declaration
        let razonSocial
        let cuit
        let establishmentName
        let renspa
        let provincia
        let localidad
        let direccion
        let sistemaProduccion
        let headNumber
        let cattleType

        inputs.forEach( input => {
          if (input.classList.contains('razon_social')) {
            razonSocial = input.value
            return razonSocial
          }
          if (input.classList.contains('cuit')) {
            cuit = input.value
            return cuit
          }
        });

        // Get Values From Establecimiento
        let arrEstablecimientos = []
        allEstablecimientos.forEach(establecimiento => {
          const allProductionSystems = Array.from(establecimiento.querySelectorAll('.js-production-system'));
          const inputs = establecimiento.querySelectorAll('.woocommerce-Input');

          inputs.forEach(input => {
            if (input.classList.contains('nombre_establecimiento')) {
              establishmentName = input.value
              return establishmentName
            }
            if (input.classList.contains('renspa')) {
              renspa = input.value
              return renspa
            }
            if (input.classList.contains('js-provincia')) {
              provincia = input.value
              return provincia
            }
            if (input.classList.contains('js-localidad')) {
              localidad = input.value
              return localidad
            }
            if (input.classList.contains('js-direccion')) {
              direccion = input.value
              return direccion
            }
          })

          // Get Values From Production Systems
          let arrayProductionSystems = []
          allProductionSystems.forEach(system => {
            const inputs = system.querySelectorAll('.woocommerce-Input');

            inputs.forEach(input => {
              if (input.classList.contains('js-production-system-select')) {
                sistemaProduccion = input.value
                return sistemaProduccion
              }
              if (input.classList.contains('js-head-number')) {
                headNumber = input.value
                return headNumber
              }
              if (input.classList.contains('js-cattle-type')) {
                cattleType = input.value
                return cattleType
              }
            })

            arrayProductionSystems.push(new SistemaProduccion (sistemaProduccion, headNumber, cattleType ))
          });

          arrEstablecimientos.push(new Establecimiento (establishmentName, renspa, provincia, localidad, direccion, arrayProductionSystems))

        });

        allValues.push(new Campo (razonSocial, cuit, arrEstablecimientos)) // nuevo perfil de facturación

      });
      return allValues;
    }


    /* ---- VALIDATIONS ---- */

    // Character Validation
    function charValidation (validatedField, charNumb) {
      if (validatedField.value.length > charNumb) return true; 

      if (validatedField.value.length == charNumb) {
        validatedField.parentNode.classList.remove('woocommerce-invalid')
        validatedField.parentNode.classList.remove('invalid-input') // checkout
      } else {
        validatedField.parentNode.classList.add('woocommerce-invalid')
        validatedField.parentNode.classList.add('invalid-input') // checkout
      }
    }

    // Character Validation
    function charPhoneValidation (validatedField, charNumb, charMax) {
      if (validatedField.value.length > charNumb) return true; 

      if (validatedField.value.length > charNumb && validatedField.value.length < charMax) {
        validatedField.parentNode.classList.remove('woocommerce-invalid')
        validatedField.parentNode.classList.remove('invalid-input') // checkout
      } else {
        validatedField.parentNode.classList.add('woocommerce-invalid')
        validatedField.parentNode.classList.add('invalid-input') // checkout
      }
    }

    // No CUIT repetition Validation
    function cuitNoRepetition () {
      let cuits = document.querySelectorAll('.cuit')
      let cuitsArray = []
      let cuitsArrayValues = []
      cuits.forEach(cuit => {
        cuitsArray.push(cuit)
        cuitsArrayValues.push(cuit.value) 
      });

      let resultToReturn = false;
      let error;
      let indexOne; 
      let indexTwo;
      for (let i = 0; i < cuitsArrayValues.length; i++) { // nested for loop
          for (let j = 0; j < cuitsArrayValues.length; j++) {
              // prevents the element from comparing with itself
              if (i !== j) {
                  // check if elements' values are equal
                  if (cuitsArrayValues[i] === cuitsArrayValues[j]) {
                      // duplicate element present                                
                      resultToReturn = true;
                      indexOne = i;
                      indexTwo = j;
                      // terminate inner loop
                      break;
                  }
              }
          }
          // terminate outer loop                                                                      
          if (resultToReturn) {
              break;
          }
      }

      if(resultToReturn) {
        cuitsArray[indexOne].parentNode.classList.add('woocommerce-invalid')
        cuitsArray[indexOne].parentNode.classList.add('invalid-input')
        cuitsArray[indexTwo].parentNode.classList.add('woocommerce-invalid')
        cuitsArray[indexTwo].parentNode.classList.add('invalid-input')
        error = true
        return error;
      } else {
        error = false
        return error;
      }
    }

    // Length validation (no empty fields) - Text and Number
    function lengthValidation (validatedField) {
      if (/[a-zA-Z0-9]/.test(validatedField.value)) { // must contain al least one letter
        validatedField.parentNode.classList.remove('woocommerce-invalid')
        validatedField.parentNode.classList.remove('invalid-input') // checkout
      } else {
        validatedField.parentNode.classList.add('woocommerce-invalid')
        validatedField.parentNode.classList.add('invalid-input') // checkout
      }
    }
    // Length validation (no empty fields) - Select
    function lengthValidationSelect (validatedField) {
      if (validatedField.value == 'Provincia' || validatedField.value == 'Sistema de producción' || validatedField.value == 'Tipo de ganado') {
        validatedField.parentNode.classList.add('woocommerce-invalid')
        validatedField.parentNode.classList.add('invalid-input') // checkout
      } else {
        validatedField.parentNode.classList.remove('woocommerce-invalid')
        validatedField.parentNode.classList.remove('invalid-input') // checkout
      }
    }

    /* - General Validation. - */
  
    // ON INPUT
    // ... user fields
    allUserFields.forEach(field => {                 
      field.addEventListener('input', () => {
        if (field.value.length == 0 && field.name != 'billing_phone') {
          field.parentNode.classList.add('woocommerce-invalid')
          submitUserInfo.setAttribute("disabled", "");
        } else {
          field.parentNode.classList.remove('woocommerce-invalid')
          submitUserInfo.removeAttribute("disabled");
        }
      })
    })
    // ... billing profiles
    document.body.addEventListener('keyup', validateBillingFields)
    function validateBillingFields (e) {
      // Temp Fix
      if (e.target.classList.contains('woocommerce-Input')) {
        submitRow.forEach(btn => {
          btn.removeAttribute('disabled')
          btn.classList.remove('disabled')
        })
        alternativeSaveChanges.forEach(btn => {
          btn.removeAttribute('disabled')
          btn.classList.remove('disabled')
        })
      }
      // First Name
      if (e.target.id == 'billing_first_name') {
        lengthValidation(e.target)
      }
      // Last Name
      if (e.target.id == 'billing_last_name') {
        lengthValidation(e.target)
      }
      // Celular
      if (e.target.id == 'billing_phone_cel') {
        lengthValidation(e.target);
        charPhoneValidation(e.target, 13, 16);
      }
      // Tel. Fijo
      if (e.target.id == 'billing_phone') {
        if (e.target.value.length > 0) {
          lengthValidation(e.target);
          charPhoneValidation(e.target, 13, 16);
        } else {
          e.target.parentNode.classList.remove('woocommerce-invalid')
          e.target.parentNode.classList.remove('invalid-input') // checkout
        }
      }
      // Razón Social
      if (e.target.classList.contains('razon_social')) {
        lengthValidation(e.target)
      }
      // Cuit
      if (e.target.classList.contains('cuit')) {
        charValidation(e.target, 13);
      }
      // Nombre Establecimiento 
      if (e.target.classList.contains('nombre_establecimiento')) {
        lengthValidation(e.target)
      }
      // RENSPA
      if (e.target.classList.contains('renspa')) {
          charValidation(e.target, 17);
      }
      // Provincia
      if (e.target.classList.contains('js-provincia')) {
        lengthValidationSelect(e.target)
      }
      // Localidad
      if (e.target.classList.contains('js-localidad')) {
        lengthValidation(e.target)
      }
      // Dirección
      if (e.target.classList.contains('js-direccion')) {
        lengthValidation(e.target)
      }
      // Sistema Producción
      if (e.target.classList.contains('js-production-system-select')) {
        lengthValidationSelect(e.target)
      }
      // N° Cabezas de Ganado
      if (e.target.classList.contains('js-head-number')) {
        lengthValidation(e.target)
      }
      // Tipo de ganado
      if (e.target.classList.contains('js-cattle-type')) {
        lengthValidationSelect(e.target)
      }
    }
    // ON SUBMIT

    // Get Veterinarias (Before submit to check on submit if search is used)
    let listadoVeterinarias;
    (function getResults() {
        $.getJSON(bio_vars.rootUrl + '/wp-json/bb/v1/veterinarias', function(results) {
            listadoVeterinarias = results.veterinarias
        });
    })()

    document.body.addEventListener('click', validateBillingFieldsOnSumbit)
    function validateBillingFieldsOnSumbit (e) {      
      // Save Changes
      if (e.target.classList.contains('js-submit-row') || e.target.classList.contains('js-submit-row-alternative')) {
        // Variables
        let thisFields = e.target.parentNode.parentNode.parentNode.querySelectorAll('.woocommerce-Input')
        let errorsArray = []
        // Check for errors
        thisFields.forEach(field => { 
          // Select Inputs
          if (field.type == 'select-one') {
            if (field.value == 'Provincia' || field.value == 'Sistema de producción' || field.value == 'Tipo de ganado') {
              errorsArray.push(field)
              field.parentNode.classList.add('woocommerce-invalid')
              field.parentNode.classList.add('invalid-input') // checkout
            } else {
              field.parentNode.classList.remove('woocommerce-invalid')
              field.parentNode.classList.remove('invalid-input') // checkout
            }
          }
          // Text/Number Inputs
          if (field.type == 'text' || field.type == 'number' || field.type == 'tel') {
            if (!/[a-zA-Z0-9]/.test(field.value)) {
              errorsArray.push(field)
              field.parentNode.classList.add('woocommerce-invalid')
              field.parentNode.classList.add('invalid-input') // checkout
            } else {
              field.parentNode.classList.remove('woocommerce-invalid')
              field.parentNode.classList.remove('invalid-input') // checkout
            }
          }
        })
        // No CUIT repetition
        let error = cuitNoRepetition();
        // If errors...
        if(errorsArray.length != 0 || error == true) {
          e.target.setAttribute("disabled", "");   
          e.target.classList.add('disabled'); 
          e.preventDefault()
          // Debugging
          console.log('Inputs Erróneos:')
          errorsArray.forEach(error => {
            console.log(error)
          });
        } else {
          e.target.removeAttribute("disabled");
          e.target.classList.remove('disabled'); 
          e.preventDefault()
          sendAllValues()
        }
      }
      // Place Order
      if (e.target.id == 'place_order') {
        // add loading indicator
        e.target.classList.add('loading');
        e.target.textContent = '';
        // Variables
        let thisFields = e.target.parentNode.parentNode.parentNode.querySelectorAll('.input-text')  
        let distributorSelectCheckBoxes = document.querySelectorAll('.js-select-vet-checkbox')
        let vetSearchInput = document.getElementById('js-search-vet-input')
        let provinceSelect = document.getElementById('billing_distributor_province')
        let localidadSelect = document.getElementById('billing_distributor_locality')
        let distributorSelect = document.getElementById('billing_distributor')
        let errorsArray = []
        // Check for errors
        thisFields.forEach(field => { 
          // Select Inputs
          if (field.type == 'select-one') {
            if (field.value == 'Provincia' || field.value == 'Sistema de producción' || field.value == 'Tipo de ganado') {
              errorsArray.push(field)
              field.parentNode.classList.add('woocommerce-invalid')
              field.parentNode.classList.add('invalid-input') // checkout
            } else {
              field.parentNode.classList.remove('woocommerce-invalid')
              field.parentNode.classList.remove('invalid-input') // checkout
            }
          }
          // Text/Number Inputs (Cel Phone is required)
          if (field.type == 'text' || field.type == 'number' || field.type == 'tel') {
            // Billing Phone is not Required but if value entered is validated
            if (field.id == 'billing_phone' && field.value.length > 0) {
              if (field.value.length > 13) return true; 
  
              if (field.value.length > 13 && field.value.length < 16) {
                field.parentNode.classList.remove('woocommerce-invalid')
                field.parentNode.classList.remove('invalid-input') // checkout
              } else {
                errorsArray.push(field)
                field.parentNode.classList.add('woocommerce-invalid')
                field.parentNode.classList.add('invalid-input') // checkout
              }
            } else {
              field.parentNode.classList.remove('woocommerce-invalid')
              field.parentNode.classList.remove('invalid-input') // checkout
            }
            // Rest of inputs
            if (field.id !== 'billing_phone') {
              if (!/[a-zA-Z0-9]/.test(field.value)) {
                errorsArray.push(field)
                field.parentNode.classList.add('woocommerce-invalid')
                field.parentNode.classList.add('invalid-input') // checkout
              } else {
                field.parentNode.classList.remove('woocommerce-invalid')
                field.parentNode.classList.remove('invalid-input') // checkout
              }
            }
          }
        })
        // No CUIT repetition
        let error = cuitNoRepetition();
        // Distributor Select
        let vetSearchInputValue = vetSearchInput.value;
        if (distributorSelectCheckBoxes[0].checked) {
          if (!listadoVeterinarias.includes(vetSearchInputValue)) {
            vetSearchInput.closest('.form-row').classList.add('woocommerce-invalid')
            errorsArray.push(vetSearchInput)
            isCheckout = true
            console.log('La Veterinaria ingresada en el campo de búsqueda no existe.')
          }
        } else if (distributorSelectCheckBoxes[1].checked) {
          if (provinceSelect.value == '') {
              provinceSelect.closest('.form-row').classList.add('woocommerce-invalid')
              errorsArray.push(provinceSelect)
              isCheckout = true
          }
          if (localidadSelect.value == '') {
              localidadSelect.closest('.form-row').classList.add('woocommerce-invalid')
              errorsArray.push(localidadSelect)
              isCheckout = true
          }
          if (distributorSelect.value == '') {
              distributorSelect.closest('.form-row').classList.add('woocommerce-invalid')
              errorsArray.push(distributorSelect)
              isCheckout = true
          }
        }
        // If errors...
        if(errorsArray.length != 0 || error == true) {
          e.preventDefault()
          document.querySelectorAll('.js-billing-profile').forEach(profile => {
            profile.classList.remove('invalid-profile')
          });
          // Debugging
          errorsArray.forEach(error => {
            let thisBillingProfile = error.closest('.js-billing-profile')
            if (thisBillingProfile != null) thisBillingProfile.classList.add('invalid-profile')
          });
          // Add Error Notice
          if (isCheckout) {
            const checkoutErrorsContainer = document.getElementById('js-checkout-errors-container')
            setTimeout(function(){ 
              checkoutErrorsContainer.classList.add('active')
              // remove loading indicator
              e.target.classList.remove('loading');
              e.target.textContent = 'Finalizar Beneficio';
            }, 2000);
          }
        } else {
          sendAllValues(e, true)
        }
      }
    }

    /* - Esbalecimiento Complete before adding new one - */
    function validateEstablecimientoComplete (thisProfileInputs, thisAddEstablecimientoBtn) {
      let thisProfileErrors = []
      thisProfileInputs.forEach(input => {
        if (input.value.length == 0) {
          thisProfileErrors.push(input)
        } 
      });

      if (thisProfileErrors.length != 0) {
        thisAddEstablecimientoBtn.classList.add('disabled')
        thisAddEstablecimientoBtn.setAttribute("disabled", "");
      } else {
        thisAddEstablecimientoBtn.classList.remove('disabled')
        thisAddEstablecimientoBtn.removeAttribute("disabled");
      }
    }
    billingProfiles.forEach(billingProfile => {
      let thisAddEstablecimientoBtn = billingProfile.querySelector('.js-add-establecimiento')
      let thisProfileInputs = billingProfile.querySelectorAll('.woocommerce-Input')
      validateEstablecimientoComplete(thisProfileInputs, thisAddEstablecimientoBtn)
    });
   

    /* ---- UPDATES ---- */

    // Update buttons
    const updateBtns = function () {
      addRow = document.getElementById('js-add-profile'); // add billing profile btn
      alternativeSaveChanges = document.querySelectorAll('.js-submit-row-alternative')
    }

    // Update Variables
    const updateVariables = function () {
      rowsQuantity = document.querySelectorAll('.js-billing-profile').length;

      // Containers
      billingProfiles = document.querySelectorAll('.js-billing-profile') // billing profile array
      checkBoxes = document.querySelectorAll('.js-card-checkbox')

      // Delete
      deleteBillingProfile = document.querySelectorAll('.js-delete-billing-profile');
    }

    // Update Establecimiento Complete Validation
    function updateCompleteEstablishmentValidation () {
      billingProfiles.forEach(billingProfile => {
        let thisAddEstablecimientoBtn = billingProfile.querySelector('.js-add-establecimiento')
        let thisProfileInputs = billingProfile.querySelectorAll('.woocommerce-Input')
        validateEstablecimientoComplete(thisProfileInputs, thisAddEstablecimientoBtn)
      });
    }

    // Update Delete Confirmation Modal
    function updateDeleteConfirmationModal () {
      if (deleteBillingProfile) {
        deleteBillingProfile.forEach(element => {
          element.addEventListener('click', (event) => {      
            event.preventDefault()
            deleteProfileConfirmationModal.classList.add('active');
            deleteProfileConfirmationBtn.addEventListener('click', () => {
              handleDeleteProfile(event)  
              deleteProfileConfirmationModal.classList.remove('active');
            })  
            deleteProfileCancelBtn.forEach(btn => {
              btn.addEventListener('click', () => {
                deleteProfileConfirmationModal.classList.remove('active');
              })
            })
          });
        });
      }
    }

    // Update Checkboxes
    function updateCheckBoxes () {
      checkBoxes.forEach(checkBox => {
        checkBox.addEventListener('click', () => {
            checkBoxes.forEach(check => {
                check.checked = false
            });
            checkBox.checked = true
        })
      });
    }


    /* ---- SEND INFO ---- */

 

    // Send All Values
    const sendAllValues = (e, isPlaceOrder = false) => {

      if (sessionStorage.getItem('key') != 'true') {
        // Confirmation Modal
        const confirMationModal = document.getElementById('js-confirmation-modal')
        if (isPlaceOrder) {
          // Preven submit, open modal
          e.preventDefault() 
          confirMationModal.classList.add('active')
          // Exit modal options
          const incorrectDetailsBtns = document.querySelectorAll('.js-incorrect-details')
          incorrectDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault()
              confirMationModal.classList.remove('active');
              // remove loading indicator
              document.querySelector('#place_order').classList.remove('loading');
              document.querySelector('#place_order').textContent = 'Finalizar Beneficio';
              return;
            })
          });
          // Get users info
          let userName = document.getElementById('billing_first_name').value 
          let userLastName = document.getElementById('billing_last_name').value
          // Look for selected Billing Profile and get billing info
          for (let i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
              let selectedBillingCard = checkBoxes[i].closest('.billing-profile__card'); // Card minificada
              let selectedBillingCardInfo = selectedBillingCard.nextElementSibling; // Card Editable
              var selectedBillingRazonSocial = selectedBillingCardInfo.querySelector('.razon_social').value;
              var selectedBillingCuit = selectedBillingCardInfo.querySelector('.cuit').value;

            }
          }
          // Get Vete + Adress > Done in module-map.php line 204
          // Get modal fields
          let printName = document.getElementById('js-order-confirmation-name')
          let printRazonSocial = document.getElementById('js-order-confirmation-razon-social')
          let printCuit = document.getElementById('js-order-confirmation-cuit')
          let printProducts = document.getElementById('js-order-confirmation-products')
          // Print info in modal
          printRazonSocial.innerHTML = selectedBillingRazonSocial 
          printName.innerHTML = userName + ' ' + userLastName
          printCuit.innerHTML = selectedBillingCuit

          document.getElementById('js-correct-details').addEventListener('click', () => {
            confirMationModal.classList.remove('active')
            confirMationModal.style.display = 'none'
            sessionStorage.setItem('correctInfo', 'true');
            localStorage.setItem('cancelation', 'true')
            submitOrder.click()
          })
        }
      }

      const rowValues = getAllValues();
      const action = "update_billing_profile_action";
      const inputsIsValid = true

      // Transition while sending info
      const myAccountBillingProfilesMask = document.getElementById('js-mask-billing-profiles')
      const ajaxSpinnerBillingProfile = document.getElementById('js-spinner-billing-profiles')
      if (ajaxSpinnerBillingProfile) {
        ajaxSpinnerBillingProfile.style.display = 'block'
      }
      if (myAccountBillingProfilesMask) {
        myAccountBillingProfilesMask.style.display = 'block'
      }

      if (inputsIsValid) {
        $.ajax({
          type: "POST",
          dataType: "json",
          url: bio_vars.ajaxUrl,
          async: false,
          data: {
            action,
            perfil_facturacion: JSON.stringify(rowValues)
          },
          success: function () {
            if (!isPlaceOrder) {
              location.reload(); 
            } else {
              ajaxSpinnerBillingProfile.style.display = 'none'
              myAccountBillingProfilesMask.style.display = 'none'
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('ERROR');
          }
        });
      } else {
        e.preventDefault();
      }
    }

    /*if (submitOrder) {
      submitOrder.addEventListener('click', (e) => {
        sendAllValues(e, true)
      });
    }*/

    /* ---- CHECKOUT CHECKBOXES ---- */
    checkBoxes.forEach(checkBox => {
        if (checkBox.value == 0) {
            checkBox.checked = true
        }
        checkBox.addEventListener('click', () => {
            checkBoxes.forEach(check => {
                check.checked = false
            });
            checkBox.checked = true
        })
    });

  }

});
