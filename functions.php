<?php

/**
 * Biogenesis Bago functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package BIOGENESIS_BAGO
 */

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

if (!function_exists('biogenesis_bago_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function biogenesis_bago_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Biogenesis Bago, use a find and replace
		 * to change 'biogenesis_bago' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('biogenesis_bago', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'main-menu' => esc_html__('Primary', 'biogenesis_bago'),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'biogenesis_bago_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
				'header-text' => array('site-title', 'site-description'),
			)
		);
	}
endif;
add_action('after_setup_theme', 'biogenesis_bago_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function biogenesis_bago_content_width()
{
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters('biogenesis_bago_content_width', 1080);
}
add_action('after_setup_theme', 'biogenesis_bago_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function biogenesis_bago_widgets_init()
{
	register_sidebar(
		array(
			'name'          => esc_html__('Sidebar', 'biogenesis_bago'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'biogenesis_bago'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
//add_action( 'widgets_init', 'biogenesis_bago_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
require get_template_directory() . '/inc/optional/theme-settings.php';


function biogenesis_bago_admin_scripts()
{
	$url = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

	if (apply_filters('use_build_assets', strstr($url, '.local'))) {
		// all local development and armyofbees.net
		$root_url = get_template_directory_uri() . '/assets/build/';
		$root_path = get_template_directory() . '/assets/build/';
		$min = '';
	} else {
		//all pantheon and production
		$root_url = get_template_directory_uri() . '/assets/dist/';
		$root_path = get_template_directory() . '/assets/dist/';
		$min = '.min';
	}

	wp_enqueue_style('biogenesis_bago-admin-style', $root_url . 'admin' . $min . '.css',  array(), filemtime($root_path . 'admin' . $min . '.css'));
}
add_action('admin_enqueue_scripts', 'biogenesis_bago_admin_scripts');

/**
 * Automatically loaded theme features
 * If adding a new feature that should always be on, just drop the file into the directory below.
 * If your feature needs special priority, you may want to include it separately as this is not loaded in specific order
 */
$iterator = new RecursiveDirectoryIterator(__DIR__ . '/inc/automatic');
foreach (new RecursiveIteratorIterator($iterator) as $file) {
	if ($file->getExtension() === 'php') {
		require $file;
	}
}
$iterator = new RecursiveDirectoryIterator(__DIR__ . '/inc/woocommerce');
foreach (new RecursiveIteratorIterator($iterator) as $file) {
	if ($file->getExtension() === 'php') {
		require $file;
	}
}

/**
 * Load cron/task Helper
 */
//require get_template_directory() . '/inc/optional/tasks.php';

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/optional/custom-header.php';

/**
 * Customizer additions.
 */
//require get_template_directory() . '/inc/optional/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/optional/jetpack.php';
}


/**
 * Enable ACF Theme Options
 */
if (function_exists('acf_add_options_page')) {

	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> true
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Header',
		'menu_title'	=> 'Header',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title'    => 'Footer',
		'menu_title'    => 'Footer',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Scritps Analíticas',
		'menu_title'	=> 'Scritps Analíticas',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Google Maps API Key',
		'menu_title'	=> 'Google Maps API Key',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Banner Nueva Campaña',
		'menu_title'	=> 'Banner Nueva Campaña',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title'    => 'Modales (Usuarios)',
		'menu_title'    => 'Modales (Usuarios)',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title'    => 'Modales (Productos)',
		'menu_title'    => 'Modales (Productos)',
		'parent_slug' 	=> 'theme-general-settings',
	));
}


function mytheme_add_woocommerce_support()
{
	add_theme_support('woocommerce');
}

add_action('after_setup_theme', 'mytheme_add_woocommerce_support');

/**
 * Custom Roles
 */
require get_template_directory() . '/inc/optional/custom-roles.php';

/**
 * Custom Fields
 */
require get_template_directory() . '/inc/optional/custom-fields.php';

/**
 * Custom Functions
 */
require get_template_directory() . '/inc/optional/custom-functions.php';

/**
 * Custom Woocommerce
 */
require get_template_directory() . '/inc/optional/woocommerce/custom-woocommerce.php';

/**
 * Register User
 */

require get_template_directory() . '/inc/optional/custom-register.php';

/**
 * User Functions
 */
require get_template_directory() . '/inc/optional/custom-user-functions.php';

/**
 * Login
 */
require get_template_directory() . '/inc/optional/custom-login.php';

/**
 * Distributor Checkout
 */
require get_template_directory() . '/inc/optional/custom-distributor-checkout.php';

/**
 * Google Map
 */
require get_template_directory() . '/inc/optional/custom-google-map.php';

/**
 * Taxonomy Single Term
 */
require get_template_directory() . '/inc/optional/custom-taxonomy-single-term.php';

/**
 * Orders CSV Download
 */
require get_template_directory() . '/inc/optional/csv-orders-report.php';

/**
 * Lost Password
 */
require get_template_directory() . '/inc/optional/check-lost-password.php';




function user_metadata($user_id)
{

	if (!empty($_POST['firname']) && !empty($_POST['lasname'])) {

		update_user_meta($user_id, 'first_name', trim($_POST['firname']));
		update_user_meta($user_id, 'last_name', trim($_POST['lasname']));
	}

	update_user_meta($user_id, 'show_admin_bar_front', false);
}
add_action('user_register', 'user_metadata');
add_action('profile_update', 'user_metadata');


/**
 * Remove unused archives
 */

add_action('template_redirect', 'remove_unused_wp_archives');
function remove_unused_wp_archives(){
	// If we are on category or tag or date or author archive
	if( is_category() || is_tag() || is_date() || is_author() || is_shop() ) {
		global $wp_query;
		$wp_query->set_404(); //set to 404 not found page
	}
}


// Report Filter
function filter_report() {

	// Get Info
	$veterinarias = get_users(
		array(
			'role__in' => 'distributor',
		)
	);

	// POST > Filters
    $campaignID = $_POST['campaign'];
	$orderStatus = $_POST['orderStatus'];
	if ($orderStatus == 'todos') {
		$orderStatus = array('processing', 'on-hold', 'completed', 'refunded');
	}
	$vetName = $_POST['vetName'];
	if ($vetName == 'todas') {
		$vetName = array();
		foreach ($veterinarias as $veterinaria) {
			array_push($veterinaria, $vetName);
		}
	}

	$terms = get_terms( array(
		'taxonomy' => 'campaign',
		'hide_empty' => false,
	)); 
	foreach ($terms as $term) {
		if ($term->term_id == $campaignID) {
			$campaignStartDate = get_field('campaign_date_start', $term);
			$campaignEndDate = get_field('campaign_date_end', $term);
		} 
	} 

	$currentUserId = $_POST['currentUserId'];
	$currentUser = get_user_by('id', $currentUserId);
	if ($currentUser->roles[0] == 'vendedor' || $currentUser->roles[0] == 'tecnico') {
		$args = array (
			'posts_per_page' => '-1',
			'date_before' => $campaignEndDate,  
			'date_after' => $campaignStartDate,
			'billing_distributor' => $vetName,
			'vet_vendedor_id' => $currentUserId,
			'status'=> array($orderStatus),
			'type' => 'shop_order',
			'orderby' => 'ID',
			'order' => 'DESC'
		);
	} else {
		$args = array (
			'posts_per_page' => '-1',
			'date_before' => $campaignEndDate,  
			'date_after' => $campaignStartDate,
			'billing_distributor' => $vetName,
			'status'=> array($orderStatus),
			'type' => 'shop_order',
			'orderby' => 'ID',
			'order' => 'DESC'
		);
	}

    $orders = wc_get_orders($args); 

    $response = '';

    if($orders) {
        $response = include('template-parts/orders-table.php');
    } else {
        $response = include('template-parts/orders-table-empty.php');
    }

    echo $response;
    wp_die();
}
add_action('wp_ajax_filter_report', 'filter_report');
add_action('wp_ajax_nopriv_filter_report', 'filter_report');