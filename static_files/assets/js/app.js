(function() {
    'use strict';

    //menu fix mobile

    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // poppup

    $('.popup-frame').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    $('.popup-img').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });

    $('.popup').magnificPopup({
        type: 'inline',
        preloader: false,
        closeOnContentClick: false,
        fixedContentPos: true,
        mainClass: 'mfp-zoom-in',

        callbacks: {
            open: function() {

            },
        }
    });

    //

    svg4everybody();


    //table

    if ($('table.responsive').length > 0) {
        $('table.responsive').ngResponsiveTables();
    }

    //select styler

    $('select').styler();

    $('.sign-input_select').on('click', function() {
        $(this).find('.jq-selectbox').addClass('dropdown opened')
        $(this).find('.jq-selectbox__dropdown').fadeIn(0)
    })

    //datepicker

    // $( ".datepicker" ).datepicker();

    // $("#weeklyDatePicker").datetimepicker({
    //   format: 'DD-MM-YYYY'
    // });

    // //Get the value of Start and End of Week
    // $('#weeklyDatePicker').on('dp.change', function (e) {
    //     var value = $("#weeklyDatePicker").val();
    //     var firstDate = moment(value, "DD-MM-YYYY").day(0).format("DD-MM-YYYY");
    //     var lastDate =  moment(value, "DD-MM-YYYY").day(6).format("DD-MM-YYYY");
    //     $("#weeklyDatePicker").val(firstDate + " - " + lastDate);
    // });

    //tabs

    $('.tabs__wrap').each(function() {
        $(this).find('.tab').each(function(i) {
            $(this).parents('.tabs__wrap').find('.tab_content').children().not(':first').hide();
            $(this).click(function() {
                $(this).addClass('active').siblings().removeClass('active')
                $(this).parents('.tabs__wrap').find('.tab_content').children().eq(i).fadeIn(0).siblings('.tab_item').hide();

                // $(".nicescroll-box").getNiceScroll().resize();
            });
        });
    });

    //tabs
    $('[data-tabs-btn]').click(function() {
        let tabsName = $(this).parent().attr('data-tabs-btns');
        let tabNo = $(this).attr('data-tabs-btn');
        let tabsWrapper = $('[data-tabs-wrapper=' + tabsName + ']');

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        tabsWrapper.children().each(function(i, item) {
            $(item).hide();
            if ($(item).attr('data-tabs-item') === tabNo) {
                $(item).show();
            }
        });
    });

    function tabsInitialization() {
        let btns = $('[data-tabs-btns]');
        let wrapper = $('[data-tabs-wrapper]');

        $(wrapper).children().not(function() {
            if ($(this).attr('data-tabs-item') === '1') {
                return true;
            }
        }).hide();

        $(btns).children().not(function() {
            if ($(this).attr('data-tabs-btn') === '1') {
                return false;
            } else {
                return true;
            }
        }).addClass('active');
    }

    tabsInitialization();

    //accordion

    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.accordion__head');
        // Evento
        links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('active');

        if ($('.nicescroll-box').length !== 0) {
            setTimeout(() => {
                $(".nicescroll-box").getNiceScroll().resize();
            }, 1000);
        }

        if (!e.data.multiple) {
            $el.find('.accordion__body').not($next).slideUp().parent().removeClass('active');
        };
    }

    var accordion = new Accordion($('.accordion'), false);

    //nicescroll

    $(".nicescroll-box").niceScroll(".wrap", {
        cursorcolor: "#092abb",
        cursorwidth: "4px",
        cursorborder: "0px solid #fff",
        zindex: 20,
        emulatetouch: true,
        autohidemode: false,
        cursorborderradius: "0px",
        railalign: 'right',
    });


    // aos

    // AOS.init(
    //   {
    //     // Global settings
    //     disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    //     startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    //     initClassName: 'aos-init', // class applied after initialization
    //     animatedClassName: 'aos-animate', // class applied on animation
    //     useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    //     // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
    //     offset: 0, // offset (in px) from the original trigger point
    //     delay: 0, // values from 0 to 3000, with step 50ms
    //     duration: 700, // values from 0 to 3000, with step 50ms
    //     easing: 'ease-in-out', // default easing for AOS animations
    //     once: false, // whether animation should happen only once - while scrolling down
    //     mirror: false, // whether elements should animate out while scrolling past them
    //     anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    //   }
    // );

    // setTimeout(AOS.refreshHard, 1000);

    //clipboard

    var affil1 = new Clipboard('.copy-text');

    function affiliatelink(id) {
        id.on('success', function(e) {
            // swal({
            //   title: "Your referral link copied!",
            //   text: "You can paste text that has been copied by pressing Ctrl + V. The text that was copied last will be pasted.",
            //   type: "success",
            //   showCancelButton: false,
            //   confirmButtonClass: "btn-success",
            //   confirmButtonText: "OK!",
            //   closeOnConfirm: false,
            //   closeOnCancel: false
            // });

            // Lobibox.notify('success', {
            //   title: true,
            //   size: 'normal',
            //   icon: false,
            //   sound: false,
            //   iconSource: "bootstrap",
            //   msg: 'Your referral link copied!'
            // });

            $('.copy-success').fadeIn();
            $('.copy-success').delay(3000).fadeOut();
        });
    }

    affiliatelink(affil1);

    $('.tgg-arrow').on('click', function(){
        $(this).toggleClass('active').siblings('.tgg-content').slideToggle();
    })

    // sliders

    var refsText = new Swiper('.vip-slider .swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 15,
    //   effect: 'fade',
    //   fadeEffect: {
    //     crossFade: true
    //   },
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.vip-slider .swiper-button-next',
        prevEl: '.vip-slider .swiper-button-prev',
      },
      pagination: {
        el: '.vip-slider .swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
          767: {
            slidesPerView: 3,
          },    
          520: {
            slidesPerView: 2,
          }
      }
    });

    //parallax

    // if($('#docs-scene').length !== 0){
    //   var scene = document.getElementById('docs-scene');
    //   var parallaxInstance = new Parallax(scene);
    // }


    // setTimeout(() => {
    //   $('.marquee').marquee({
    //     //speed in milliseconds of the marquee
    //     duration: 8000,
    //     //gap in pixels between the tickers
    //     gap: 0,
    //     //time in milliseconds before the marquee will start animating
    //     delayBeforeStart: 0,
    //     //'left' or 'right'
    //     direction: 'left',
    //     //true or false - should the marquee be duplicated to show an effect of continues flow
    //     duplicated: true
    //   });
    // }, 1000);

    //cabinet-Settings

    // $('.cabinet-table__settings-btn').on('click', function(e){
    //   e.preventDefault();



    //   $(this).siblings('.cabinet-table__settings-hide').fadeIn(300);
    //   $(this).parent().addClass('active');
    //   let trueH = ($(document).outerHeight(true) - $(this).siblings('.cabinet-table__settings-hide').offset().top - $(this).siblings('.cabinet-table__settings-hide').outerHeight(true));

    //   if(trueH <= 0){
    //     $(this).siblings('.cabinet-table__settings-hide').addClass('top');
    //   }
    // });

    // $(document).mouseup(function (e){ 
    //   var block = $(".cabinet-table__settings.active .cabinet-table__settings-hide"); 
    //   if (!block.is(e.target) 
    //       && block.has(e.target).length === 0) { 
    //       block.hide(); 

    //       block.parent().removeClass('active');

    //       if( block.hasClass('top')){
    //         block.removeClass('top');
    //       }
    //   }
    // });


    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active').closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    //
    $('.image-block__btn').click(function() {
        $(this).toggleClass('active');
        $(this).siblings('.image-block__img').toggleClass('active');
    });

    $('.drop-down-field').click(function() {
        $(this).toggleClass('active');
        $(this).siblings('.drop-down-list').toggleClass('active');
    });

    $('.drop-down__label').click(function() {
        var list = $(this).parent('.drop-down-list');
        var data = $(this).find('.label-price').text();
        var field = $(this).parent().siblings('.drop-down-field');
        $(list).removeClass('active');
        $(field).text(data);
    });

})();