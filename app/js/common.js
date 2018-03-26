if (localStorage.name != "undefined"){$('input[name="name"]').val(localStorage.name);}
if (localStorage.email != "undefined"){$('input[type="email"]').val(localStorage.email);}
if (localStorage.phone != "undefined"){$('input[type="tel"]').val(localStorage.phone);}

$(function() {
  $("[name=send]").click(function (e) {
   var btn = $(this);
   var form = $(this).closest('form');

   $(":input.error").removeClass('error');
   $(".allert").remove();

   var error;
   var ref = btn.closest('form').find('[required]');

   $.get("http://ipinfo.io", function(response) {
    $('[name=city]').val(response.city + ', ' + response.country)
   }, "jsonp");

   var msg = btn.closest('form').find('input, textarea, select');
   var short_msg = btn.closest('form').find('[name=project_name], [name=admin_email], [name=form_subject], [name=city], [name=page_url], [name=user_agent], [type="text"], [type="email"], [type="tel"]');
   var msg = btn.closest('form').find('input, textarea, select');
   var send_btn = btn.closest('form').find('[name=send]');
   var send_adress = btn.closest('form').find('[name=send_adress]').val();
   var send_options = btn.closest('form').find('[name=campaign_token]');;
   var formType = btn.closest('form').find('[name=form_type]').val();
   var redirect = btn.closest('form').find('[name=redirect]').val();
   var goal = btn.closest('form').find('[name=goal]').val();
   var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';

   localStorage.name = form.find('input[name="name"]').val();
   localStorage.email = form.find('input[type="email"]').val();
   localStorage.phone = form.find('input[type="tel"]').val();


   $(ref).each(function() {
    if ($(this).val() == '') {
      var errorfield = $(this);
      $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span>' + alertImage + '</div>');
      error = 1;
      $(":input.error:first").focus();
      return;
    } else {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
      if ($(this).attr("type") == 'email') {
        if (!pattern.test($(this).val())) {
          $("[name=email]").val('');
          $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
      }
      var patterntel = /^()[- +()0-9]{9,18}/i;
      if ($(this).attr("type") == 'tel') {
        if (!patterntel.test($(this).val())) {
          $("[name=phone]").val('');
          $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите номер телефона в формате +3809999999</span>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
      }
    }
  });
   if (!(error == 1)) {
    $(send_btn).each(function() {
      $(this).attr('disabled', true);
    });
    // ADD SEND SCRIPT HERE
    alert('Отправленно!')
  }
  return false;
})
});

 // Smooth scroll to anchor

 $('.scroll').click(function(){
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 1000);
  return false;
});


//  INPUT TEL MASK

// jQuery(function($){
//  $("input[type='tel']").mask("+38 999-9999");
// });


// Scroll BAR

$(window).scroll(function() {
  // calculate the percentage the user has scrolled down the page
  var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

  $('.bar-long').css('width', scrollPercent +"%"  );

});


//YOUTUBE

$(function() {
  $(".youtube").each(function() {
    $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

    $(this).append($('<div/>', {'class': 'play'}));

    $(document).delegate('#'+this.id, 'click', function() {
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&rel=0&amp;showinfo=0";
      if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

      var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'class':  'youtube-video', 'height': $(this).height() })

      $(this).replaceWith(iframe);
    });
  });
});

$('.stop-video').click(function(){
	$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
});

//  UP BUTTON

$( document ).ready(function() {
  $('#scrollup img').mouseover( function(){
    $( this ).animate({opacity: 0.65},100);
  }).mouseout( function(){
    $( this ).animate({opacity: 1},100);
  });

  $(window).scroll(function(){
    if ( $(document).scrollTop() > 0 ) {
      $('#scrollup').fadeIn('slow');
    } else {
      $('#scrollup').fadeOut('slow');
    }
  });

  $('#scrollup').click(function() {
    $('body,html').animate({scrollTop:0},1000);
  });
});

// PREVENT SCROLLING

$('.md-trigger').click(function() {
  $("body").addClass('unscroll');
});

$('.md-close').click(function() {
  $("body").removeClass('unscroll');
});

$('.md-overlay').click(function() {
  $("body").removeClass('unscroll');
});

//Sliders

$('.slider').slick({
  slidesToShow: 1,
  dots: true,
  arrows: true,
  infinite: true,
  slidesToScroll: 1,
  fade: true,
  adaptiveHeight: true,
  customPaging : function(slider, i) {
    var thumb = $(slider.$slides[i]).data();
    return '<a class="number">' + (i+1) + '</a>';
  }
});

$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  $('.current').html(nextSlide+1);
});


$('.slider_01').slick({
  slidesToShow: 4,
  arrows: true,
  infinite: true,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true
      }
    },{
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true
      }
    },{
      breakpoint: 530,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false
      }
    }
  ]
});

// Perfect Pxel

// $('body').each(function() {
//   var body = $(this);
//   var img_url = $(this).data('img');
//   var img = new Image();
//   img.src = img_url;
//   img.onload = function(){
//     var ppbox = '<div id="pp" style="background: url('+img_url+') no-repeat 50% 0%;top:0;width:100%;position:absolute;z-index:1000000;opacity:0.5;height:'+img.height+'px"></div>';
//     var ppbtn = '<button onclick="myOff()" id="ppbtn" style="position:fixed;top:0;right:0;z-index:1000001">ON</button>'
//     body.append(ppbox);
//     body.append(ppbtn);
//   };
// });
// function myOff() {
//   var ppbtntext = $('#ppbtn').text();
//   if (ppbtntext == 'ON') {
//     $('#ppbtn').text('OFF');
//     $('#pp').css('display', 'none');
//   } else {
//     $('#ppbtn').text('ON');
//     $('#pp')        .css({
//       ' z-index' : '1000000',
//       display: 'block'
//     });

//   }
// }

// $('html').keydown(function(){
//   var ppbtntext = $('#ppbtn').text();
//   if (event.keyCode == 81) {
//     if (ppbtntext == 'ON') {
//       $('#ppbtn').text('OFF');
//       $('#pp').css('display', 'none');
//     } else {
//       $('#ppbtn').text('ON');
//       $('#pp')        .css({
//         ' z-index' : '1000000',
//         display: 'block'
//       });
//     }
//   }
// });
