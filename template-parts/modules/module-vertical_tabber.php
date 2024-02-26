<?php
$title_arr = get_sub_field( 'text' );
$title = $title_arr['content'];
?>
<div class="module--vertical_tabber__inner">
	<div class="container-lg">
		<div class="row">

			<?php if( '' !== get_sub_field( 'prehead' ) ): ?>
			<div class="prehead">
				<?php the_sub_field( 'prehead' ); ?>
			</div>
			<?php endif; ?>

			<?php biogenesis_bago_heading( 'text' ); ?>

			<?php if( '' !== get_sub_field( 'description' ) ): ?>
				<div class="wysiwyg">
					<?php the_sub_field( 'description' ); ?>
				</div>
			<?php endif; ?>

		</div>

		<div class="row vertical-tabs" role="tablist" aria-label="<?php echo esc_attr( $title ); ?>" aria-orientation="vertical">
			<div class="col col-12 col-md-2">
				<div class="mobile-button-container">
					<div class="tab-buttons">
						<?php
						$i = 0;
						while( have_rows( 'tabs' ) ):
							the_row();
							$tablist_id = strtolower( preg_replace( '/[^-a-zA-Z]/', '' , get_sub_field( 'tab_title' ) ) );
							?>
							<button class="vertical-tab-button" role="tab" id="<?php echo $tablist_id.'_tab_'.$i ?>" aria-controls="<?php echo $tablist_id.'_panel_'.$i ?>"><?php the_sub_field( 'tab_title' ); ?></button>
						<?php $i++; endwhile; ?>
					</div>
				</div>
			</div>
			<div class="col col-12 col-md-10">
				<div class="panel-container">
					<?php
					$i = 0;
					while( have_rows( 'tabs' ) ):
						the_row();
						$tablist_id = strtolower( preg_replace( '/[^-a-zA-Z]/', '' , get_sub_field( 'tab_title' ) ) );
						include( get_template_directory().'/partials/vertical-tab.php' );
						$i++;
					endwhile;
					?>
				</div>
			</div>
		</div>

	</div>
</div>
