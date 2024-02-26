<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package BIOGENESIS_BAGO
 */

if ( ! function_exists( 'biogenesis_bago_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function biogenesis_bago_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = sprintf(
			/* translators: %s: post date. */
			esc_html_x( 'Posted on %s', 'post date', 'biogenesis_bago' ),
			'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
		);

		echo '<span class="posted-on">' . $posted_on . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
endif;

if ( ! function_exists( 'biogenesis_bago_posted_by' ) ) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function biogenesis_bago_posted_by() {
		$byline = sprintf(
			/* translators: %s: post author. */
			esc_html_x( 'by %s', 'post author', 'biogenesis_bago' ),
			'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
		);

		echo '<span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
endif;

if ( ! function_exists( 'biogenesis_bago_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function biogenesis_bago_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'biogenesis_bago' ) );
			if ( $categories_list ) {
				/* translators: 1: list of categories. */
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'biogenesis_bago' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'biogenesis_bago' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'biogenesis_bago' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'biogenesis_bago' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post( get_the_title() )
				)
			);
			echo '</span>';
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'biogenesis_bago' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif;

if ( ! function_exists( 'biogenesis_bago_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function biogenesis_bago_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="post-thumbnail">
				<?php the_post_thumbnail(); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

			<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
				<?php
					the_post_thumbnail(
						'post-thumbnail',
						array(
							'alt' => the_title_attribute(
								array(
									'echo' => false,
								)
							),
						)
					);
				?>
			</a>

			<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'wp_body_open' ) ) :
	/**
	 * Shim for sites older than 5.2.
	 *
	 * @link https://core.trac.wordpress.org/ticket/12563
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
endif;

if( !function_exists( 'clean_phone_number' ) ):

	/**
	 * format a number for dialable link
	 */
	function clean_phone_number( $number ){
		$number = preg_replace( '/\D/','', $number );
		return $number;
	}

endif;

if( !function_exists( 'display_svg' ) ):

	/**
	 * wrap our svg paths from admin selections in displayable svg tag
	 */
	function display_svg( $contents, $params = [] ){

		$params += [
			'classes' => [],
		];
		$classes = implode( ' ', $params['classes'] );

		include( get_template_directory() . '/partials/svg.php' );
	}

endif;

if( !function_exists( 'youtube_id_from_url' ) ){

	function youtube_id_from_url( $url ){
		$regex = '/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/';
		$result = preg_match( $regex, $url, $match );

		if( !$result ){
			return false;
		}

		return $match[7];
	}

}

if( !function_exists( 'biogenesis_bago_heading' ) ){

	/**
	 * Output standard heading support group contents
	 * Can be used for sub fields or top level by passing the appropriate function param
	 */
	function biogenesis_bago_heading( $field_name = 'heading', $params = [] ){
		$params += [
			'class'       => 'title',			//default class to apply
			'default_tag' => 'div',				//default html tag to use
			'function'    => 'get_sub_field',	//acf function to use to retrieve value
			'partial'	  => 'heading.php',				//partial file to include
		];
		$values = $params['function']( $field_name );
		extract( $values );
		$class = $params['class'];
		$partial = $params['partial'];

		if( 'default' === $type || '' == $type  ){
			$type = $params['default_tag'];
		}

		if( $content == '' ){
			return;
		}

		include( get_template_directory() . "/partials/{$partial}" );
	}

}

if( !function_exists( 'biogenesis_bago_button_group' ) ){

	/**
	 * Output standard button group support group contents
	 * Can be used for sub fields or top level by passing the appropriate function param
	 */
	function biogenesis_bago_button_group( $field_name = 'button_section', $params = [] ){

		$params += [
			'function' => 'get_sub_field',
			'alignment' => '',
			'type' => '',
		];
		$button_group = $params['function']( $field_name );

		if( false === $button_group['buttons'] ){
			return;
		}

		if( !is_array( $button_group['buttons'] ) ){
			return;
		}

		if( count( $button_group['buttons'] ) === 0 ){
			return;
		}

		$override_alignment = $params['alignment'];
		$override_type	 = $params['type'];

		include( get_template_directory().'/partials/button-group.php' );
	}

}

if( !function_exists( 'biogenesis_bago_needs_rel_tags' ) ){

	/**
	 * Determine if target url matches site domain for adding of noopener noreferrer tags in templates
	 */
	function biogenesis_bago_needs_rel_tags( $url ){
		$components = parse_url($url);
		$homecomponents = parse_url( site_url() );
		$site = $homecomponents['host'];
		$ret = true;

		//assumed relative link
		if ( empty($components['host']) ){
			$ret = false;
		}

		//check root domain against root domain of target url
		$domain_pieces = explode( '.', $site );
		$suffix = array_pop( $domain_pieces );
		$domain = array_pop( $domain_pieces );

		$to_check_domain_pieces = explode( '.', $components['host'] );
		$to_check_suffix = array_pop( $to_check_domain_pieces );
		$to_check_domain = array_pop( $to_check_domain_pieces );

		if( $domain === $to_check_domain ){
			$ret = false;
		}

		return apply_filters( 'wcanvas/security/needs_rel_security', $ret, $url );
	}
}
