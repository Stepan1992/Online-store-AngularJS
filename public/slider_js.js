//$(document).ready(function () {
//
//    mainFunc();
//
//    function mainFunc() {
//        var count = 0;
//        var boxes = $('.listBox').length;
//
//        function changeSlaids() {
//
//            if (count == -6) {
//                count = 0;
//            } else {
//                count--;
//            }
//
//            $('.slaider').animate({
//                marginLeft: count + '00%'
//            }, 1000);
//
//            if (count == -7) {
//                count = 1;
//            }
//            changeSepia();
//            setTimeout(changeMainSepia, 1200);
//
//        };
//
//        setTimeout(changeMainSepia, 1200);
//
//        function changeMainSepia() {
//            for (var num = 0; num < boxes; num++) {
//
//                if ($('.box').eq(num).offset().left == '0') {
//                    current = $('.box').eq(num);
//                    current.css('filter', 'sepia(0%)');
//                } else if ($('.box').eq(num).offset().left != '0') {
//                    $('.box').eq(num).css('filter', 'sepia(100%)');
//                }
//            }
//            setTimeout(changeMainSepia, 1200);
//        };
//
//        function changeSepia() {
//            for (var j = 0; j < boxes; j++) {
//                var preview = $('.listBox').eq(j);
//                if ($('.listBox').eq(j).attr('data-number') == count) {
//                    preview.css('filter', 'sepia(0%)');
//                    preview.click(function () {
//                        $(this).css('filter', 'sepia(0%)')
//                    });
//                } else {
//                    preview.css('filter', 'sepia(100%)');
//                }
//            }
//        };
//
//        var interval = function () {
//            var time = setInterval(changeSlaids, 4000);
//            $('.next').click(function () {
//                clearInterval(time);
//            });
//
//            $('.previous').click(function () {
//                clearInterval(time);
//            });
//            $('.listBox').click(function () {
//                clearInterval(time);
//            });
//            changeSepia();
//            setTimeout(changeMainSepia, 1200);
//
//        }
//
//        interval();
//
//        $('.next').click(function () {
//            setTimeout(changeMainSepia, 1200);
//
//            if (count == -6) {
//                count = 0;
//            } else {
//
//                count--;
//            }
//
//            $('.slaider').animate({
//                marginLeft: count + '00%'
//            }, 1000);
//
//            if (count == -7) {
//                count = 1;
//            }
//            interval();
//
//        });
//
//        $('.previous').click(function () {
//
//            setTimeout(changeMainSepia, 1200);
//
//            if (count == 0) {
//                count = -7;
//            }
//            count++;
//            $('.slaider').animate({
//                marginLeft: count + '00%'
//            }, 1000);
//            interval();
//
//        });
//
//        $('.next').hover(function () {
//                $('.next').css('opacity', '0.4');
//            },
//            function () {
//                $('.next').css('opacity', '1');
//            }
//        );
//
//        $('.previous').hover(function () {
//                $('.previous').css('opacity', '0.4');
//            },
//            function () {
//                $('.previous').css('opacity', '1');
//            }
//        );
//
//        $('.listBox').hover(function () {
//            if ($(this).attr('data-number') != count) {
//                $(this).css('filter', 'sepia(0%)');
//            }
//        }, function () {
//            if ($(this).attr('data-number') != count) {
//                $(this).css('filter', 'sepia(100%)');
//            }
//        });
//
//        $('.listBox').click(function () {
//
//            setTimeout(changeMainSepia, 1200);
//
//            for (var i = 0; i < boxes; i++) {
//                count = $(this).data('number');
//                $('.slaider').animate({
//                    marginLeft: count + '00%'
//                }, 1000);
//                interval();
//                break;
//            }
//        });
//    };
//
//});
