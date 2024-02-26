<section class="cta-box">
  <div class="cta-box__container container-lg">
    <div class="cta-box__content js-fade-in-up-items-container" style="background-image: url('<?php echo get_sub_field('cta-box__background')['url']; ?>')">

      <?php $ctaBoxIcon = get_sub_field('cta-box__icon');
      if ($ctaBoxIcon) : ?>
        <img class="cta-box__icon js-fade-in-up-item" src="<?php echo $ctaBoxIcon['url']; ?>" alt="<?php echo $ctaBoxIcon['alt']; ?>" title="Icon">
      <?php endif; ?>

      <?php biogenesis_bago_heading( 'text', ['class' => 'cta-box__title js-fade-in-up-item'] ); ?>
    
      <div class="cta-box__description wysiwyg js-fade-in-up-item">
        <?php the_sub_field('cta-box__description'); ?>
      </div>
    
      <?php $ctaBoxCta = get_sub_field('cta-box__cta');
      if ($ctaBoxCta) : ?>
        <a class="button button--outline white js-fade-in-up-item" href="<?php echo $ctaBoxCta['url']; ?>" target="<?php echo $ctaBoxCta['target']; ?>"><?php echo $ctaBoxCta['title']; ?></a>
      <?php endif; ?>
  
    </div>
  </div>
</section>