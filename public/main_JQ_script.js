$(document).ready(function () {
    $('.headerList li').eq(2).bind('click', function () {
        if ($('.login').css('display') == 'none') {
            $('.login').slideDown("slow");
        } else {
            $('.login').slideUp("slow");
        };
    });


    $('.headerList li').eq(3).bind('click', function () {
        if ($('.registration').css('display') == 'none') {
            $('.registration').slideDown("slow");
        } else {
            $('.registration').slideUp("slow");
        };

    });
    $(document).bind('click', function (event) {
        if (!$(event.target).hasClass("login") && !$(event.target).hasClass("log_in") && !$(event.target).parents('div').hasClass("login")) {
            if ($('.login').css('display') == 'block') {
                $('.login').slideUp("slow");
            }
        }
    });

    $(document).bind('click', function (event) {
        if (!$(event.target).hasClass("registration") && !$(event.target).hasClass("sign_in") && !$(event.target).parents('div').hasClass("registration")) {
            if ($('.registration').css('display') == 'block') {
                $('.registration').slideUp("slow");
            }
        }
    });


    $('.headerList li').eq(1).bind('click', function () {
        if ($('.search').css('display') == 'none') {
            $('.search').slideDown("slow");
        } else {
            $('.search').slideUp("slow");
        };
    });


    $(document).bind('click', function (event) {
        if (!$(event.target).hasClass("search") && !$(event.target).hasClass("look_for") && !$(event.target).parents('div').hasClass("search")) {
            if ($('.search').css('display') == 'block') {
                $('.search').slideUp("slow");
            }
        }
    });








})
