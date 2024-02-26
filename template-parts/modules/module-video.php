<?php
$image = get_sub_field( 'image' );
$video = get_sub_field( 'video_url' );
?>
<div class="module--video__inner">
	<div class="container-lg">
		<div class="row">
			<div class="col" style="background-image: url( <?php echo $image['url']; ?> );">
				<div class="module--video__content">
					<?php biogenesis_bago_heading( 'text' ); ?>

					<div class="wysiwyg module--video__description">
						<?php the_sub_field( 'body_text' ); ?>
					</div>

					<div class="module--video__play">
						<button class="module--<?php echo get_row_layout(); ?>__play__button video-button" data-video="<?php echo esc_attr($video); ?>">
							Play Video
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
