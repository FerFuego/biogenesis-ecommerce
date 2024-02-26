jQuery(document).ready(function ($) {

    /* --- Filter --- */
    const distributorProvinceSelect = document.getElementById('billing_distributor_province')
    const distributorLocalitySelect = document.getElementById('billing_distributor_locality')
    let veterinariasSelects = document.getElementsByTagName('select')
    veterinariasSelects = Array.from(veterinariasSelects)

    let myAccountFormMask = document.getElementById('js-mask-veterinarias-list')
    let ajaxSpinner = document.getElementById('js-spinner-veterinarias-list')


    distributorProvinceSelect.addEventListener('change', () => {
        let localitySelectOptions = distributorLocalitySelect.options 
        localitySelectOptions = Array.from(localitySelectOptions)

        localitySelectOptions.forEach(select => {
            select.selected = false
        });
    })

    veterinariasSelects.forEach(select => {
        select.addEventListener('change', () => {
            // Clear Search Input
            searchInput.value = ''
            searchVet.classList.remove('active')

            let provinceSelected = distributorProvinceSelect.value
            let localitySelected = distributorLocalitySelect.value
            if (ajaxSpinner) {
                ajaxSpinner.classList.add('active')
            }
            if (myAccountFormMask) {
                myAccountFormMask.classList.add('active')
            }

            $.ajax({
                type: 'POST',
                url: bio_vars.ajaxUrl,
                dataType: 'html',
                data: {
                    action: 'filter_veterinarias',
                    provinceSelected: provinceSelected,
                    localitySelected: localitySelected,
                },
                success: function(response) {
                    // Fill with AJAX response
                    $('.veterinarias__table').html(response);
                    // Update variables
                    myAccountFormMask = document.getElementById('js-mask-veterinarias-list')
                    ajaxSpinner = document.getElementById('js-spinner-veterinarias-list')
                    vetListRowResults = document.querySelectorAll('.veterinarias__table-row')
                }
            })
        })
    });

    /* -- Vet Search -- */

    // Variables
    const searchVet = document.getElementById('js-search-vet')
	const searchInput = document.getElementById('js-search-vet-input')
    const searchOverlay = document.getElementById('js-search-vet-overlay')
    const searchResults = document.getElementById('js-search-vet-results')
    const searchSpinner = document.getElementById('js-search-vet-spinner')
    const selectVet = document.getElementById('js-select-vet')

    if (isSafari()) {
        searchInput.setAttribute('list', 'js-search-vet-results');
    }

    let vetListRowResults = document.querySelectorAll('.veterinarias__table-row')

    let searchTimer
    //let previousValue
    let listadoVeterinarias;

    // Get Veterinarias
    (function getResults() {
        $.getJSON(bio_vars.rootUrl + '/wp-json/bb/v1/veterinarias', function(results) {
            listadoVeterinarias = results.veterinarias
            vetSearching()
        });
    })()

    function isSafari() {
        return (navigator.vendor.match(/apple/i) || "").length > 0
    }

    // Search Veterinarias - Function
    function vetSearching () {
        searchInput.addEventListener('keyup', (e) => {

            // Arrow Key > Up & Down
            if (e.keyCode == 38 || e.keyCode == 40) {
                return
            }

            // Remove Magnifying Glass Icon
            if (searchInput.value != ''){
                searchVet.classList.add('active')
            } else {
                searchVet.classList.remove('active')
            }

            // Clear Selects (Map Only)
            if (document.getElementById('js-spinner-veterinarias-map')) {
                let distributorProvinceSelectOptions = distributorProvinceSelect.options 
                distributorProvinceSelectOptions = Array.from(distributorProvinceSelectOptions)
                let localitySelectOptions = distributorLocalitySelect.options 
                localitySelectOptions = Array.from(localitySelectOptions)
    
                distributorProvinceSelectOptions.forEach(select => {
                    select.selected = false
                });
                localitySelectOptions.forEach(select => {
                    select.selected = false
                });
            }

            // Clear Timer
            clearTimeout(searchTimer)

            searchResults.innerHTML = '' // Clear previous searchs
            if (vetListRowResults.length == 0) {
                searchOverlay.classList.add('active')
                searchSpinner.classList.add('active')
            } else {
                myAccountFormMask.classList.add('active')
                ajaxSpinner.classList.add('active')
            }

            searchTimer = setTimeout(() => {
                let searchVal = searchInput.value.toLowerCase();

                if (searchVal == '') { // Empty input
                    searchSpinner.classList.remove('active')
                    searchOverlay.classList.remove('active')
                    searchOverlay.style.height = '0px'
                    return
                } 

                let listadoVeterinariasFiltrado = []
                for (var i = 0; i < listadoVeterinarias.length; i++) {
                    if (!searchVal || listadoVeterinarias[i].toLowerCase().indexOf(searchVal) > -1) {
                        listadoVeterinariasFiltrado.push(listadoVeterinarias[i])
                    }
                }

                // For Map Only
                if (vetListRowResults.length == 0) {
                    if (listadoVeterinariasFiltrado.length == 0) {
                        searchResults.innerHTML = '<p class="vet-search__results-empty">No se encontraron Veterinarias.</p>'
                    }
                }

                // For Map Only
                if (vetListRowResults.length == 0) {
                    listadoVeterinariasFiltrado.forEach(veterinaria => {
                        let vet = document.createElement("OPTION");   
                        vet.classList.add('vet-search__results-option')
                        vet.innerHTML = veterinaria;            
                        searchResults.appendChild(vet);   
                    });
                } 

                // For Vet Table Only
                vetListRowResults.forEach(result => {
                    if (!listadoVeterinariasFiltrado.includes(result.firstChild.innerHTML)) {
                        result.style.display = 'none'
                    } else {
                        result.style.display = 'flex'
                    }
                })
                let noResults;
                for (let i = 0; i < vetListRowResults.length; i++) {
                    if (vetListRowResults[i].style.display == 'flex') {
                        noResults = false
                        break
                    } else {
                        noResults = true
                    }                     
                }
                if (noResults) {
                    if (!document.querySelector('.list-vetes-no-result')) {
                        let noResultsDiv = document.createElement("div")
                        noResultsDiv.classList.add('veterinarias__table-row')
                        noResultsDiv.classList.add('list-vetes-no-result')
                        noResultsDiv.style.backgroundColor = 'white'
                        noResultsDiv.innerHTML = '<p style="width: 100%; text-align: center;"><strong> SIN RESULTADOS </strong></p>'
                        document.querySelector('.veterinarias__table-body').append(noResultsDiv)
                    }
                } else {
                    if (document.querySelector('.list-vetes-no-result')) {
                        document.querySelector('.list-vetes-no-result').remove()
                    }
                }

                // Search Results Height
                let searchResultsHeight
                if (listadoVeterinariasFiltrado.length != 0 && searchResults.hasChildNodes()) {
                    searchResultsHeight = listadoVeterinariasFiltrado.length * 28 + 'px'
                } else {
                    searchResultsHeight = '50px'
                } 

                // Safari
                if (isSafari()) {
                    searchResultsHeight = '0px'
                }

                if (vetListRowResults.length == 0) {
                    searchSpinner.classList.remove('active')
                    searchOverlay.classList.remove('active')
                    searchOverlay.style.height = searchResultsHeight 
                } else {
                    myAccountFormMask.classList.remove('active')
                    ajaxSpinner.classList.remove('active')
                    searchOverlay.style.height = '0px' 
                }      
                
                // Safari
                if (isSafari()) {
                    searchSpinner.classList.remove('active')
                    searchOverlay.classList.remove('active')
                    searchResults.classList.remove('active')
                    searchResults.style.display = 'none'
                }
            }, 1500);

        })
    }

    // Click Search Results > Select Veterinaria
    document.body.addEventListener('click', selectVetFunction)

    function selectVetFunction(e) {
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });

        if (e.target.classList.contains('vet-search__results-option')) {
            searchInput.value = e.target.value
            searchResults.innerHTML = ''
            searchInput.dispatchEvent(event);
            searchOverlay.style.height = '0px'
        } else {
            searchResults.innerHTML = ''
            searchOverlay.style.height = '0px'
        }
    }

    /* --- View --- */
    document.body.addEventListener('click', changeView)

    function changeView (e) {
        // Ver Mapa
        if (e.target.classList.contains('js-veterinarias-map-view')) {
            // Spinner
            let vetListAjaxSpinner = document.getElementById('js-spinner-veterinarias-list')
            let vetListFormMask = document.getElementById('js-mask-veterinarias-list')
            vetListAjaxSpinner.classList.add('active')
            vetListFormMask.classList.add('active')
            // Request
            $.ajax({
                type: 'POST',
                url: bio_vars.ajaxUrl,
                dataType: 'html',
                data: {
                    action: 'veterinarias_change_view',
                    view: 'mapa',
                },
                success: function(response) {
                    // Fill with AJAX response
                    $('.veterinarias__view').html(response);
                    vetListAjaxSpinner.classList.remove('active')
                    vetListFormMask.classList.remove('active')
                    vetListRowResults = document.querySelectorAll('.veterinarias__table-row')
                }
            })  
            // Clean Select
            document.getElementById('billing_distributor_province').value = 'hidden-prov'
            document.getElementById('billing_distributor_locality').value = 'hidden-loc'
        // Ver Listado
        } else if (e.target.classList.contains('js-veterinarias-listado-view')) {
            // Spinner
            let ordersReportAjaxSpinner = document.getElementById('js-spinner-veterinarias-map')
            let ordersReportFormMask = document.getElementById('js-mask-veterinarias-map')
            ordersReportAjaxSpinner.classList.add('active')
            ordersReportFormMask.classList.add('active')
            // Request
            $.ajax({
                type: 'POST',
                url: bio_vars.ajaxUrl,
                dataType: 'html',
                data: {
                    action: 'veterinarias_change_view',
                    view: 'listado',
                },
                success: function(response) {
                    // Fill with AJAX response
                    $('.veterinarias__view').html(response);
                    ordersReportAjaxSpinner.classList.remove('active')
                    ordersReportFormMask.classList.remove('active')
                    // Update variables
                    myAccountFormMask = document.getElementById('js-mask-veterinarias-list')
                    ajaxSpinner = document.getElementById('js-spinner-veterinarias-list')
                    vetListRowResults = document.querySelectorAll('.veterinarias__table-row')
                }
            })  
            // Clean Select
            document.getElementById('billing_distributor_province').value = 'hidden-prov'
            document.getElementById('billing_distributor_locality').value = 'hidden-loc'
        }
    }
    
});