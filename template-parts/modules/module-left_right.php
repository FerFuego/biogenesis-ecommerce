<?php
$media_type = get_sub_field('media_type');

if (get_sub_field( 'image-mobile' )) {
	if (wp_is_mobile()) {
		$image = get_sub_field( 'image-mobile' );
	} else {
		$image = get_sub_field( 'image' );
	}
} else {
	$image = get_sub_field( 'image' );
}

$video = get_sub_field('video');
if(!empty($video)) {
	// Use preg_match to find iframe src.
	preg_match('/src="(.+?)"/', $video, $matches);
	$vid_src = $matches[1];
	//convert youtube urls to another format to make the popup function correctly
	$vid_parts = parse_url( $vid_src );
	if( isset( $vid_parts['host'] ) && ( false !== strpos( $vid_parts['host'], 'youtube' ) ) ){
		$vid_src = 'https://www.youtube.com/watch?v=' . str_replace( '/embed/', '', $vid_parts['path'] );
	}
}

$content_on_right = get_sub_field( 'content_on_left' );
$row_classes = 'flex-md-row';
if( $content_on_right ){
	$row_classes = 'flex-md-row-reverse left-side';
}

$text_classes = 'col col-12 col-md-6';
$image_classes = 'col col-12 col-md-6';
if( $media_type == 'product' ){
	$image_classes .= ' product-image';
}
?>

<section class="left-right">
	<div class="container-lg">

		<!-- Media -->
		<div class="row <?php echo $row_classes; ?>">
			<div class="image-container <?php echo $image_classes; ?> js-fade-in-up">
				<?php if(!empty($video)): ?>
				<button class="video-button" data-video="<?php echo esc_url($vid_src); ?>">
					<div class="play-container d-flex justify-content-center align-items-center">
						<img src="<?php echo get_template_directory_uri() ?>/assets/img/elements/play.svg" alt="play">
					</div>
					<?= wp_get_attachment_image($image, 'large'); ?>
				</button>
				<?php else: ?>
					<?= wp_get_attachment_image($image, 'large'); ?>
				<?php endif; ?>
			</div>

			<!-- Text -->
			<div class="text-container <?php echo $text_classes; ?> js-fade-in-up-items-container">

				<div class="text-subcontainer">
					<!-- Prehead -->
					<div class="prehead-container d-flex">
						<?php if(get_sub_field('left-right_prehead')): ?>
							<h4 class="left-right__prehead js-fade-in-up-item"><?php the_sub_field('left-right_prehead') ?></h4>
						<?php endif; ?>
					</div>
					<!-- Title -->
					<?php if(get_sub_field('left-right_title')): ?>
						<h3 class="left-right__title js-fade-in-up-item"><?php the_sub_field('left-right_title') ?></h3>
					<?php endif; ?>
					<!-- Description -->
					<?php if( '' !== get_sub_field( 'description' ) ): ?>
						<div class="wysiwyg js-fade-in-up-item">
							<?php the_sub_field( 'description' ); ?>
						</div>
					<?php endif; ?>
				</div>

			</div>
		</div>

	</div>
</section>
