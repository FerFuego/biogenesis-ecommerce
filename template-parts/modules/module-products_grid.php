<section class="products-grid js-redirect-section wave-small" data-redirect-section="products-grid">
  <img class="wave js-parallax-horizontal" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--white-blue.svg" alt="Wave Background">	
  <img class="wave wave--mobile" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--white-blue--mobile.svg" alt="Wave Background">	

  <div class="products-grid__container container-lg">
    <div class="products-grid__text-container js-fade-in-up-items-container">
      <?php biogenesis_bago_heading( 'text', ['class' => 'products-grid__title title-m js-fade-in-up-item'] ); ?>
      <div class="products-grid__description js-fade-in-up-item"><?php the_sub_field('products-grid__description'); ?></div>
    </div>

    <!-- Grid -->
    <?php
    $homeProductGrid = get_sub_field('products-grid__grid');
    if( $homeProductGrid ): ?>
      <div class="products-grid__grid js-fade-in-up-items-container">
        <?php foreach( $homeProductGrid as $post ): 
          setup_postdata($post); 
          wc_get_template_part( 'content', 'product' );
        endforeach; ?>
      </div>
      <?php wp_reset_postdata(); ?>
    <?php endif; ?>  
    
    <!-- CTA -->
    <?php $productsGridCta = get_sub_field('products-grid__cta'); ?>
    <?php if ($productsGridCta) : ?>
      <a href='<?php echo $productsGridCta['url']; ?>' target='<?php echo $productsGridCta['target']; ?>' class="products-grid__show-more button button--outline black js-fade-in-up"><?php echo $productsGridCta['title']; ?></a>
    <?php endif; ?>

  </div>
</section>