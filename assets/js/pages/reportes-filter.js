jQuery(document).ready(function ($) {

    /* --- Variables Declaration --- */
    // Options
    let campaignSelect = document.getElementById('filter-campaign')
    let orderStatusSelect = document.getElementById('filter-order-status')
    let vetNameSelect = document.getElementById('filter-veterinaria')
    //let userID = document.getElementById('user-id')
    // Btns
    let submitBtn = document.getElementById('js-filter-submit')
    let downloadBtn = document.getElementById('js-reports-csv-download')
    // AJAX Spinner
    let ordersReportAjaxSpinner = document.getElementById('js-spinner-report-orders')
    let ordersReportFormMask = document.getElementById('js-mask-report-orders')
    // Info
    //let orders = document.querySelectorAll('.order')
    let ordersCount = document.getElementById('js-report-orders-count')
    let currentUserId = document.getElementById('js-current-user-id')
    // Values
    let campaignSelectValue = campaignSelect.value
    let orderStatusSelectValue = orderStatusSelect.value
    let vetNameSelectValue = vetNameSelect.value
    currentUserId = currentUserId.innerHTML

    // Selected Campaign Value
    campaignSelect.addEventListener('change', () => {
        campaignSelectValue = campaignSelect.value
    })
    orderStatusSelect.addEventListener('change', () => {
        orderStatusSelectValue = orderStatusSelect.value
    })
    vetNameSelect.addEventListener('change', () => {
        vetNameSelectValue = vetNameSelect.value
    })
    vetNameSelect.addEventListener('change', () => {
        vetNameSelectValue = vetNameSelect.value
    })

    // Submit Btn Listener
    submitBtn.addEventListener('click', () => {
        // Spinner
        ordersReportAjaxSpinner.classList.add('active')
        ordersReportFormMask.classList.add('active')
        // Ajax Request
        $.ajax({
            type: 'POST',
            url: bio_vars.ajaxUrl,
            dataType: 'html',
            data: {
                action: 'filter_report',
                campaign: campaignSelectValue,
                orderStatus: orderStatusSelectValue,
                vetName: vetNameSelectValue,
                currentUserId: currentUserId,
            },
            success: function(response) {
                // Fill with AJAX response
                $('.report-wrap').html(response);
                let refreshedOrderCount = document.getElementById('js-refreshed-order-count')
                $('#js-report-orders-count').html(refreshedOrderCount.innerHTML)
                ordersReportAjaxSpinner = document.getElementById('js-spinner-report-orders')
                ordersReportFormMask = document.getElementById('js-mask-report-orders')
                ordersReportAjaxSpinner.classList.remove('active')
                ordersReportFormMask.classList.remove('active')
            }
        })  
    })

    // Download Btn Listener
    downloadBtn.addEventListener('click', () => {
        $.ajax({
            type: 'POST',
            url: bio_vars.ajaxUrl,
            dataType: 'html',
            data: {
                action: 'download_report_csv',
                campaign: campaignSelectValue,
                orderStatus: orderStatusSelectValue,
                vetName: vetNameSelectValue,
            },
            success: function(response) {
               // Make CSV downloadable
                var downloadLink = document.createElement("a");
                var fileData = ['\ufeff'+response];

                var blobObject = new Blob(fileData,{
                    type: "text/csv;charset=utf-8;"
                });

                var url = URL.createObjectURL(blobObject);
                downloadLink.href = url;
                downloadLink.download = "orders.csv";

                // Actually download CSV
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                console.log('Successful Download')
            }
        })  
    })

});