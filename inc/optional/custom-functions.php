<?php

add_action( 'init', 'custom_taxonomy_campaign' );

function custom_taxonomy_campaign() {

    $labels = array(
        'name'                       => 'Campañas',
        'singular_name'              => 'Campaña',
        'menu_name'                  => 'Campañas',
        'all_items'                  => 'Todas las Campañas',
        'parent_item'                => 'Parent Item',
        'parent_item_colon'          => 'Parent Item:',
        'new_item_name'              => 'Nueva Campaña',
        'add_new_item'               => 'Agregar nueva Campaña',
        'edit_item'                  => 'Editar Campaña',
        'update_item'                => 'Actualizar Campaña',
        'separate_items_with_commas' => 'Separar campañas con comas',
        'search_items'               => 'Buscar Campañas',
        'add_or_remove_items'        => 'Agregar o Remover Campañas',
        'choose_from_most_used'      => 'Choose from the most used Campaign',
    );

    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        
    );

    register_taxonomy( 'campaign', 'product', $args );
    register_taxonomy_for_object_type( 'campaign', 'product' );

}

// If Campaign Ended > Make Item Unpurchasable
add_filter( 'woocommerce_is_purchasable', 'campaign_end_item_unpurchasable', 20, 2 );
function campaign_end_item_unpurchasable( $purchasable, $product ){
    $campaign = get_the_terms( get_the_ID(), 'campaign' );

    if ( $campaign && ! is_wp_error( $campaign )) {
        foreach ( $campaign as $term ) {
            $campaignDateStart = get_field('campaign_date_start', $term->taxonomy . '_' . $term->term_id);
            $campaignDateEnd = get_field('campaign_date_end', $term->taxonomy . '_' . $term->term_id);
        }

        $campaignDateEnd = new DateTime($campaignDateEnd);
        $campaignDateEnd->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
        $campaignDateEnd->setTime(23, 59, 59);

        $campaignDateStart = new DateTime($campaignDateStart);
		$campaignDateStart->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));

        $currentDate = new DateTime(date("Y/m/d"));
        $currentDate->setTimezone(new DateTimeZone('America/Argentina/Buenos_Aires'));
    }

    if ($currentDate >= $campaignDateStart && $currentDate <= $campaignDateEnd ) {
        $purchasable = true; 
    } else {
        $purchasable = false; 
    }

    return $purchasable;
}

function wpb_custom_new_menu() {
    register_nav_menu('public-menu',__( 'Public Menu' ));
    register_nav_menu('private-menu',__( 'Private Menu' ));
    register_nav_menu('footer-menu',__( 'Footer Menu' ));
}
add_action( 'init', 'wpb_custom_new_menu' );

// Remove editor from template pages
function remove_editor() {
    remove_post_type_support('page', 'editor');
    remove_post_type_support('product', 'editor');
}
add_action('init', 'remove_editor');


// Module: module-products_grid.php - Get Products & Show More Products
add_action('wp_ajax_show_more_products_by_ajax', 'show_more_products_by_ajax_callback');
add_action('wp_ajax_nopriv_show_more_products_by_ajax', 'show_more_products_by_ajax_callback');

function show_more_products_by_ajax_callback() {
	check_ajax_referer('show_more_products', 'security');
	$paged = $_POST['page'];
	$args = array(
		'post_type' => 'product',
		'posts_per_page' => 4,
		'paged' => $paged,
		);

	  $products = new WP_Query( $args );

		if ( $products->have_posts() ) {
			while ( $products->have_posts() ) : $products->the_post(); ?>

				<div class="products-grid__card">
					<?php wc_get_template_part( 'content', 'product' ); ?>
				</div>

			<?php endwhile;
		} else {
			echo __( 'No products found' );
		} 

		wp_reset_postdata();
		wp_die();
}


function array_sort_by(&$arrIni, $col, $order = SORT_ASC) {
    $arrAux = array();
    foreach ($arrIni as $key=> $row)
    {
            $arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
            $arrAux[$key] = strtolower($arrAux[$key]);
    }
    array_multisort($arrAux, $order, $arrIni);
}


