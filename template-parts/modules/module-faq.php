<!-- FAQ --> 
<section class="faq">
	<div class="faq__container container-lg">
	
	<!-- Title -->
	<?php if(get_sub_field('faq-section-title')): ?>
		<h3 class="faq__title title-m js-fade-in-up"><?php the_sub_field('faq-section-title') ?></h3>
	<?php endif; ?>

	<!-- Accordion -->
	<div class="faq__accordion js-fade-in-up-items-container">

		<?php if ( have_rows('faq-container') ) :
			while( have_rows('faq-container') ) : the_row(); ?>

				<div class="faq__accordion-item js-fade-in-up-item">
					<!-- Question -->
					<?php if(get_sub_field('faq-question')): ?>
						<button class="faq__accordion-button" aria-expanded="false"><span><?php the_sub_field('faq-question') ?></span><span class="faq__accordion-icon"></span></button>
					<?php endif; ?>
					<!-- Answer -->
					<?php if(get_sub_field('faq-answer')): ?>
						<div class="faq__accordion-content">
							<p><?php the_sub_field('faq-answer') ?></p>
						</div>
					<?php endif; ?>
				</div>

			<?php endwhile;
		endif; ?>

	</div>

	</div>
</section>
