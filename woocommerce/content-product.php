<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

// Get Status
$status = $product->status;

// Get Product Variables
$maxDiscount = get_field('max_discount');
$quantitySold = $product->get_total_sales();
$accesToDiscount = get_field('discount_access_units');
$absoluteDiscount = $quantitySold * 100 / $accesToDiscount;
$relativeDiscount = $absoluteDiscount * $maxDiscount / 100;
$relativeDiscount = intval($relativeDiscount) + 5;
if ($relativeDiscount > $maxDiscount) $relativeDiscount = $maxDiscount;

// Get Campaign Taxonomy
$campaign = get_the_terms( get_the_ID(), 'campaign' );

// Get ACF From Campaign
if ( $campaign && ! is_wp_error( $campaign )) :

	foreach ( $campaign as $term ) {
		$campaignDateStart = get_field('campaign_date_start', $term);
		$campaignDateEnd = get_field('campaign_date_end', $term);
	}

	$campaignDateEnd = new DateTime($campaignDateEnd);
	$campaignDateEnd->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
	$campaignDateEnd->setTime(23, 59, 59);
	$campaignDateStart = new DateTime($campaignDateStart);
	$campaignDateStart->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
	$currentDate = new DateTime(date("Y/m/d"));
	$currentDate->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
	$intervalDays = date_diff( $currentDate, $campaignDateEnd);
	$intervalDays = $intervalDays->days;

	// Update Status
	/*$myPostStatus = array(
		'ID' => get_the_ID(),
		'post_status'   => ($currentDate <= $campaignDateEnd) ? 'publish' : 'private',
	);
	wp_update_post( $myPostStatus );*/

	if ($status == 'publish') :

?>

<div class="card-product js-fade-in-up-item">
	<!-- Header -->
	<div class="card-product__header">
		<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/card-product_timer-icon.svg" alt="Timer Icon">
		<?php if ( $campaignDateEnd ) : ?>
			<h5 class="card-product__header-title <?php ($currentDate >= $campaignDateStart && $currentDate <= $campaignDateEnd) ? printf('active')  : printf('inactive'); ?>">
				Finaliza <?php echo ( $intervalDays === 0 ) ? '' : 'en'; ?> 
				<span class="card-product__header-title card-product__header-title--bold">
				<?php 
					if ( $intervalDays === 1 ) {
						echo $intervalDays . ' día';
					} else if ( $intervalDays === 0 ) {
						echo 'hoy';
					} else {
						echo $intervalDays . ' días';
					}
				?>
				</span>
			</h5>	
			<h5 class="card-product__header-title <?php ($currentDate >= $campaignDateStart && $currentDate <= $campaignDateEnd) ? printf('inactive')  : printf('active'); ?>">
				<strong>Campaña Finalizada</strong>
			</h5>
		<?php endif; ?>
	</div>
	
	<?php
	/**
	 * Hook: woocommerce_before_shop_loop_item.
	 *
	 * @hooked woocommerce_template_loop_product_link_open - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item' );

	/**
	 * Hook: woocommerce_before_shop_loop_item_title.
	 *
	 * @hooked woocommerce_show_product_loop_sale_flash - 10
	 * @hooked woocommerce_template_loop_product_thumbnail - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item_title' );

	/**
	 * Hook: woocommerce_shop_loop_item_title.
	 *
	 * @hooked woocommerce_template_loop_product_title - 10
	 */
	do_action( 'woocommerce_shop_loop_item_title' );

	/**
	 * Hook: woocommerce_after_shop_loop_item_title.
	 *
	 * @hooked woocommerce_template_loop_rating - 5
	 * @hooked woocommerce_template_loop_price - 10
	 */
	do_action( 'woocommerce_after_shop_loop_item_title' );

	?>
	<!-- Display Bar -->
	<div class="card-product__progress-bar">
		<div class="progress-bar">
			<?php if (!($currentDate <= $campaignDateEnd)) { ?>
				<div class="progress-bar__header">
					<h4 class="progress-bar__discount">Descuento alcanzado:</h4>
					<h4 class="progress-bar__max-discount"><?php echo $relativeDiscount ?>%</h4>
				</div>
				<div class="progress-bar__bar progress-bar__bar--finished">
					<div class="progress-bar__progress progress-bar__progress--finished" style="width: <?php echo $relativeDiscount * 100 / $maxDiscount ?>%"></div>
				</div>
			<?php } else {?>
				<div class="progress-bar__header">
					<h4 class="progress-bar__discount"><?php echo $relativeDiscount ?>% Descuento</h4>
					<h4 class="progress-bar__max-discount"><?php echo $maxDiscount ?>%</h4>
				</div>
				<div class="progress-bar__bar">
					<div class="progress-bar__progress" style="width: <?php echo $relativeDiscount * 100 / $maxDiscount ?>%"></div>
				</div>
			<?php } ?>
		</div>
	</div>

	<?php
	/**
	 * Hook: woocommerce_after_shop_loop_item.
	 *
	 * @hooked woocommerce_template_loop_product_link_close - 5
	 * @hooked woocommerce_template_loop_add_to_cart - 10
	 */
	?>
	<div class="card-product__cta"><?php
		do_action( 'woocommerce_after_shop_loop_item' );
	?></div> 


</div>

<?php endif; endif; ?>

