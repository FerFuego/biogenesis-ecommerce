<?php 

function biogenesis_bago_scripts()
{
	//we don't need the block editor css
	wp_dequeue_style('wp-block-library');

	$url = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

	// all local development and armyofbees.net
	$root_url = get_template_directory_uri() . '/assets/build/';
	$root_path = get_template_directory() . '/assets/build/';
	$min = '';
	
	wp_enqueue_style('biogenesis_bago-style', $root_url . 'style' . $min . '.css',  array(), filemtime($root_path . 'style' . $min . '.css'));
	wp_enqueue_script('biogenesis_bago-vendor-js', $root_url . 'vendor_scripts' . $min . '.js', array('jquery'), filemtime($root_path . 'vendor_scripts' . $min . '.js'), true);
	wp_register_script('biogenesis_bago-app-js', $root_url . 'app_scripts' . $min . '.js',  array('biogenesis_bago-vendor-js'), filemtime($root_path . 'app_scripts' . $min . '.js'), true);
	wp_enqueue_script('biogenesis_bago-app-js' );

	/* -- Specific Pages Scripts -- */
	// Product Single 
	if ( is_product() ){
		wp_enqueue_script('product-single-js', get_template_directory_uri() . '/assets/js/pages/product-single.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}
	// Account
	if ( is_account_page() ){
		wp_enqueue_script('jsuite', 'https://jsuites.net/v4/jsuites.js', array('biogenesis_bago-vendor-js'), '5', true);
		wp_enqueue_script('my-profile', get_template_directory_uri() . '/assets/js/pages/my-profile.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}
	// Account or Cart
	if ( is_checkout() || is_account_page() ){
		wp_enqueue_script('jsuite', 'https://jsuites.net/v4/jsuites.js', array('biogenesis_bago-vendor-js'), '5', true);
		wp_enqueue_script('profile-generator', get_template_directory_uri() . '/assets/js/pages/profile-generator.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}
	// Cart 
	if ( is_cart() ){
		wp_enqueue_script('cart-js', get_template_directory_uri() . '/assets/js/pages/cart.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}

	// Checkout
	if ( is_checkout()){
		wp_enqueue_script('jsuite', 'https://jsuites.net/v4/jsuites.js', array('biogenesis_bago-vendor-js'), '4', true);
		wp_enqueue_script('checkout-js', get_template_directory_uri() . '/assets/js/pages/checkout.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}

	// Veterinarias
	if ( is_page('veterinarias') || is_page('veterinarias-2')){
		wp_enqueue_script('veterinarias-js', get_template_directory_uri() . '/assets/js/pages/veterinarias.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}

	// Reportes
	if ( is_page('reportes')){
		wp_enqueue_script('reportes-filter-js', get_template_directory_uri() . '/assets/js/pages/reportes-filter.js',  array('biogenesis_bago-vendor-js', 'biogenesis_bago-app-js'), '2', true);
	}
	
	wp_localize_script('biogenesis_bago-app-js', 'bio_vars', [ 'ajaxUrl' => admin_url( 'admin-ajax.php' ), 'rootUrl' => get_site_url() ] );

	// wp_localize_script('biogenesis_bago-app-js', 'BiogenesisBago', [
	// 	'ajax' => admin_url('admin-ajax.php'),
	// ]);

	// Pass wordpress template path to javascript file
	$translation_array = array( 'templateUrl' => get_stylesheet_directory_uri() );
	wp_localize_script( 'biogenesis_bago-app-js', 'templatePath', $translation_array );

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

}
add_action('wp_enqueue_scripts', 'biogenesis_bago_scripts');


function my_enqueue($hook) {
    // Only add to the edit.php admin page.
    // See WP docs.
    // if ('edit.php' !== $hook) {
    //     return;
    // }
    wp_enqueue_script('my_custom_script', get_template_directory_uri() . '/assets/js/app/admin.js');
}

add_action('admin_enqueue_scripts', 'my_enqueue');

function my_custom_footer_code(){
	// Checkout
	if ( is_checkout()){
		wp_enqueue_script('checkout-plus-js', get_template_directory_uri() . '/assets/js/vendor/select2.js',  array('jquery'), '2', true);
	}
};
add_action('wp_footer', 'my_custom_footer_code');


function my_custom_userID_gtag () {
	$gtag_config = "gtag('config', 'GTM-NVQTWDM');";
	// If someone's logged in, let's track.
	if ( is_user_logged_in() ) {
		$gtag_config = "gtag('config', 'GTM-NVQTWDM', { 'user_id': '" . get_current_user_id() . "' });";
	} ?>
	<!-- Start Google Tag Manager USER ID -->
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		<?php echo $gtag_config ?>
		</script>
	<!-- End Google Tag Manager USER ID -->
	<?php 
}
add_action( 'wp_head', 'my_custom_userID_gtag' );