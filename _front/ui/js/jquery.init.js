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
	_teamPopup();
	_mapNav();
	_videoPopup();
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

function _teamPopup(){
	$(".members-group").colorbox({
		inline:true, 
		rel:'members-group',
		href:$(this).attr('href'),
		scrolling: false,
		opacity:1,
		width:100+"%",
		transition:'none',
		returnFocus:false,
		onComplete:function() {
			$('#cboxPrevious').text('').addClass('active');
			$('#cboxNext').text('').addClass('active');
			$('#cboxClose').text('').addClass('active');
			
			var boxId = $(this).attr('href');
			var currentNumber = $(this).attr('data-id');
			$('.team-main-wrapper',boxId).addClass('active');
			_teamArr(currentNumber,boxId);
		  },
		  onCleanup: function() {
			  //$("#colorbox").unwrap("<div id='colorbox_totalWrapper' />")
		  },onLoad:function(){
				$('.team-main-wrapper').removeClass('active');
		  }
	});
}



function _teamArr(currentNumber,boxId){
	var currentNumber = currentNumber;
	var membersLength = teamArr.length;
	var x = parseInt(currentNumber); //get current array index currentID-1;	
	//create html
	//alert(boxId);	
	var listItems	=	'<ul>';	
	for(i=1; i <= 7; i++){
		if( membersLength <= x ){
			x = 0;
		}
		var y = parseInt(x+1);
		//console.log(teamArr[x].acf_member_name);
		listItems += '<li style=\'background-image:url('+teamArr[x].acf_member_sm_img+')\'><span><a href=\'#member'+y+'\' class="members-group" data-id=\''+y+'\' onClick="_teamPopup()"><h4>'+teamArr[x].acf_member_name+'</h4></a></span></li>';
		x++;
	}
	listItems += '</ul>';
	//$('.bottom-carousel')
	$(boxId+' .bottom-carousel').append(listItems);
	
}

function _mapNav(){
	$('.map-nav li a').each(function(){
		$(this).hover(function(){
				var getClass = $(this).attr('data-map');
				$('.'+getClass).addClass('active');
			},function(){
				$('.map').removeClass('active');
			}
		);
	});
	
	$('.map-nav li a').click(function(e){
		e.preventDefault();
		$('.map-nav li a').removeClass('active');
		$(this).addClass('active');
		$('.map').removeClass('mob-active');
		var getClass = $(this).attr('data-map');
		$('.'+getClass).addClass('mob-active');
	});
}


function _videoPopup(){
	$(".video-popup").colorbox({
		inline:true, 
		width:95+"%",
		maxWidth:768+"px",
		scrolling: false,
		className: 'video-main-wrapper',
		onComplete:function() {
			$('#cboxClose').text('').addClass('active');
		  }		
	});
}

$(window).resize(function(){
	if( $(window).innerWidth() > 767 ){
		$("#mobile-menu-wrapper").removeAttr("style");
		$('.header-wrapper').removeClass('active-mobile-menu');
		$('#toggle_menu_btn').removeClass('active');
		$('.map').removeClass('mob-active');
	}
});