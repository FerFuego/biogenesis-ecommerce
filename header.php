<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package BIOGENESIS_BAGO
 */

?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>

	<!-- Analytic Scripts (Header) -->
	<?php $analyticsScriptHeader = get_field('analytic-scripts_header', 'options'); ?>
	<?php echo ($analyticsScriptHeader) ? $analyticsScriptHeader : ''; ?>
</head>

<body <?php body_class('no-js'); ?>>
<?php wp_body_open(); ?>

<!-- Analytic Scripts (Body) -->
<?php $analyticsScriptBody = get_field('analytic-scripts_body', 'options'); ?>
<?php echo ($analyticsScriptBody) ? $analyticsScriptBody : ''; ?>

<!-- Current User -->
<?php $currentUser = wp_get_current_user(); 
if (is_user_logged_in()) {
	switch ($currentUser) {
		case $currentUser->roles[0] == 'administrator':
			$userRole = 'admin';
			break;
		case $currentUser->roles[0] == 'vendedor' || $currentUser->roles[0] == 'tecnico':
			$userRole = 'vendedor-tecnico';
			break;
		default:
		$userRole = '';
			break;
	}
}
?>


<div id="page" class="site <?php echo $userRole; ?>">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'biogenesis_bago' ); ?></a>

	<header id="masthead" class="site-header">

		<?php get_template_part( 'template-parts/base/navbar' );?>

	</header><!-- #masthead -->

	<div id="content" class="site-content">

	<div class="not-working-ie">
		<div class="not-working-ie__container">
			<div class="not-working-ie__icon-container">
				<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/max-limit-alert.svg" alt="Max Limit Alert Icon">
			</div>
			<div class="not-working-ie__title-container">
				<h2 class="not-working-ie__title">Este sitio no se encuentra optimizado para Internet Explorer.</h2>
				<h3 class="not-working-ie__subtitle">Para poder brindarle una experiencia satisfactoria le solicitamos por favor ingresar con otro navegador.</h3>
			</div>
		</div>
	</div>

	<?php get_template_part( 'template-parts/modules/module', 'new_campaign_banner' ); ?>

