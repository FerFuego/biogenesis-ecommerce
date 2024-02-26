<section class="related-products">
	<div class="related-products__container container-lg">
		<!-- Header -->	
		<?php if(get_sub_field('other-products_title')): ?>
			<h2 class="related-products__title title-m js-fade-in-up"><?php the_sub_field('other-products_title') ?></h2>
		<?php endif; ?>
		<!-- Prev Button -->
		<div id="js-slick-prev-arrow" class="slick-prev"></div>
		<!-- Slider -->
		<?php
		$otherProducts = get_sub_field('other-products');
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
</section>