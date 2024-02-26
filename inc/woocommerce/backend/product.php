<?php 

/* --- Remove Unused Product Types --- */
add_filter( 'product_type_selector', 'remove_unused_product_types' );
 function remove_unused_product_types( $product_types ) {

 	unset( $product_types['grouped'] );
	unset( $product_types['external'] );
    unset( $product_types['simple'] );
	//$product_types['simple'] = 'Producto Simple';
    $product_types['variable'] = 'Producto Variable';
 
	return $product_types;
}

/* --- Remove Virtual and Downloadable options from products --- */
add_filter( 'product_type_options', function( $options ) {

	// remove "Virtual" checkbox
	if( isset( $options[ 'virtual' ] ) ) {
		unset( $options[ 'virtual' ] );
	}
	// remove "Downloadable" checkbox
	if( isset( $options[ 'downloadable' ] ) ) {
		unset( $options[ 'downloadable' ] );
	}
	return $options;
} );

/* --- Remove Unused Product Detail Tabs --- */
add_filter('woocommerce_product_data_tabs', 'remove_unused_product_tabs_admin', 10, 1);
function remove_unused_product_tabs_admin($tabs) {

    //unset($tabs['general']);
    unset($tabs['inventory']);
    unset($tabs['shipping']);
    unset($tabs['linked_product']);
    unset($tabs['advanced']);

    return($tabs);
}

/*--- Remove Unused Columns (Product List > Admin Dashboard) */
add_filter( 'manage_edit-product_columns', 'remove_unused_columns_prodcuts_list', 10, 1 );
function remove_unused_columns_prodcuts_list( $columns ) {
    unset($columns['sku']);
    unset($columns['product_tag']);
    unset($columns['is_in_stock']);
    unset($columns['featured']);
    unset($columns['date']);

    return $columns;
}

// Remove product Tags...
//...from admin menu
add_action( 'admin_menu', 'hide_product_tags_admin_menu', 9999 );
function hide_product_tags_admin_menu() {
	remove_submenu_page( 'edit.php?post_type=product', 'edit-tags.php?taxonomy=product_tag&amp;post_type=product' );
}
//...metabox
add_action( 'admin_menu', 'hide_product_tags_metabox' );
function hide_product_tags_metabox() {
	remove_meta_box( 'tagsdiv-product_tag', 'product', 'side' );
}
//...all products page
add_filter('manage_product_posts_columns', 'misha_hide_product_tags_column', 999 );
function misha_hide_product_tags_column( $product_columns ) {
	unset( $product_columns['product_tag'] );
	return $product_columns;
}
//...quick edit and bulk edit
add_filter( 'quick_edit_show_taxonomy', 'misha_hide_product_tags_quick_edit', 10, 2 );
function misha_hide_product_tags_quick_edit( $show, $taxonomy_name ) {
    if ( 'product_tag' == $taxonomy_name )
        $show = false;
    return $show;
}

// Add custom field input > Dosis por Frasco
add_action( 'woocommerce_variation_options_pricing', 'add_custom_field_to_variations', 10, 3 );
function add_custom_field_to_variations( $loop, $variation_data, $variation ) {
    woocommerce_wp_text_input( array(
        'id' => 'custom_field[' . $loop . ']',
        'class' => 'short',
        'type' => 'number',
        'label' => __( 'DosisFrasco', 'woocommerce' ),
        'value' => get_post_meta( $variation->ID, 'custom_field', true )
    ) );
}
add_action( 'woocommerce_save_product_variation', 'save_custom_field_variations', 10, 2 );
function save_custom_field_variations( $variation_id, $i ) {
   $custom_field = $_POST['custom_field'][$i];
   if ( isset( $custom_field ) ) update_post_meta( $variation_id, 'custom_field', esc_attr( $custom_field ) );
}
add_filter( 'woocommerce_available_variation', 'add_custom_field_variation_data' );
function add_custom_field_variation_data( $variations ) {
   $variations['custom_field'] = '<span id="js-dosis-frasco">'. get_post_meta( $variations[ 'variation_id' ], 'custom_field', true ) .'</span>';
   return $variations;
}

//
if( ! defined( 'ABSPATH' ) ) exit;

class My_ACF_Location_Post_Author extends ACF_Location {

    public function initialize() {
        $this->name = 'post_author';
        $this->label = __( "Post Author", 'acf' );
        $this->category = 'post';
        $this->object_type = 'post';
    }

    public function get_values( $rule ) {
        $choices = array();

        // Load all users, loop over them and append to chcoices.
        $users = get_users();
        if( $users ) {
            foreach( $users as $user ) {
                $choices[ $user->ID ] = $user->display_name;
            }
        }
        return $choices;
    }

    public function match( $rule, $screen, $field_group ) {

        // Check screen args for "post_id" which will exist when editing a post.
        // Return false for all other edit screens.
        if( isset($screen['post_id']) ) {
            $post_id = $screen['post_id'];
        } else {
            return false;
        }

        // Load the post object for this edit screen.
        $post = get_post( $post_id );
        if( !$post ) {
            return false;
        }

        // Compare the Post's author attribute to rule value.
        $result = ( $post->post_author == $rule['value'] );

        // Return result taking into account the operator type.
        if( $rule['operator'] == '!=' ) {
            return !$result;
        }
        return $result;
    }
}

?>