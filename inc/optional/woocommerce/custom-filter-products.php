<?php 
add_action('restrict_manage_posts', 'product_tags_sorting');
function product_tags_sorting() {
    global $typenow;

    $taxonomy  = 'campaign';

    if ( $typenow == 'product' ) {


        $selected      = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
        $info_taxonomy = get_taxonomy($taxonomy);

        wp_dropdown_categories(array(
            'show_option_all' => __("Seleccionar campaña"),
            'taxonomy'        => $taxonomy,
            'name'            => $taxonomy,
            'orderby'         => 'name',
            'selected'        => $selected,
            'show_count'      => true,
            'hide_empty'      => true,
        ));
    };
}

add_action('parse_query', 'product_tags_sorting_query');
function product_tags_sorting_query($query) {
    global $pagenow;

    $taxonomy  = 'campaign';

    $q_vars    = &$query->query_vars;
    if ( $pagenow == 'edit.php' && isset($q_vars['post_type']) && $q_vars['post_type'] == 'product' && isset($q_vars[$taxonomy]) && is_numeric($q_vars[$taxonomy]) && $q_vars[$taxonomy] != 0 ) {
        $term = get_term_by('id', $q_vars[$taxonomy], $taxonomy);
        $q_vars[$taxonomy] = $term->slug;
    }
}

// Products (Admin) > Remove Unused Dropdown Filter
add_filter( 'woocommerce_products_admin_list_table_filters', 'remove_products_admin_list_table_filters', 10, 1 );
function remove_products_admin_list_table_filters( $filters ){
    if( isset($filters['product_type']))
        unset($filters['product_type']);

    if( isset($filters['stock_status']))
        unset($filters['stock_status']);

    return $filters;
}