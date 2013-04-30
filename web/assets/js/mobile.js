/*----------------------------------------------------------------------------------------------------------------------
         MOBILE SLIDE-MENU
----------------------------------------------------------------------------------------------------------------------*/
jQuery(document).ready(function(){
	jQuery('#mobile-menu-btn').on('click', showMenu);
	jQuery('#mobile-search-btn').on('click', showSearch);
});

function showMenu(event){ 
	if(jQuery('#page-wrap').hasClass('page-inactive')){
		event.preventDefault();
		event.stopPropagation();
		jQuery('#mobile-menu-btn').addClass('menu-active');
		jQuery('#page-wrap').removeClass('page-inactive').addClass('page-active');
		jQuery('body').on('click', '#page-wrap > :not(#main-nav)', hideMenu);
		jQuery('body').off('click', '#mobile-menu-btn');
	}
}

function hideMenu(event){
	if (jQuery('#page-wrap').hasClass('page-active')){
		var tar = event.target;
		if(jQuery(tar).parents('#mobile-wrap').length > 0){
		}else{
			event.preventDefault();
			jQuery('#mobile-menu-btn').removeClass('menu-active');
			jQuery('#page-wrap').removeClass('page-active').addClass('page-inactive');
			jQuery('body').off('click', '#page-wrap > :not(#main-nav)');
			jQuery('body').on('click', '#mobile-menu-btn', showMenu);
		}
	}
}


function showSearch(event){ 
	if(jQuery('#search-wrapper').hasClass('search-inactive')){
		event.preventDefault();
		event.stopPropagation();
		jQuery('#mobile-search-btn').addClass('menu-active');
		jQuery('#search-wrapper').removeClass('search-inactive').addClass('search-active');
		jQuery('body').on('click', '#page-wrap > :not(#search-wrapper)', hideSearch);
		jQuery('body').off('click', '#search-menu-btn');
	}
}

function hideSearch(event){
	if (jQuery('#search-wrapper').hasClass('search-active')){
		var tar = event.target;
		if(jQuery(tar).parents('#search-wrapper').length > 0){
		}else{
			event.preventDefault();
			jQuery('#mobile-search-btn').removeClass('menu-active');
			jQuery('#search-wrapper').removeClass('search-active').addClass('search-inactive');
			jQuery('body').off('click', '#page-wrap > :not(#search-wrapper)');
			jQuery('body').on('click', '#search-menu-btn', showSearch);
		}
	}
}




/*----------------------------------------------------------------------------------------------------------------------
         MOBILE ACCORDION MENU ITEM
----------------------------------------------------------------------------------------------------------------------*/

jQuery(document).ready(function() {
	
		var slideAmount = 0;
		var clickedLink;
		$('body').on('click', 'li.parent > a', menuToggle);

		$('body').on('click','.mobile-nav-back', function(event){
			slideAmount = slideAmount + 240;
			$('#main-nav').css({ 'margin-left' : slideAmount });
		});
	
	
	function menuToggle(event){
	
		if($('body').css('vertical-align') === "top") {
			event.preventDefault();

			slideAmount = slideAmount - 240;
			$('#main-nav').css({ 'margin-left' : slideAmount });
			$(this).parent('li').parent('ul').children('li.parent').children('ul').css({ 'display' : 'none' });
			$(this).siblings('ul').css({ 'display' : 'block' })
			if(!$(this).siblings('ul').find('.mobile-child-nav').length){
				clickedLink = $(this).text();
				$(this).siblings('ul').prepend('<li class="mobile-child-nav"><a class="mobile-nav-back" href="#">Back</a>' + clickedLink + '</li>');
			}
			$('body').off('click', 'li.parent > a');
			setTimeout(function() { $('body').on('click', 'li.parent > a', menuToggle); }, 250);
		}
	}
});



/*----------------------------------------------------------------------------------------------------------------------
         RETINA IMAGING
----------------------------------------------------------------------------------------------------------------------*/

function highdpi_init() {
	if(jQuery('.retina').css('font-size') == "1px") {
		var els = jQuery(".retina").get();
		for(var i = 0; i < els.length; i++) {
			var src = els[i].src
			src = src.replace(".png", "@2x.png");
			els[i].src = src;
		}
	}
}

jQuery(document).ready(function() {
	highdpi_init();
});


/*----------------------------------------------------------------------------------------------------------------------
         IOS ORIENTATION CHANGE BUGFIX
----------------------------------------------------------------------------------------------------------------------*/

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.

(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}
	
    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );

*/
