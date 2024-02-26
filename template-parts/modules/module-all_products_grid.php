<section class="all-products">

    <div class="all-products__container container-lg">
        <!-- Title -->
        <?php if(get_sub_field('all-products__title')): ?>
            <h3 class="all-products__title title-m"><?php the_sub_field('all-products__title') ?></h3>
        <?php endif; ?>

        <!-- Subtitle -->
        <?php if(get_sub_field('all-products__subtitle')): ?>
            <h4 class="all-products__subtitle"><?php the_sub_field('all-products__subtitle') ?></h4>
        <?php endif; ?>

        <!-- Grid -->
        <?php
		$allProducts = get_sub_field('all-products__grid');
		if( $allProducts ): ?>
			<div class="all-products__grid js-fade-in-up-items-container">
				<?php foreach( $allProducts as $post ): 
					setup_postdata($post); 
					wc_get_template_part( 'content', 'product' );
				endforeach; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		<?php endif; ?>

    </div>

</section>