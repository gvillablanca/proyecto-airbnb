$(document).ready(function() {
	$('select').material_select();
	$('.carousel').carousel();
	$('.carousel.carousel-slider').carousel({full_width: true});
	$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
	});

  $('.button-collapse').sideNav({
    menuWidth: 200, 
    edge: 'right', 
    closeOnClick: true, 
    draggable: true
  });
	
});

 var slideCount = document.querySelectorAll('.slider .slide-item').length;
  var slideWidth = document.querySelectorAll('.slider-outer')[0].offsetWidth;
  var slideHeight = document.querySelectorAll('.slider-outer')[0].offsetHeight;

  var sliderUlWidth = slideCount * slideWidth;
  document.querySelectorAll('.slider')[0].style.cssText = 'width:' + sliderUlWidth + 'px';

  for (var i = 0; i < slideCount; i++) {
    document.querySelectorAll('.slide-item')[i].style.cssText = 'width:' + slideWidth + 'px;height:' + slideHeight +'px';
  }

  setInterval(function() {
    moveRight();
  }, 3000);
  var counter = 1;

  function moveRight() {
    var slideNum = counter++;
      if (slideNum < slideCount) {
        var transformSize = slideWidth * slideNum;
        document.querySelectorAll('.slider')[0].style.cssText = 
          'width:' + sliderUlWidth + 'px; -webkit-transition:all 800ms ease; -webkit-transform:translate3d(-' + transformSize + 'px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(-' + transformSize + 'px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(-' + transformSize + 'px, 0px, 0px);transition:all 800ms ease; transform:translate3d(-' + transformSize + 'px, 0px, 0px)';

      } else {
        counter = 1;
        document.querySelectorAll('.slider')[0].style.cssText = 'width:' + sliderUlWidth + 'px;-webkit-transition:all 800ms ease; -webkit-transform:translate3d(0px, 0px, 0px);-moz-transition:all 800ms ease; -moz-transform:translate3d(0px, 0px, 0px);-o-transition:all 800ms ease; -o-transform:translate3d(0px, 0px, 0px);transition:all 800ms ease; transform:translate3d(0px, 0px, 0px)';
      }

  }

//carrusel pequeño

$('#slider .item').each(function(i){
  var $this = $(this),
      width = $this.width(),
      left = width * i,
      color = 25 * i;
  $this.css({ left: left })
  .find('.inset').css({ backgroundColor: 'white' });
});
$('.trigger').on('click',function(){
  var $this = $(this),
      width = $('.item').width() * 1,
      speed = 500;
  if ( $this.hasClass('first') ) {
    $('.frame').animate({ scrollLeft: 0 },speed * 3);
  } else if ( $this.hasClass('last') ) {
    $('.frame').animate({ scrollLeft: $('.frame')[0].scrollWidth },speed * 3);
  } else if ( $this.hasClass('prev') ) {
    $('.frame').animate({ scrollLeft: '-=' + width },speed);
  } else if ( $this.hasClass('next') ) {
    $('.frame').animate({ scrollLeft: '+=' + width },speed);
  }
});