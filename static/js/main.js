$(function() {
	var $allVideos = $("iframe[src^='http://www.youtube.com']"),
	$fluidEl = $("section.video");
	$allVideos.each(function() {
		$(this)
		.data('aspectRatio', this.height / this.width)
		.removeAttr('height')
		.removeAttr('width');
	});
	$(window).resize(function() {
		var newWidth = $fluidEl.width();
		$allVideos.each(function() {
			var $el = $(this);
			$el
			.width(newWidth)
			.height(newWidth * $el.data('aspectRatio'));
		});
	}).resize();
});

(function($){
	$(window).resize(function(){
		if($(window).width()<600){
			var $posts = $('.post'),
			avatarSize;
			$posts.each(function(){
				avatarSize = $('.post_header', this).height();
				$('.post-avatar', this).width(avatarSize);
				$('.post-avatar', this).height(avatarSize);
			});
		} else {
			$('.post-avatar').each(function(){
				if($(this).width()===70){
					return false;
				}
				$(this).width(70);
				$(this).height(70);
			});
		};
	}).resize();
})(jQuery);

jQuery(document).ready(function() {
	jQuery('.tabs .tab-links a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');

        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).fadeIn(500).siblings().hide();

        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});

(function($){
	$(document).ready(function(){
		$('.wall-message form').ajaxForm(function() {
			$.get("/class/2/", null, function(data) {
				// alert($(data));

				// console.log($(data));
				$body = $(data).filter(".wrapper").eq(0);

				$newPost = $(".post", $body).first()[0];
				// $(".wall-content").prepend($newPost);

				// $(".wall-message_textarea").val("");
				location.reload();
				// alert($(".post", $body).first()[0]);
				// console.log($(".post:first-child", $body));

				// alert($("body .board-right_h2").text());
			}, 'html');
		});
	});
})(jQuery);
