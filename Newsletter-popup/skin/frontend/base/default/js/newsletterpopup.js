$vjp=jQuery.noConflict();

var VJPNewsSubscribers = {

    cookieLiveTime: 1,

    cookieName: 'vjp_newsletter',

    baseUrl: '',

    timeglow: 5000,	

    position: 'mc',

    setTimeglow: function(value)
    {
        this.timeglow = value * 1000;
    },

    setCookieLiveTime: function(value)
    {
        this.cookieLiveTime = value;
    },

    setCookieName: function(value)
    {
        this.cookieName = value;
    },

    setBaseUrl: function(url)
    {
        this.baseUrl = url;
    },

    setPosition: function(value)
    {
        this.position = value;
    },

    getBaseUrl: function(url)
    {
        return this.baseUrl;
    },
    createCookie: function() {
        var days = this.cookieLiveTime;
        var value = 1;
        var name = this.cookieName;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = escape(name)+"="+escape(value)+expires+"; path=/";
    },

    readCookie: function(name) {
        var name = this.cookieName;
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
        }
        return null;
    },

    boxClose: function()
    {
		$vjp('#nl_box_layer').animate({'opacity':1});
		$vjp('#nl_background_layer').fadeOut(this.timeglow);
        $vjp('#nl_box_layer').animate({'opacity':0},this.timeglow + 200).fadeOut(this.timeglow + 200);
        $vjp('#nl_background_layer').fadeOut(this.timeglow);
    },

    boxOpen: function()
    {
		$vjp('#nl_box_layer').animate({'opacity':0});
		$vjp('#nl_background_layer').fadeIn(this.timeglow);
        $vjp('#nl_box_layer').animate({'opacity':1},this.timeglow + 200).fadeIn(this.timeglow + 200);

    }
}

function apply_style(){

    var shadow = $vjp('#hidden_shadow').val();	
    if(shadow == 0){
    $vjp('#nl_background_layer').css('background', 'none');
    $vjp('#nl_background_layer').css('z-index', 0);
	}

    $vjp('#nl_background_layer').css('height', $vjp(document).height()+'px');
    $vjp('#nl_box_layer').addClass(VJPNewsSubscribers.position);

   var extras = parseInt($vjp('#nl_box_layer').css('border-width').replace('px','')) + parseInt($vjp('#nl_box_layer').css('padding').replace('px',''));

   if(VJPNewsSubscribers.position == 'bc' || VJPNewsSubscribers.position == 'bl' || VJPNewsSubscribers.position == 'br')
    $vjp('#nl_box_layer').css('top', (($vjp(window).height() - $vjp('#nl_box_layer').outerHeight( true )))+'px');

   if(VJPNewsSubscribers.position == 'tc' || VJPNewsSubscribers.position == 'mc' || VJPNewsSubscribers.position == 'bc')
    $vjp('#nl_box_layer').css('right', (($vjp(window).width() - $vjp('#nl_box_layer').outerWidth( true )) /2 )+'px');

   if(VJPNewsSubscribers.position == 'ml' || VJPNewsSubscribers.position == 'mc' || VJPNewsSubscribers.position == 'mr')
    $vjp('#nl_box_layer').css('top', (($vjp(window).height() - $vjp('#nl_box_layer').outerHeight( true )) / 2)+'px');

}

$vjp(function() {
    if (VJPNewsSubscribers.readCookie() != 1) {
        VJPNewsSubscribers.createCookie();
        VJPNewsSubscribers.boxOpen();
    }

    apply_style();
  	
    $vjp('#nl_submit').click(function(){
        var email = $vjp('#popup_newsletter').val();
        var fname = $vjp('#popup_fname').val();
        var lname = $vjp('#popup_lname').val();
        var close = $vjp('#hidden_close').val();	

        $vjp.post(VJPNewsSubscribers.getBaseUrl()+'newsletter/subscriber/newajax/', {'email':email, 'firstname':fname, 'lastname':lname}, function(resp) {
            var response = $vjp.parseJSON(resp);
            if (response['errorMsg']) {
                $vjp('#nl_box_subscribe_response_error').html(response['errorMsg']);
            } else {
                $vjp('#nl_box_subscribe_response_error').html('');
                $vjp('#nl_box_subscribe_response_success').html(response['successMsg']);
                $vjp('#nl_box_subscribe_form').css('display','none');
                $vjp('#nl_box_subscribe_response_success').css('display','block');
				if(close == 1)
				  setTimeout('VJPNewsSubscribers.boxClose()', 5000);
            }
		   apply_style();			
        });
    });
    $vjp('#nl_box_close').click(function(){
        VJPNewsSubscribers.boxClose();
    });
});

$vjp(window).resize(function(){
    apply_style();

});

