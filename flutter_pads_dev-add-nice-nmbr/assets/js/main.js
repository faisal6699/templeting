(function ($) {
    "use strict";


    jQuery(document).ready(function ($) {


        $(document).ready(function () {
            $('#nav').onePageNav();
        });








        $(".pool__img-slider").owlCarousel({
            items: 1,
            nav: true,
            dot: true,
            loop: true,
            margin: 20,
            autoplay: false,
            navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });

        $(".testimonial__active").owlCarousel({
            items: 1,
            nav: true,
            dot: false,
            loop: true,
            margin: 20,
            autoplay: false,
            autoplayTimeout: 3000,
            navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });









        function toggleHeart(heartId) {
            var heartIcon = document.getElementById(heartId);
            heartIcon.classList.toggle('clicked');
        }





        $(document).ready(function () {
            $('.minus').click(function () {
                var $input = $(this).parent().find('input');
                var count = parseInt($input.val()) - 1;
                count = count < 1 ? 1 : count;
                $input.val(count);
                $input.change();
                return false;
            });
            $('.plus').click(function () {
                var $input = $(this).parent().find('input');
                $input.val(parseInt($input.val()) + 1);
                $input.change();
                return false;
            });
        });





        $(document).ready(function () {
            $('select').niceSelect();
        });




        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            if (scroll < 245) {
                $(".header").removeClass("scroll-header");
            } else {
                $(".header").addClass("scroll-header");
            }
        });





        $('.quantity-button').off('click').on('click', function () {

            if ($(this).hasClass('quantity-add')) {
                var addValue = parseInt($(this).parent().find('input').val()) + 1;
                $(this).parent().find('input').val(addValue).trigger('change');
            }

            if ($(this).hasClass('quantity-remove')) {
                var removeValue = parseInt($(this).parent().find('input').val()) - 1;
                if (removeValue == 0) {
                    removeValue = 1;
                }
                $(this).parent().find('input').val(removeValue).trigger('change');
            }

        });


        $('.quantity input').off('change').on('change', function () {
            console.log($(this).val());
        });



        $('input[type="number"]').niceNumber({

            // auto resize the number input
            autoSize: true,

            // the number of extra character
            autoSizeBuffer: 1,

            // custom button text
            buttonDecrement: '-',
            buttonIncrement: "+",

            // 'around', 'left', or 'right'
            buttonPosition: 'around'

        });

















    }); //---document-ready-----






}(jQuery));
