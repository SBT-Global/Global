jQuery(document).ready(function() {


    $.backstretch([
                    base_url + "/images/backgrounds/2.jpg"
	              , base_url + "/images/backgrounds/3.jpg"
	              , base_url + "/images/backgrounds/1.jpg"
	             ], {duration: 3000, fade: 750});


    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });

    $('.login-form').on('submit', function(e) {

    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});

    });


});
