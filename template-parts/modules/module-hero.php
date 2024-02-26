<?php $heroBackgroundMobile = get_sub_field('hero__background-mobile') ?>
<section class="hero js-parallax" style="background-image:url('<?php echo wp_is_mobile() && $heroBackgroundMobile ? the_sub_field('hero__background-mobile') : the_sub_field('hero__background'); ?>');">

  <img class="wave js-parallax-horizontal" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--gray.svg" alt="Wave Background">
  <img class="wave wave--mobile" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--gray--mobile.svg" alt="Wave Background">
  <img class="bb-marca" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/bb-marca-hero.png" alt="Biogénesis Bagó">

  <div class="hero__container container-lg">
    <div class="hero__content js-fade-in-up-items-container">

      <!-- Prehead -->
      <span class="hero__prehead prehead js-fade-in-up-item"><?php the_sub_field('hero__prehead'); ?></span>

      <!-- Heading -->
      <?php biogenesis_bago_heading( 'text', ['class' => 'title-l js-fade-in-up-item'] ); ?> 

      <!-- Subtitle -->
       <?php if( have_rows('hero__subtitle') ):
        while( have_rows('hero__subtitle') ): the_row();  ?>

          <?php if ( is_user_logged_in() ) {
            if(get_sub_field('hero__subtitle-logged-in')): ?>
              <h3 class="hero__subtitle js-fade-in-up-item"><?php the_sub_field('hero__subtitle-logged-in') ?></h3>
            <?php endif; 
          } ?>

          <?php if ( !is_user_logged_in() ) {
            if(get_sub_field('hero__subtitle-not-logged-in')): ?>
              <h3 class="hero__subtitle js-fade-in-up-item"><?php the_sub_field('hero__subtitle-not-logged-in') ?></h3>
            <?php endif; 
          } ?>

        <?php endwhile; 
      endif; ?>

      <!-- CTA -->
      <?php if( have_rows('hero__cta-label') ):
        while( have_rows('hero__cta-label') ): the_row();  ?>

        <div class="js-fade-in-up-item">

          <?php if ( is_user_logged_in() ) {
            $heroCtaLabelLogueado = get_sub_field('hero__cta-label-logueado');
            if ($heroCtaLabelLogueado) : ?>
              <a href="<?php echo $heroCtaLabelLogueado['url']; ?>" target="<?php echo $heroCtaLabelLogueado['target']; ?>" class="button button--secondary-state"><?php echo $heroCtaLabelLogueado['title']; ?></a>
            <?php endif; 
          } ?>

          <?php if ( !is_user_logged_in() ) {
            $heroCtaLabelDeslogueado = get_sub_field('hero__cta-label-deslogueado'); 
            if ($heroCtaLabelDeslogueado) : ?>
              <a href="<?php echo $heroCtaLabelDeslogueado['url']; ?>" target="<?php echo $heroCtaLabelDeslogueado['target']; ?>" class="button button--secondary-state"><?php echo $heroCtaLabelDeslogueado['title']; ?></a>
            <?php endif; 
          } ?>

        </div>

        <?php endwhile; 
      endif; ?>

    </div>
  </div>

</section>