jQuery(function() {

	jQuery('header').height(jQuery(window).height());

	//SVG Fallback
	if(!Modernizr.svg) {
		jQuery("img[src*='svg']").attr("src", function() {
			return jQuery(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	jQuery("form").submit(function() { //Change
		var th = jQuery(this);
		jQuery.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		jQuery.browserSelector();
		if(jQuery("html").hasClass("chrome")) {
			jQuery.smoothScroll();
		}
	} catch(err) {

	};

	jQuery("img, a").on("dragstart", function(event) { event.preventDefault(); });


	jQuery( '#slider-pro' ).sliderPro({
			width: '100%',
			height: 600,
			arrows: true,
			buttons: false,
			thumbnail: false,
			pagination: true,
			waitForLayers: true,			
			autoplay: false,
			autoScaleLayers: false,
			breakpoints: {
				500: {
					thumbnailWidth: 120,
					thumbnailHeight: 50
				}
			}
		});			

// particlesJS Json config http://www.jqueryrain.com/?BwjN6Dnf
particlesJS('particles-js',		
{
	"particles": {
		"number": {
			"value": 60,
			"density": {
				"enable": true,
				"value_area": 800
			}
		},
		"color": {
			"value": "#fff"
		},
		"shape": {
			"type": "circle",
			"stroke": {
				"width": 0,
				"color": "#000000"
			},
			"polygon": {
				"nb_sides": 5
			},
			"image": {
				"src": "img/github.svg",
				"width": 100,
				"height": 100
			}
		},
		"opacity": {
			"value": 0.5,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
		},
		"size": {
			"value": 3,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 40,
				"size_min": 0.1,
				"sync": false
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 150,
			"color": "#fff",
			"opacity": 0.4,
			"width": 1
		},
		"move": {
			"enable": true,
			"speed": 4,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 1200
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": false,
				"mode": "repulse"
			},
			"onclick": {
				"enable": false,
				"mode": "push"
			},
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 400,
				"line_linked": {
					"opacity": 1
				}
			},
			"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			},
			"repulse": {
				"distance": 200,
				"duration": 0.4
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
	"retina_detect": true
}
);
	jQuery('.arrow').click(function() {		
		jQuery('body, html').animate({scrollTop: jQuery(window).height()}, 1000);
	});

	addClass();
	tabs();
	dotNav('header nav');

	jQuery('#feedback textarea,#feedback input').on('focus',function(){
		jQuery(this).prev().css('margin-top','-22px');
	}).on('focusout',function(){
		if (!jQuery(this).val()) {
			jQuery(this).prev().css('margin-top','10px');
		};
	});

	// smoof-scroll
	var navigation_links = jQuery("nav a");
	navigation_links.click( function(event) {
		event.preventDefault();
		jQuery.scrollTo(
			jQuery(this).attr("href"),
			{
				duration: 600,
				offset: { 'left':0, 'top':-0.05*jQuery(window).height() }
			}
		);
	});		
	jQuery('section').waypoint({
		handler: function(event, direction) {
			var active_section = jQuery(this);			
			if (direction === "up") active_section = active_section.prev();
			var active_link = jQuery('nav a[href="#' + active_section.attr("id") + '"]');
			navigation_links.removeClass("active_nav");
			active_link.addClass("active_nav");
		},
		offset: '5%'
	});


	jQuery('#infografika').waypoint({	
		handler: function(event, direction){
			if (direction === "down") {
				jQuery('.first-sirkl').circleProgress({				
					fill: {color: '#1682EF'}				
				}).on('circle-animation-progress', function(event, progress, stepValue) {
					jQuery(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+'%');
				});
			};
		},
		offset: '100%'
	});

	$('.map.single').each(function(){
	    var container = this;
	    var latlng = new google.maps.LatLng(
	        parseFloat($(container).data('lat')),
	        parseFloat($(container).data('lng'))
	    );
	    var mapOptions = {
	        zoom: parseInt($(container).data('zoom')),
	        center: latlng,
	        zoomControl: true,
	        mapTypeControl: false,
	        streetViewControl: false,
	        scrollwheel: true,     
	        mapTypeId: google.maps.MapTypeId.ROADMAP,        	
		    styles: [{'featureType':'all',
		    		  'elementType':'all',
		    		  'stylers':[{'saturation':-100},
		    		  			 {'gamma':1.5}]
		    }]      
	    };
	    var map = new google.maps.Map(container, mapOptions);

	    var marker = new google.maps.Marker({
	        position: latlng,
	        map: map,
	        icon: $(container).data('marker')
	    });
	});
});
function addClass(){
	var count = 0;
	setInterval(function(){	
		if (count < 4) {
			jQuery('.arrow i:eq('+ (count++) +')').addClass('activcolor').prev().removeClass('activcolor');			
		}else{
			jQuery('.arrow i').last().removeClass('activcolor');
			count = 0;
		}		
	}, 200);
};

function dotNav(el){	
	jQuery(el).clone().appendTo('body #dot-nav');
	jQuery('#dot-nav .sub-menu').remove();
	var main = jQuery('body #dot-nav'),
		elLenght = main.find('li').length;

		for(var i = 0; i < elLenght; i++){
			main.find('li').eq(i).find('a').text('');
		}
}

function tabs(){
	var but = jQuery('.uslugi li'),
		tabsCont = jQuery('.tab_container .tab_item'),
		img	 = jQuery('.img-wrap img');

	but.on('click',function(){
		but.removeClass('activ_ser');
		jQuery(this).addClass('activ_ser');
		tabsCont.css('display','none');
		jQuery('.'+jQuery(this).attr('data-tabs')).fadeIn('fast');

		img.addClass('fadeInRight');

		jQuery('.phase').addClass('fadeInUp');
		
	});
}
