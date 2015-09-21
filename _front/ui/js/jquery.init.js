/* ========================================================================= */
/* BE SURE TO COMMENT CODE/IDENTIFY PER PLUGIN CALL */
/* ========================================================================= */

jQuery(function($){


    // PARALLAX
/*
    $(document).scroll(function(){
        var nm = $("html").scrollTop();
        var nw = $("body").scrollTop();
        var n = (nm > nw ? nm : nw);

        $('#element').css({
            'webkitTransform' : 'translate3d(0, ' + n + 'px, 0)',
            'MozTransform'    : 'translate3d(0, ' + n + 'px, 0)',
            'msTransform'     : 'translateY('     + n + 'px)',
            'OTransform'      : 'translate3d(0, ' + n + 'px, 0)',
            'transform'       : 'translate3d(0, ' + n + 'px, 0)',
        });

        // if transform3d isn't available, use top over background-position
        //$('#element').css('top', Math.ceil(n/2) + 'px');

    });    
*/



    /* ====== Twitter API Call ============================================= 
        Note: Script Automatically adds <li> before and after template. Don't forget to setup Auth info in /twitter/index.php */
    /*
    $('#tweets-loading').tweet({       
        modpath: '/path/to/twitter/', // only needed if twitter folder is not in root
        username: 'jackrabbits',
        count: 1,
		template: '<p>{text}</p><p class="tweetlink">{time}</p>' 
	});
    */
	_menuLine();
	_mobileMenu();
	_portfolioMobileClick();
	_hoverSpanClick();
	_normalTabSelect();
	 _portfolioFilter();
});

function _menuLine(){
	var $el, leftPos, newWidth,
        $mainNav = $("#main-nav > ul");
    
    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");
    
    $magicLine
        .width($(".current_page_item").width())
        .css("left", $(".current_page_item").position().left+10)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
        
    $("#main-nav > ul > li a").hover(function() {
        $el = $(this);
        leftPos = $el.parent().position().left+10;
		console.log(leftPos);
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });
}


function _mobileMenu(){
	$('#toggle_menu_btn').click(function(){
		$(this).toggleClass('active')
		$('#mobile-menu-wrapper').slideToggle('fast');
		$('.header-wrapper').toggleClass('active-mobile-menu');
	});
}

function _portfolioMobileClick(){
	$('.portfolio-items > li').each(function(){
		$('span',this).click(function(e){
			e.preventDefault();
			if( $(window).innerWidth() > 767 ){
				window.location.href = $(this).data('link'); 
			} else {
				if( $(this).hasClass('active') ){
					window.location.href = $(this).data('link');
				}else{
					$(this).addClass('active');
				}
			}
		});
	});
}

function _hoverSpanClick(){
	$('span.hover-span').click(function(){
		window.location.href = $(this).data('link');
	});
}

function _normalTabSelect(){
	$('.tab-select-normal').each(function(){
		$('.dropdown',this).click(function(){
			$(this).parent().toggleClass('active');
		});
		
		var tabText = $('h5',this);
		$('ul li a.filter',this).click(function(e){
			e.preventDefault();
			$(this).closest('.tab-select-normal').removeClass('active');
			var currentText = $(this).text();
			var mainContainer = $(this).closest('.tab-select-normal');
			var textContainer = $('.dropdown h5',mainContainer);
			textContainer.html(currentText);
		});
	});
}

function _portfolioFilter(){
	$('#portfolio-all-items ul').mixItUp();
}

$(window).resize(function(){
	if( $(window).innerWidth() > 767 ){
		$("#mobile-menu-wrapper").removeAttr("style");
		$('.header-wrapper').removeClass('active-mobile-menu');
		$('#toggle_menu_btn').removeClass('active');
	}
});