<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
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

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}

if ($product->status == 'private') {
	wp_redirect( '/' );
	exit;
}
?>
<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product); ?>>

	<?php  
		// Get Campaign Taxonomy
		$terms = get_the_terms( get_the_ID(), 'campaign' );

		// Get ACF From Campaign
		if ( $terms && ! is_wp_error( $terms ) ){
			foreach ( $terms as $term ) {
				$campaignDateStart = get_field('campaign_date_start', $term);
				$campaignDateEnd = get_field('campaign_date_end', $term);
			}
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

		// Get Product Type
		$productType = $product->get_type();
		$productoConDosis = get_field('dosis-por-frasco');
	
	?>

	<script>
		// Pass product type to JS
		let productType = <?php echo json_encode($productType); ?>;
		let productoConDosis = <?php echo json_encode($productoConDosis); ?>;
	</script>

	<div class="product__container container-lg">

		<?php 
			$allProductsPage = get_page_by_path( 'todos-los-productos' );
			$allProductsPageId = $allProductsPage->ID; 	
		?>
		<a href="<?php echo get_permalink($allProductsPageId); ?>" class="product__back-btn">Ver Productos</a>

		<?php
		/**
		 * Hook: woocommerce_before_single_product_summary.
		 *
		 * @hooked woocommerce_show_product_sale_flash - 10
		 * @hooked woocommerce_show_product_images - 20
		 */
		?>

		<div class="product__card-product-container">

			<div class="card-product">
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
				<!-- Image -->
				<?php
				do_action( 'woocommerce_before_single_product_summary' );
				?>
				<!-- Progress Bar -->
				<div class="card-product__progress-bar">
					<?php 
						// Get Inventory Variables 
						$maxDiscount = get_field('max_discount');
						$quantitySold = $product->get_total_sales();
						$accesToDiscount = get_field('discount_access_units');
						$absoluteDiscount = $quantitySold * 100 / $accesToDiscount;
						$relativeDiscount = $absoluteDiscount * $maxDiscount / 100;
						$relativeDiscount = intval($relativeDiscount) + 5;
						if ($relativeDiscount > $maxDiscount) $relativeDiscount = $maxDiscount;
					?>
					<script type="text/javascript">
						var relativeDiscount = <?php echo json_encode($relativeDiscount); ?>;
					</script>
					<!-- Display Bar -->
					<div class="progress-bar">
						<?php if (!($currentDate <= $campaignDateEnd) && is_user_logged_in()) { ?>
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

			</div>

		</div>

		<div class="summary entry-summary <?php echo(get_field('suggested_price') ? 'show-price' : ''); ?> js-fade-in-up-items-container">

			<!-- Social Share (Add to Any) -->
			<?php echo do_shortcode("[addtoany]"); ?>

			<!-- Display Thumbnail (Mobile) -->
			<div class="summary__mobile-img">
				<?php
				do_action( 'woocommerce_before_single_product_summary' );
				?>
			</div>

			<!-- Display Bar (Mobile) -->
			<div class="progress-bar progress-bar--mobile">
				<div class="progress-bar__header">
					<h4 class="progress-bar__discount"><?php echo intval($relativeDiscount) ?>% Descuento</h4>
					<h4 class="progress-bar__max-discount"><?php echo $maxDiscount ?>%</h4>
				</div>
				<div class="progress-bar__bar">
					<div class="progress-bar__progress" style="width: <?php echo $absoluteDiscount ?>%"></div>
				</div>
			</div>

			<?php
			/**
			 * Hook: woocommerce_single_product_summary.
			 *
			 * @hooked woocommerce_template_single_meta - 3
			 * @hooked woocommerce_template_single_title - 5 
			 * @hooked woocommerce_template_single_rating - 10
			 * @hooked woocommerce_template_single_price - 10
			 * @hooked woocommerce_template_single_excerpt - 20
			 * @hooked woocommerce_template_single_add_to_cart - 30
			 * @hooked woocommerce_template_single_sharing - 50
			 * @hooked WC_Structured_Data::generate_product_data() - 60
			 */
			do_action( 'woocommerce_single_product_summary' );
			?>

			<div class="woocommerce-variation-price-w-discount">
				<div>
					<!-- Without Disctount -->
					<div class="woocommerce-variation-price-full <?php echo (($currentDate <= $campaignDateEnd)) ? '' : 'no-discount'; ?>">
						<div class="woocommerce-variation-price-full__number">
							<span>$</span>
							<?php if ($productType == 'variable') {?>
								<span class="woocommerce-variation-price-full__number" id="js-price-display-regular-mobile"></span>
							<?php } else { ?>
								<span class="woocommerce-variation-price-full__number" id="js-price-display-regular-mobile"><?php echo $product->get_regular_price(); ?></span>
							<?php } ?>
						</div>
						<span class="woocommerce-variation-price-full__text">&nbsp;precio de referencia</span>
					</div>
					<?php if (($currentDate <= $campaignDateEnd)) { ?>
						<!-- With Discount -->
						<span class="woocommerce-variation-price-w-discount__symbol">$</span>
						<span class="woocommerce-variation-price-w-discount__number" id="js-price-display-with-discount"></span>
						<span class="woocommerce-variation-price-w-discount__text"> con descuento</span>
					<?php } ?>
				</div>
			</div>
			<!-- Per Dose -->
			<div class="woocommerce-variation-price-per-dose <?php echo !($productoConDosis) ? 'd-none' : '' ?>">
				<div>
					<span class="woocommerce-variation-price-per-dose__symbol">$</span>
					<span class="woocommerce-variation-price-per-dose__number" id="js-price-display-per-dose-without-discount"></span>
					<span class="woocommerce-variation-price-per-dose__text"> / dosis</span>
				</div>
				<div>
					<span class="woocommerce-variation-price-per-dose__symbol">$</span>
					<span class="woocommerce-variation-price-per-dose__number" id="js-price-display-per-dose-with-discount"></span>
					<span class="woocommerce-variation-price-per-dose__text"> / dosis</span>
				</div>
			</div>

		</div>

		<!-- Max Limit Modal -->
		<?php get_field('max-limit'); ?>
		<span id="js-max-limit-display" style="opacity: 0;"><?php the_field('max-limit'); ?></span>
		<div class="max-limit" id="js-max-limit">
			<div class="max-limit__container max-limit__container--lg">
				<div class="max-limit__close-btn js-max-limit-close">
				</div>

				<div class="max-limit__icon-container">
					<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/max-limit-alert.svg" alt="Max Limit Alert Icon">
				</div>
				<div class="max-limit__title-container">
					<h2 class="max-limit__title">Atención: el límite establecido para este producto es de <?php the_field('max-limit'); echo (get_field('dosis-por-frasco')) ? ' dosis' : ' unidades'; ?></h2>
				</div>

				<h3 class="max-limit__subtitle"><?php the_field('max_limit_subtitle', 'option') ?></h3>

				<div class="max-limit__btn-container">
					<button class="max-limit__btn js-max-limit-confirmation"><?php the_field('max_limit_button_text', 'option') ?></button>
				</div>

			</div>
		</div>
		
		<!-- Horizontal Tabber -->
		<div class="product__horizontal-tabber module--horizontal_tabber js-fade-in-up">
			<div class="horizontal-tabs" role="tablist" aria-orientation="horizontal">

				<!-- Buttons -->
				<div class="tab-buttons">
					<!-- Composición -->
					<?php if(get_field('composition')): ?>
						<button class="horizontal-tab-button" role="tab" id="composition_tab" aria-controls="composition_panel">Composición</button>
					<?php endif; ?>
					<!-- Dosis y Vía de administración -->
					<?php if(get_field('dose_and_route_of_administration')): ?>
						<button class="horizontal-tab-button" role="tab" id="dose_and_route_of_administration_schedule_tab" aria-controls="dose_and_route_of_administration_schedule_panel">Dosis y Vía de administración</button>
					<?php endif; ?>
					<!-- Esquema de vacunación sugerido -->
					<?php if(get_field('suggested_vaccination_schedule')): ?>
						<button class="horizontal-tab-button" role="tab" id="suggested_vaccination_schedule_tab" aria-controls="suggested_vaccination_schedule_panel">Esquema de vacunación sugerido</button>
					<?php endif; ?>
					<!-- Conservación -->
					<?php if(get_field('conservation')): ?>
						<button class="horizontal-tab-button" role="tab" id="conservation_schedule_tab" aria-controls="conservation_schedule_panel">Conservación</button>
					<?php endif; ?>
				</div>

				<!-- Panel -->
				<div class="panel-container">
					<!-- Composición -->
					<div class="horizontal-tab-panel" role="tabpanel" tabindex="0" id="composition_panel" aria-labelledby="composition_tab">
						<h4 class="product__info-title">Composición</h4>
						<?php if(get_field('composition')): ?>
							<div class="product__info-text"><?php the_field('composition') ?></div>
						<?php endif; ?>
					</div>
					<!-- Dosis y Vía de administración -->
					<div class="horizontal-tab-panel" role="tabpanel" tabindex="0" id="dose_and_route_of_administration_schedule_panel" aria-labelledby="dose_and_route_of_administration_schedule_tab">
						<h4 class="product__info-title">Dosis y Vía de administración</h4>
						<?php if(get_field('dose_and_route_of_administration')): ?>
							<div class="product__info-text"><?php the_field('dose_and_route_of_administration') ?></div>
						<?php endif; ?>
					</div>					
					<!-- Esquema de vacunación sugerido -->
					<div class="horizontal-tab-panel" role="tabpanel" tabindex="0" id="suggested_vaccination_schedule_panel" aria-labelledby="suggested_vaccination_schedule_tab">
						<h4 class="product__info-title">Esquema de vacunación sugerido</h4>
						<div class="product__vacunation-grid">
							<?php if ( have_rows('suggested_vaccination_schedule') ) :
								while( have_rows('suggested_vaccination_schedule') ) : the_row(); 
									?>
									<div class="product__info-text">
										<?php the_sub_field('suggested_vaccination_schedule-indicacion') ?>
									</div>
									<?php 
								endwhile;
							endif; ?>
						</div>
					</div>
					<!-- Conservación -->
					<div class="horizontal-tab-panel" role="tabpanel" tabindex="0" id="conservation_schedule_panel" aria-labelledby="conservation_schedule_tab">
						<h4 class="product__info-title">Conservación</h4>
						<?php if(get_field('conservation')): ?>
							<div class="product__info-text"><?php the_field('conservation') ?></div>
						<?php endif; ?>
					</div>
				</div>
				
			</div>
		</div>

		<?php
		/**
		 * Hook: woocommerce_after_single_product_summary.
		 *
		 * @hooked woocommerce_output_product_data_tabs - 10  >> Removed
		 * @hooked woocommerce_upsell_display - 15
		 * @hooked woocommerce_output_related_products - 20
		 */
		do_action( 'woocommerce_after_single_product_summary' );
		?>

	</div>
	<?php $otherProducts = get_field('other-products');?>
	<img class="wave js-parallax-horizontal <?php echo $otherProducts ? 'd-flex' : 'd-none'; ?>" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--white-blue.svg" alt="Wave Background">	

</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
<?php $otherProducts = get_field('other-products');?>
<div class="related-products <?php echo $otherProducts ? 'd-flex' : 'd-none'; ?>">
	<div class="related-products__container container-lg">
		<!-- Header -->
		<?php if(get_field('other-products_title')): ?>
			<h2 class="related-products__title title-m"><?php the_field('other-products_title') ?></h2>
		<?php endif; ?>
		<!-- Prev Button -->
		<div id="js-slick-prev-arrow" class="slick-prev"></div>
		<!-- Slider -->
		<?php
		if( $otherProducts ): ?>
			<div class="related-products__slider js-fade-in-up-items-container" id="js-related-products">
				<?php foreach( $otherProducts as $post ): 
					setup_postdata($post); 
					wc_get_template_part( 'content', 'product' );
				endforeach; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		<?php endif; ?>
		<!-- Next Button -->
		<div id="js-slick-next-arrow" class="slick-next"></div>
	</div>
</div>


