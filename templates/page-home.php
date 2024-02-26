<?php
/**
 * 
 * Template Name: Home
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-home">
            
            <?php if ( have_rows( 'home__flexible-content' ) ) : ?>
                <?php while ( have_rows('home__flexible-content' ) ) : the_row(); ?>

                    <?php if ( get_row_layout() == 'new_campaign_banner' ) : ?>
                    <?php get_template_part( 'template-parts/modules/module', 'new_campaign_banner' ); ?>

                    <?php elseif ( get_row_layout() == 'hero' ) : ?>
                    <?php get_template_part( 'template-parts/modules/module', 'hero' ); ?>

                    <?php elseif ( get_row_layout() == 'products_grid' ) : ?>
                    <?php get_template_part( 'template-parts/modules/module', 'products_grid' ); ?>

                    <?php elseif ( get_row_layout() == 'related_products' ) : ?>
                    <?php get_template_part( 'template-parts/modules/module', 'related_products' ); ?>

                    <?php elseif ( get_row_layout() == 'cta_box' ) : ?>
                    <?php get_template_part( 'template-parts/modules/module', 'cta_box' ); ?>

                    <?php endif; ?>

                <?php endwhile; ?>
            <?php endif; ?>

            <?php get_template_part( 'template-parts/modules/module', 'success_checkout' ); ?>

		</main><!-- #main -->
	</div><!-- #primary -->
<?php
get_footer();
