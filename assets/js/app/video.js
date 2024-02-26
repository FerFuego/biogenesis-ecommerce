(function($){
	$(function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	});
})(jQuery);

function onYouTubeIframeAPIReady() {
	jQuery('.youtube-background-video').each(function(){
		var video = jQuery(this).data('video'),
		id = jQuery(this).attr('id'),
		player = new YT.Player(id, {
			height: '360',
			width: '640',
			videoId: video,
			playerVars: { 'controls': 0, 'showinfo': 0, 'rel': 0, 'enablejsapi':1, 'autoplay':1, 'loop':1, 'wmode' : 'transparent'},
			events : {
				'onReady' : function(e){
					e.target.playVideo();
					e.target.mute();
					e.target.setPlaybackQuality('hd720');
				},
				onStateChange : function(e) {
					if (e.data === YT.PlayerState.ENDED) {
						e.target.playVideo();
					}
				}
			}
		});
	});
}

(function($){
	$(function(){
		$(".video-button").each( function() {
			var button = $(this);
			$(this).magnificPopup({
				type:'iframe',
				items: {
					src: button.data('video')
				}
			});
		} );
	});
})(jQuery);
