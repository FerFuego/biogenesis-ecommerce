<?php
/**
 * 
 * Template Name: ¿Cómo Funciona?
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-how-it-works js-fade-in-up">
        
            <div class="how-it-works__main-title container-lg">
                <?php if(get_field('how-it-works__page-title')): ?>
                    <h1 class="title-xl"><?php the_field('how-it-works__page-title') ?></h1>
                <?php endif; ?>
            </div>

            <?php
                while( have_rows( 'how-it-works__flexible-content' ) ):
                    the_row();
                    $module = get_row_layout();

                    get_template_part( 'template-parts/modules/module', get_row_layout() );

                endwhile;
            ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
