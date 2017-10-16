var mobileModeEnabled = false;

(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                mobileOptiMode(true);
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500, "swing", function(){
                    mobileOptiMode(false);
                    updateNavigator($(window).scrollTop());
                });
                return false;
            }
        }
    });

    $( '.scrollable' ).on( 'mousewheel DOMMouseScroll', function ( e ) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;

        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 50;
        e.preventDefault();
    });
}).call(this);

$(function() {
    Pace.on('done', function() {
        $("body").removeClass("stop-scrolling");
        setTimeout(function() {
            $("#loader").fadeOut();
        }, 500);
        loadImgAsync(".project-BG", "image-src");
    });

    $(window).scroll(function (event) {
        if(!mobileModeEnabled)
            updateNavigator($(window).scrollTop());
    });

    $(document).on("click",'.project', function()
    {
        loadproject($(this));
    })

    //close project view (both)
    $('#project-view .close-project-view').click(function()
    {
        $("#project-view").removeClass("active");
    })
    jQuery(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
            $("#project-view").removeClass("active");
        }
    });

    $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    autoplayHoverPause:true,
    autoplay: true,
    autoplayTimeout:3000,
    nav: true,
    navText: ["",""],
    mouseDrag : false,
    responsive:{
        0:{
            items:1,
            nav: false
        },
        768:{
            items:2
        },
        1024:{
            items:3,
        }
    }
})
});

function mobileOptiMode(state)
{
    mobileModeEnabled = state;
}

function updateNavigator(scroll)
{
    var height = $(window).height();
    var activePanel;

    if(scroll >= 0 && scroll <= .5*height)
    {
        activePanel = $(".node-headline");
    }
    else{
        if(scroll > height/2 && scroll <= (1.5*height))
            activePanel = $(".node-projects");
        else
            activePanel = $(".node-contact");
    }
    //add-remove active class
    if(!activePanel.hasClass("active"))
            activePanel.addClass("active");
    $(".node.active").not(activePanel).removeClass("active");

    //add-remove headline text
    var newHeadline = activePanel.data("headline");
    if(newHeadline === "")
    {
        $("#navigator-headline").removeClass("active");
    }
    else
    {
        if(!$("#navigator-headline").hasClass("active"))
            $("#navigator-headline").addClass("active");
        $("#navigator-headline").text(newHeadline);
    }
}

function loadImgAsync(selector, tag)
{
    $(selector).each(function() {
        var url = $(this).data(tag);
        $(this).css("background-image", "url("+ url +")");
    }, this);
}

function loadproject(el)
{
    var m_url = el.data("content");
    var container = $("#project-view")
    $("#project-view #project-container").text("");
    if(!container.hasClass("active"))
    {
        container.addClass("active");
    }
    $("#project-view #project-container").load(m_url);
}
