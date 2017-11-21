var app = angular.module('app', ['ngRoute']);
app.controller('logCtrl', function ($scope, $timeout, $filter, $rootScope, $http) {

    $scope.err = false;
    $scope.unReg = false;
    $scope.access = false;
    $scope.regist = false;
    $scope.showHello = false;
    $scope.currentUserName = '';
    $scope.currentUserPass = '';
    $scope.template = /[0-9A-Za-z]/;
    $scope.errorMassage = false;
    $scope.sendUserName = function () {
        $rootScope.$broadcast('sendUserNameEvent', {
            userName: $scope.currentUserName
        });
    };
    $scope.sendUserPass = function () {
        $rootScope.$broadcast('sendUserPassEvent', {
            userPass: $scope.currentUserPass
        });
    };


    $scope.sendSearchReq = function () {
        $rootScope.$broadcast('sendSearchReqEvent', {
            search: $scope.search
        });
    };
    $scope.searchFunc = function () {
        $scope.sendSearchReq();
        window.scrollTo(0, 300);
    };

    $scope.alert = function () {
        $scope.regist = false;

    }
    $scope.formVisibleLog = {
        'display': 'block'
    };
    $scope.formVisibleReg = {
        'display': 'none'
    };

    $scope.userName = function () {
        return $filter('lowercase')($scope.userNameNonFiltered);
    }

    $scope.userPass = function () {
        return $filter('lowercase')($scope.userPassNonFiltered);
    }

    $scope.userNameReg = function () {
        return $filter('lowercase')($scope.userNameRegNonFiltered);
    }

    $scope.userPassReg = function () {
        return $filter('lowercase')($scope.userPassRegNonFiltered);
    }

    $scope.userEmailReg = function () {
        return $filter('lowercase')($scope.userEmailRegNonFiltered);
    }

    //


    $scope.mainFunc = function (error, error2) {

        $http.get('http://localhost:8000/login')
            .then(function successCallback(response) {
                $scope.data = response.data;
                for (var i = 0; i < $scope.data.length; i++) {
                    if ($scope.userName() == $scope.data[i].login && $scope.userPass() == $scope.data[i].password) {

                        $scope.currentUserName = $scope.data[i].login;
                        $scope.currentUserPass = $scope.data[i].password;
                        $scope.access = true;
                        $timeout(function () {
                            $scope.access = false;
                            $scope.userNameNonFiltered = '';
                            $scope.userPassNonFiltered = '';
                            $scope.showLog = {
                                display: 'none'
                            };
                            $('.login').css({
                                'display': 'none'
                            });
                            $scope.showHello = true;
                            $scope.sendUserName();
                            $scope.sendUserPass();

                        }, 2000)
                        $scope.unReg = false;
                        return;
                    } else if (!error.required || !error2.required) {
                        $scope.unReg = true;
                    } else {
                        $scope.err = true;
                    }
                }
                if ($scope.userName() == undefined && $scope.userPass() == undefined) {
                    $scope.unReg = false;
                }
//                if (($scope.userName() == 'admin' && $scope.userPass() == '9999')) {
//                    console.log('olo')
//                    //                    $scope.sFunc()
//                }



            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
    };
    $scope.errorCheck = function (error, error2) {
        if (error.required || error2.required) {
            return "Type your name and password";
        }
    };

    //Функція надсилання нового рядка
    $scope.regFunc = function (valid) {
        if (valid) {
            var obj = {
                login: $scope.userNameReg(),
                email: $scope.userEmailReg(),
                password: $scope.userPassReg()
            };
            //Запит POST надсилає об'єкт
            $http.post('http://localhost:8000/login', obj)
                .then(function successCallback(response) {
                    console.log("Success!");

                    $scope.regist = true;
                    $timeout(function () {
                        $scope.regist = false;
                        $scope.errorMassage = false;
                        $scope.userNameRegNonFiltered = '';
                        $scope.userPassRegNonFiltered = '';
                        $scope.userEmailRegNonFiltered = '';
                        $scope.showReg = {
                            display: 'none'
                        };
                        $('.registration').css({
                            'display': 'none'
                        });
                    }, 3000);

                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            //Повторно робимо запит на всі рядки (для оновлення інформації)
            $http.get('http://localhost:8000/login')
                .then(function successCallback(response) {
                    $scope.data = response.data;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
        } else {
            $scope.errorMassage = true;
        }
    };


})


app.directive('login', function () {
    return {
        templateUrl: 'structure/login.html'
    }
});




app.directive('slider', function () {
    return {
        templateUrl: 'structure/slider.html',
        link: function (scope, element, attrs) {
            mainFunc();

            function mainFunc() {
                var count = 0;
                var boxes = $('.listBox').length;

                function changeSlaids() {

                    if (count == -6) {
                        count = 0;
                    } else {
                        count--;
                    }

                    $('.slaider').animate({
                        marginLeft: count + '00%'
                    }, 1000);

                    if (count == -7) {
                        count = 1;
                    }
                    changeSepia();
                    setTimeout(changeMainSepia, 1200);

                };

                setTimeout(changeMainSepia, 1200);

                function changeMainSepia() {
                    for (var num = 0; num < boxes; num++) {

                        if ($('.box').eq(num).offset().left == '0') {
                            current = $('.box').eq(num);
                            current.css('filter', 'sepia(0%)');
                        } else if ($('.box').eq(num).offset().left != '0') {
                            $('.box').eq(num).css('filter', 'sepia(100%)');
                        }
                    }
                    setTimeout(changeMainSepia, 1200);
                };

                function changeSepia() {
                    for (var j = 0; j < boxes; j++) {
                        var preview = $('.listBox').eq(j);
                        if ($('.listBox').eq(j).attr('data-number') == count) {
                            preview.css('filter', 'sepia(0%)');
                            preview.click(function () {
                                $(this).css('filter', 'sepia(0%)')
                            });
                        } else {
                            preview.css('filter', 'sepia(100%)');
                        }
                    }
                };

                var interval = function () {
                    var time = setInterval(changeSlaids, 4000);
                    $('.next').click(function () {
                        clearInterval(time);
                    });

                    $('.previous').click(function () {
                        clearInterval(time);
                    });
                    $('.listBox').click(function () {
                        clearInterval(time);
                    });
                    changeSepia();
                    setTimeout(changeMainSepia, 1200);

                }

                interval();

                $('.next').click(function () {
                    setTimeout(changeMainSepia, 1200);

                    if (count == -6) {
                        count = 0;
                    } else {

                        count--;
                    }

                    $('.slaider').animate({
                        marginLeft: count + '00%'
                    }, 1000);

                    if (count == -7) {
                        count = 1;
                    }
                    interval();

                });

                $('.previous').click(function () {

                    setTimeout(changeMainSepia, 1200);

                    if (count == 0) {
                        count = -7;
                    }
                    count++;
                    $('.slaider').animate({
                        marginLeft: count + '00%'
                    }, 1000);
                    interval();

                });

                $('.next').hover(function () {
                        $('.next').css('opacity', '0.4');
                    },
                    function () {
                        $('.next').css('opacity', '1');
                    }
                );

                $('.previous').hover(function () {
                        $('.previous').css('opacity', '0.4');
                    },
                    function () {
                        $('.previous').css('opacity', '1');
                    }
                );

                $('.listBox').hover(function () {
                    if ($(this).attr('data-number') != count) {
                        $(this).css('filter', 'sepia(0%)');
                    }
                }, function () {
                    if ($(this).attr('data-number') != count) {
                        $(this).css('filter', 'sepia(100%)');
                    }
                });

                $('.listBox').click(function () {

                    setTimeout(changeMainSepia, 1200);

                    for (var i = 0; i < boxes; i++) {
                        count = $(this).data('number');
                        $('.slaider').animate({
                            marginLeft: count + '00%'
                        }, 1000);
                        interval();
                        break;
                    }
                });
            };
        }
    }
});
