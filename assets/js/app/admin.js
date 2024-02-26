

jQuery(document).ready(function(){
    const limit = 1;
    const input = jQuery('form #campaign .form-input-tip');
    const addNew = jQuery("form #campaign input[type='button']");
    const deleteCampaignBtn = jQuery('form #campaign .tagchecklist');
    const metaBox = jQuery('#tagsdiv-campaign');

    const limitTaxonomy = () => {
        jQuery('form #campaign #new-tag-campaign-desc').hide();

        if(input.length > 0) {
            if(input.val().includes(',')) {
                addDisabled();
            } 

            setTimeout(() => {
                var $items = jQuery('form #campaign .tagchecklist li');
                if($items.length >= limit){
                    addDisabled();
                }
            }, 100);
        }
    }

    const deleteCampaign = () => {
        if(jQuery('form #campaign .tagchecklist li').length === 0) {
            removeDisabled();
        }
    }

    const clearInput = () => {
        input[0].value = '';

        if(jQuery('form #campaign .tagchecklist li').length === 0){
            removeDisabled();
        }
    }

    const removeDisabled = () => {
        addNew.removeAttr('disabled'); 
        input.removeAttr('disabled');
    }

    const addDisabled = () => {
        addNew.attr('disabled', true); 
        input.attr('disabled', true);
    }

    limitTaxonomy();

    input.on('keyup', limitTaxonomy);
    input.on('keyup', limitTaxonomy);
    addNew.on('click', limitTaxonomy);
    metaBox.on('click', clearInput);
    deleteCampaignBtn.on('click', deleteCampaign);

   
});

