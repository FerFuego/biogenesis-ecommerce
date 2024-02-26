<?php
$title_arr = get_sub_field( 'text' );
$title = $title_arr['content'];
?>
<div class="module--horizontal_tabber__inner">
	<div class="container-lg">

		<div class="row">
			<div class="col">
				<div class="horizontal-tabs" role="tablist" aria-orientation="horizontal">
					<div class="mobile-button-container">
						<div class="tab-buttons">
							<?php
							$i = 0;
							while( have_rows( 'tabs' ) ):
								the_row();
								$tablist_id = strtolower( preg_replace( '/[^-a-zA-Z]/', '' , get_sub_field( 'tab_title' ) ) );
							?>
								<button class="horizontal-tab-button" role="tab" id="<?php echo $tablist_id.'_tab_'.$i ?>" aria-controls="<?php echo $tablist_id.'_panel_'.$i ?>"><?php the_sub_field( 'tab_title' ); ?></button>
							<?php $i++; endwhile; ?>
							<div class="button-underline"></div>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div class="panel-container">
								<?php
								$i = 0;
								while( have_rows( 'tabs' ) ):
									the_row();
									$tablist_id = strtolower( preg_replace( '/[^-a-zA-Z]/', '' , get_sub_field( 'tab_title' ) ) );
									include( get_template_directory().'/partials/horizontal-tab.php' );
									$i++;
								endwhile;
								?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
