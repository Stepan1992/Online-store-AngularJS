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
    $scope.sendUserData = function (status) {
        $rootScope.$broadcast('sendUserData', {
            userName: $scope.currentUserName,
            userPass: $scope.currentUserPass,
            adminStatus: status
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

    //зробити фільтри однією функцією

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

    };

    //users check function which can detect admin's right

    $scope.logInFunc = function (error, error2) {

        let userObj = {
            login: $scope.userName(),
            pass: $scope.userPass()
        }

        $http.get('http://localhost:8000/login', {
                params: userObj
            })
            .then(function successCallback(response) {
                if (response.data.length != 0) {
                    $scope.currentUserName = $scope.userName();
                    $scope.currentUserPass = $scope.userPass();
                    $scope.access = true;

                    if (response.data[0].status) {
                        $scope.sendUserData(true);
                    };

                    $timeout(function () {
                        $scope.access = false;
                        $scope.userNameNonFiltered = '';
                        $scope.userPassNonFiltered = '';
                        $scope.showLog = {
                            display: 'none'
                        };
                        $scope.showHello = true;
                    }, 2000)
                    $scope.unReg = false;
                }
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
    };


    $scope.errorCheck = function (error, error2) {
        if (error.required || error2.required) {
            return "Type your name and password";
        }
    };

    $scope.regFunc = function (valid) {
        if (valid) {
            var obj = {
                login: $scope.userNameReg(),
                email: $scope.userEmailReg(),
                password: $scope.userPassReg()
            };

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
        templateUrl: '../templates/login.html'
    }
});




app.directive('slider', function () {
    return {
        templateUrl: '../templates/slider.html',
        link: function (scope, element, attrs) {
            sliderFunc();

            function sliderFunc() {
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