(function($){
	$(function(){

		const basic_text = $('.module--basic_text');
		const left_right = $('.module--left_right__inner');
		const video = $('.module--video');


		basic_text.each(function(){
			var $self = $(this);
			$(this).waypoint({
				handler: function(direction) {
					TweenMax.staggerFromTo(basic_text, 1, {y:50}, {y:0}, 0.1);
					TweenMax.staggerFromTo(basic_text, 1, {opacity: 0}, {opacity: 1}, 0.1);
					this.destroy()
				},
				offset: "100%",
			});
		});

		left_right.each(function(){
			var $self = $(this);
			$(this).waypoint({
				handler: function(direction) {
					TweenMax.staggerFromTo('.module--left_right__inner', 1, {y:50}, {y:0}, 0.1);
					TweenMax.staggerFromTo('.module--left_right__inner', 1, {opacity: 0}, {opacity: 1}, 0.1);
					this.destroy()
				},
				offset: '100%',
			});
		});

		video.each(function(){
			var $self = $(this);
			$(this).waypoint({
				handler: function(direction) {
					TweenLite.fromTo('.module--video__inner', 1, {y:200}, {y:0});
					TweenLite.fromTo('.module--video__inner', 1, {opacity: 0}, {opacity: 1});
					this.destroy()
				},
				offset: '90%',
			});
		});

	});
})(jQuery);
