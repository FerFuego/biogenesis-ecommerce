jQuery(document).ready(function ($) {
    /* --- Select Province - Checkout (AJAX) --- */
    const provinceSelect = $('#billing_distributor_province');
    const localitySelect = $('#billing_distributor_locality');
    const distributorSelect = $('#billing_distributor');
    const allSelects = $('.js-distributor-select').find('select');
    
    // Add Options Hidden For Each Selects
    allSelects.each(function() {
        $(this).find('option:first-child').attr('hidden', true);
        $(this).find('option:first-child').attr('selected', true);
        $(this).find('option:first-child').attr('value', '');
    })

    // Disabled Selects if exist default distributis props
    if ($('.map').hasClass('js-map-disable-selects')) {
        localitySelect.attr('disabled', true);
        distributorSelect.attr('disabled', true);
    }

    let selectIsDisabled = true;
    
    provinceSelect.on("change", function () {
        const action = "select_province_action";
        const province = $(this).val();
        const locality = localitySelect.val();
    
        $.ajax({
            type: "POST",
            dataType: "json",
            url: bio_vars.ajaxUrl,
            data: {
                action,
                province,
                locality,
                selectIsDisabled
            },
            success: function ({ data }) {
                const { hasLocalities, allLocalities, disabledDistributorSelect } = data;
                if ( hasLocalities ) {
                    renderOptionSelect(allLocalities, localitySelect, 'Localidad');
                }
    
                if ( !disabledDistributorSelect ) {
                    distributorSelect.attr('disabled', true);
                    distributorSelect.html('');
                    distributorSelect.append(`<option hidden value=''>Veterinaria</option>`)
                }
    
                selectIsDisabled = false;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('ERROR');
         }
        });
    });
    
    /* --- Select Locality - Checkout (AJAX) --- */
    localitySelect.on("change", function () {
        const action = "select_locality_action";
        const locality = $(this).val();
        const province = provinceSelect.val();
    
        $.ajax({
            type: "POST",
            dataType: "json",
            url: bio_vars.ajaxUrl,
            data: {
                action,
                locality,
                province
            },
            success: function ({ data }) {
                const { allDistributor, hasDistributor } = data;
    
                if ( hasDistributor ) {
                    renderOptionSelect(allDistributor, distributorSelect, 'Veterinaria');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('ERROR');
         }
        });
    });
    
    // Clean the select and render options within it
    const renderOptionSelect = (options, select, name) => {
        let uniqueOptions = [ ...new Set(options.sort()) ];

        // Randomize Distributor Options on each render
        if (select == distributorSelect) {
            let original = options;
            let copy = [].concat(original);
            copy.sort(function(){
                return 0.5 - Math.random();
            });
            uniqueOptions = copy;
        }
        
        select.html('');
        select.append(`<option hidden selected value=''>${ name }</option>`);
        uniqueOptions.forEach(option => {
            const optionWrapper = `<option value="${ option }">${ option }</option>`;
            select.append(optionWrapper);
        });
        select.attr('disabled', false);
    };
});
