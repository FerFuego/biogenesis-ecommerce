<?php
/**
 * 
 * Template Name: ACF Form
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BIOGENESIS_BAGO
 */

acf_form_head(); 
get_header();
?>
    <div id="primary" class="content-area">
		<main id="main" class="site-main page-all-products" style="margin-top: 150px;">
        
        <?php /* The loop */ ?>
        <?php while ( have_posts() ) : the_post(); ?>
            
            <?php 
            $currentUserID = get_current_user_id();
            acf_form(
                array(
                    'post_id' => 'user_'.$currentUserID,
                    'field_groups' => array(group_60eef4a611916),
                )
            ); 
            ?>

        <?php endwhile; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();