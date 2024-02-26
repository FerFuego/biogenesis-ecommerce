jQuery(document).ready(function ($) {   

    /* -- Vet Search -- */
    const searchVet = document.getElementById('js-search-vet')
	const searchInput = document.getElementById('js-search-vet-input')
    const selectVet = document.getElementById('js-select-vet')

    /* -- Checboxes > Search or Select -- */
    let selectVetCheckBoxes = document.querySelectorAll('.js-select-vet-checkbox')
    let vetSearchInput = document.getElementById('js-search-vet-input')
    let provinceSelect = document.getElementById('billing_distributor_province')
    let localidadSelect = document.getElementById('billing_distributor_locality')
    let distributorSelect = document.getElementById('billing_distributor')

    selectVetCheckBoxes.forEach(checkBox => {
        if (checkBox.value == 0) {
            checkBox.checked = true
            searchVet.classList.add('active')
        }

        checkBox.addEventListener('click', () => {
            selectVetCheckBoxes.forEach(check => {
                check.checked = false
            });
            checkBox.checked = true
            
            
            if (checkBox.value == 0) {
                selectVet.classList.remove('active')
                searchVet.classList.add('active')
                // Clear Select
                let allDistributorProvinceOptions = document.querySelectorAll('#billing_distributor_province option')
                let allDistributorLocalityOptions = document.querySelectorAll('#billing_distributor_locality option')
                let allDistributorOptions = document.querySelectorAll('#billing_distributor option')
                allDistributorProvinceOptions.forEach(option => {
                    option.selected = false;
                });
                allDistributorLocalityOptions.forEach(option => {
                    option.selected = false;
                });
                allDistributorOptions.forEach(option => {
                    option.selected = false;
                });
                // Remove Validation Erros
                provinceSelect.closest('.form-row').classList.remove('woocommerce-invalid')
                localidadSelect.closest('.form-row').classList.remove('woocommerce-invalid')
                distributorSelect.closest('.form-row').classList.remove('woocommerce-invalid')
            } else if (checkBox.value == 1) {
                searchVet.classList.remove('active')
                selectVet.classList.add('active')
                // Clear Search
                searchInput.value = ''
                $('.js-search-basic-vetes').val(null).trigger('change');
                // Remove Validation Erros
                vetSearchInput.closest('.form-row').classList.remove('woocommerce-invalid')
            }
        })
    });
})

// New Class Checkout
class Checkout {
    constructor() {
        var self = this;
        this.submitOrderButton = document.getElementById('place_order');
        this.errorMessage = document.getElementById('js-checkout-errors-container');
        this.selectVetCheckBoxes = document.querySelectorAll('.js-select-vet-checkbox');
        this.vetSearchInput = document.getElementById('js-search-vet-input');
        this.provinceSelect = document.getElementById('billing_distributor_province');
        this.localidadSelect = document.getElementById('billing_distributor_locality');
        this.distributorSelect = document.getElementById('billing_distributor');
        this.phoneInput = document.getElementById('billing_phone');
        this.billingPhoneCel = document.getElementById('billing_phone_cel');
    }
    
    init() {
        this.maskInputs();
        this.distributorSelect.addEventListener('change', this.getVeterinaria.bind(this));
    }

    // Input Mask
    maskInputs() {
        this.phoneInput.setAttribute('data-mask', '(0000) 0000-0000');
        this.billingPhoneCel.setAttribute('data-mask', '(0000) 0000-0000');
    }

    // Get Veterinaria
    getVeterinaria(obj = null) {
        var data = {
            'type' : this.selectVetCheckBoxes[0].checked ? 'search' : 'select',
            'search': this.vetSearchInput.value ? this.vetSearchInput.value : obj.text,
            'province': this.provinceSelect.value,
            'locality': this.localidadSelect.value,
            'distributor': this.distributorSelect.value,
        };

        jQuery.getJSON(bio_vars.rootUrl + '/wp-json/bb/v1/veterinaria/', data, (result) => this.setValues(result));
    }

    // Set Veterinaria
    setValues(result) {
        if (result.success) {
            let vetAdress = document.getElementById('js-vet-address');
                vetAdress.value = result.data.address;
            let vetID = document.getElementById('js-vet-id');
                vetID.value = result.data.vet_id;
            let vetVendedor = document.getElementById('js-vet-vendedor');
                vetVendedor.value = result.data.techID;
            let vetEmail = document.getElementById('js-vet-elecmail');
                vetEmail.value = result.data.email;
            let vetEmailAlternative = document.getElementById('js-vet-elecmail-alternative');
                vetEmailAlternative.value = result.data.emailAlt;
            let searchHiddenLocalidad = document.getElementById('js-search-vet-input-localidad');
                searchHiddenLocalidad.value = result.data.locality;
            let searchHiddenProvincia = document.getElementById('js-search-vet-input-provincia');
                searchHiddenProvincia.value = result.data.province;
            
            // Enable Submit Order Button
            this.submitOrderButton.removeAttribute('disabled');
            this.errorMessage.classList.remove('active');
            this.submitOrderButton.style.cursor = 'pointer';
        } else {
            // Show Error Message
            this.errorMessage.classList.add('active');
            this.errorMessage.querySelector('#js-error-message').innerHTML = result.data.message;
        }   
    }
}

const checkout = new Checkout();
checkout.init();

/**
 * Search Veterinarias - Select
 */
jQuery( document ).ready( function( $ ) {

	$( '.js-search-basic-vetes' ).select2( {
		allowClear: false,
        language: "es",
        language: {
            inputTooShort: function () {
              return "Ingresa al menos 4 caracteres...";
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando...";
            },
            errorLoading: function () {
                return "Buscando...";
            },
            loadingMore: function () {
                return "Cargando más resultados...";
            }
        },
		minimumInputLength: 4,
		ajax: {
			url: bio_vars.rootUrl + '/wp-json/bb/v1/new_veterinarias',
			dataType: 'json',
			data: function ( params ) {
				return {
					search: params.term,
				};
			},
			processResults: function( data ) {
				return {
					results: jQuery.map( data, function( obj ) {
						return { id: obj.id, text: obj.name };
					})
				}
			}
		},
	});
    
    // Search Change Event
    $('.js-search-basic-vetes').on('select2:select', function (e) {
        const checkout = new Checkout();
        checkout.getVeterinaria(e.params.data);
    });
});
