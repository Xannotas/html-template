$('document').ready(function(){
    $('.header-slider, .news-slider').slick({
        infinite: false,
        prevArrow: '<button type="button" class="slider__arrow slider__arrow--prev"><</button>',
        nextArrow: '<button type="button" class="slider__arrow slider__arrow--next">></button>'
    });
    
    $('.header-bar__menu-btn').click(function(){
      $('.header-bar__menu').slideToggle()
    })
});