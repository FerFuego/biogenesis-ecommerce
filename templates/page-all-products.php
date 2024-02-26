<?php
/**
 * 
 * Template Name: Todos los productos
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-all-products">
        
            <?php
                while( have_rows( 'all-products__flexible-content' ) ):
                    the_row();
                    $module = get_row_layout();

                    get_template_part( 'template-parts/modules/module', get_row_layout() );

                endwhile;
            ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();