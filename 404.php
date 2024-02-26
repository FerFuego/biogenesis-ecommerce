<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package BIOGENESIS_BAGO
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<section class="error-404 not-found">

				<div class="error-404__container container-lg">
					<div class="row">
						<div class="col">

							<div class="error-404__icon-container">
								<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/icons/alert--big.svg" alt="">
							</div>

							<div class="error-404__title-container">
								<h1 class="error-404__title">Lo sentimos, la página que está buscando no se encuentra disponible</h1>
								<h2 class="error-404__subtitle">Para seguir explorando, por favor vuelva al inicio</h2>
							</div>

							<div class='button-group button-group--align-center'>
								<a href="<?php echo get_home_url() ?>" class='error-404__button button'>Volver al Inicio</a>
							</div>

						</div>
					</div>
				</div>

				<img class="wave js-parallax-horizontal" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--white-blue.svg" alt="Wave Background">	
				<img class="wave wave--mobile" src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/elements/wave--white-blue--mobile-2.svg" alt="Wave Background">	

			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
