<?php 
if (is_front_page()) {
    $showBanner = get_field('new-campaign-banner_show', 'option'); 
}
?>
<div class="new-campaign-banner <?php echo ($showBanner) ? 'show-banner' : ''; ?>" id="js-new-campaign-banner">
    <div class="new-campaign-banner__container">
        <!-- Close -->
        <div class="new-campaign-banner__close-btn" id="js-close-new-campaign">
        </div>  
        <!-- Img -->
        <?php $newCampaignBannerImg = get_field('new-campaign-banner_img', 'option'); ?>
        <?php if ($newCampaignBannerImg) : ?>
            <?php echo wp_get_attachment_image( $newCampaignBannerImg, 'large', false, [ 'loading' => 'false', 'class' => 'new-campaign-banner__img'] ); ?>
        <?php endif ?>
    </div>
</div>