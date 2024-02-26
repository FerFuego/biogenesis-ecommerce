jQuery(document).ready(function ($) {
    
    // Cancel Order BTN
    let deleteOrderBtn  = document.querySelectorAll('.js-cancel-order')
    // Cancel Confirmation Modal
    const cancelOrderConfirmationModal = document.getElementById('js-cancel-order-modal') 
    const cancelOrderConfirmationBtn = document.getElementById('js-confirm-cancel-order')
    const cancelOrderCancelBtn = document.querySelectorAll('.js-cancel-cancel-order')
    // AJAX Mask + Spinner
    const ajaxMask = document.getElementById('js-my-account-mask')
    const ajaxSpinner = document.getElementById('js-my-account-spinner')

    // Cancel Order?
    deleteOrderBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {      
            event.preventDefault()
            // Get Order
            let order = btn.closest('.order')
            let orderId = order.querySelector('.order-number-code').innerHTML
            // Open Modal
            cancelOrderConfirmationModal.classList.add('active');
            // Re-confirm
            cancelOrderConfirmationBtn.addEventListener('click', () => {
                cancelOrderConfirmationModal.classList.remove('active');
                ajaxMask.classList.add('active')
                ajaxSpinner.classList.add('active')
                $.ajax({
                    type: 'POST',
                    url: bio_vars.ajaxUrl,
                    dataType: 'html',
                    data: {
                        action: 'productor_canel_order',
                        orderId: orderId,
                    },
                    success: function(response) {
                        console.log(response);
                        location.reload()
                    }
                })
            })    
            // Cancel Canecel
            cancelOrderCancelBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    cancelOrderConfirmationModal.classList.remove('active');
                })
            })
        });
    });
    
});