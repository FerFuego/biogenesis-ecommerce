/**
 * Animations are last to make sure other effects or movement happen first as height calculations can affect this
 */

//this removes our fallback css animations - each module should have a fallback animation to set its opacity to 1
var body = document.querySelector( 'body' );
body.classList.remove('no-js');

(function($){
	$(function(){

		// Fade In Up
		const fadeInUp = $('.js-fade-in-up');
		fadeInUp.each(function(){
			var $self = $(this);
			$(this).waypoint({
				handler: function(direction) {
				anime({
					targets: $self[0],
					translateY: [100, 0],
					opacity: [0, 1],
					easing: 'easeInOutQuad',
					duration: 500,
					delay: anime.stagger(100, {start: 300})
				});
					this.destroy()
				},
				offset: "100%",
			});
		});

		// Fade In Up - Items
		const fadeInUpItemsContainer = $('.js-fade-in-up-items-container');
		fadeInUpItemsContainer.each(function(){
			var $self = $(this);
			$(this).waypoint({
				handler: function(direction) {
				anime({
					targets: $self[0].querySelectorAll('.js-fade-in-up-item'),
					translateY: [100, 0],
					opacity: [0, 1],
					easing: 'easeInOutQuad',
					duration: 500,
					delay: anime.stagger(100, {start: 500})
				});
					this.destroy()
				},
				offset: "100%",
			});
		});

	});
})(jQuery);
