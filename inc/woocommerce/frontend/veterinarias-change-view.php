<?php 

// Report Filter
function veterinarias_change_view() {

	$view = $_POST['view'];

	if ($view == 'mapa') {
		$response = get_template_part( 'template-parts/modules/module', 'veterinarias_map' );
	} elseif ($view == 'listado') {
		$response = get_template_part( 'template-parts/modules/module', 'listado_veterinarias' );
	} 

    echo $response;
    wp_die();
}
add_action('wp_ajax_veterinarias_change_view', 'veterinarias_change_view');
add_action('wp_ajax_nopriv_veterinarias_change_view', 'veterinarias_change_view');

?>