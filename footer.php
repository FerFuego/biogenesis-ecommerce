<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package BIOGENESIS_BAGO
 */

?>

	</div><!-- #content -->

	<footer class="footer">
		<div class="footer__container container-lg">
			<div class="footer__content">
				<div class="footer__logo-container">
	
					<?php $navLogo = get_field('c-navbar__logo', 'option'); 
						if($navLogo) : ?>
							<img src="<?php echo $navLogo['url']; ?>" alt="<?php echo $navLogo['url']; ?>" class="footer__logo">
					<?php endif; ?>
	
				</div>
	
				<div class="footer__text-container">
					<div class="footer__menu">
						<div class="footer__title"><?php the_field('footer__menu-title', 'options'); ?></div>

						<?php
							wp_nav_menu(
								array(
									'theme_location' => 'footer-menu',
									'menu_id'        => 'footer-menu',
									'container_class' => 'footer__menu-container'
								)
							);
						?>
					</div>
	
					<div class="footer__contact">
						<p class="footer__title"><?php the_field('footer__contact-title', 'options'); ?></p>
						<p class="footer__copy footer__copy--address"><?php the_field('footer__contact-adress', 'options'); ?></p>
						<a href="<?php echo 'mailto:'.get_field('footer__email-adress', 'options'); ?>" class="footer__copy"><?php the_field('footer__email-adress', 'options'); ?></a>
						<div class="footer__social-media">
							<?php if ( have_rows( 'footer__social-media-repeater', 'options' ) ) : ?>
								<?php while ( have_rows('footer__social-media-repeater', 'options' ) ) : the_row(); ?>
		
									<?php 
										$footerSocialMediaImg = get_sub_field('footer__social-media-img', 'options');
										$footerSocialMediaLink = get_sub_field('footer__social-media-link', 'options'); 
									?>
		
									<?php if ($footerSocialMediaImg && $footerSocialMediaLink) : ?>
										<a href="<?php echo$footerSocialMediaLink['url']; ?>" target="<?php echo$footerSocialMediaLink['target']; ?>">
											<img src="<?php echo $footerSocialMediaImg['url']; ?>" alt="<?php echo $footerSocialMediaImg['alt']; ?>">
										</a>
									<?php endif; ?>
		
								<?php endwhile; ?>
							<?php endif; ?>
						</div>
					</div>
	
				</div>
			</div>
			
			<div class="footer__copyright">Copyright de Biogénesis Bagó® <?php echo date('Y'); ?></div>
		</div>
	</footer>

<?php wp_footer(); ?>

</body>
</html>
