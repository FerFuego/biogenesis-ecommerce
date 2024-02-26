<?php
/**
 * 
 * Template Name: Legales
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-all-products">
        
            <section class="legal">
                <div class="legal__container container-lg">
                    
                    <!-- Title -->
                    <?php if(get_field('legal_title')): ?>
                        <h1 class="legal__title"><?php the_field('legal_title') ?></h1>
                    <?php endif; ?>

                    <!-- Date -->
                    <?php if(get_field('legal_subtitle')): ?>
                        <?php 
                        $date = get_field('legal_subtitle'); 
                        $dateTime = DateTime::createFromFormat("Ymd", $date);
                        if ( is_object($dateTime) ) {
                            $day = $dateTime->format('j');
                            $month = $dateTime->format('F');
                            $year = $dateTime->format('Y');
                        //...
                        }?>
                        <h3 class="legal__date">Actualizados por ultima vez el <span><?php echo $day; ?></span> de <span><?php echo __($month); ?></span> del <span><?php echo $year; ?></span></h3>
                    <?php endif; ?>

                    <!-- TyC -->
                    <?php if(get_field('legal_text')): ?>
                        <div class="legal__text">
                            <?php the_field('legal_text') ?>
                        </div>
                    <?php endif; ?>

                </div>
            </section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();