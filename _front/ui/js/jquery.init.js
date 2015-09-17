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
	_fwSlider();
	_mobileMenu();
	_mobilePortfoilo();
	_portfolioMobileClick();
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


function _fwSlider(){
	$('#fw-slider').slick({
	  dots: true,
	  infinite: false,
	  arrows:false,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	});
}

function _mobileMenu(){
	$('#toggle_menu_btn').click(function(){
		$(this).toggleClass('active')
		$('#mobile-menu-wrapper').slideToggle('fast');
		$('.header-wrapper').toggleClass('active-mobile-menu');
	});
}

function _mobilePortfoilo(){
	if( $(window).innerWidth() > 767 ){
		$('#portfolio-items').removeClass('mobile-portfolio');
	} else {
		$('#portfolio-items').addClass('mobile-portfolio');
	}
}

function _portfolioMobileClick(){
	$('.portfolio-items-mobile > li').each(function(){
		$('span',this).click(function(e){
			e.preventDefault();
			if( $(this).hasClass('active') ){
				window.location.href = $(this).data('link');
			}else{
				$(this).addClass('active');
			}
		});
	});
}

$(window).resize(function(){
	if( $(window).innerWidth() > 767 ){
		$("#mobile-menu-wrapper").removeAttr("style");
		$('.header-wrapper').removeClass('active-mobile-menu');
		$('#toggle_menu_btn').removeClass('active');
	}
});