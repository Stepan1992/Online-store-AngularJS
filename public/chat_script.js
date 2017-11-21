app.controller('chatCtrl', function ($scope, $http) {

    $scope.evenClass = 'evenClass';
    $scope.oddClass = 'oddClass';
    $scope.$on('sendUserNameEvent', function (event, args) {
        $scope.userName = args.userName;
    });


    $scope.chatFunc = function () {
        $scope.date = new Date();

        var obj = {
            question: $scope.quest,
            user: $scope.userName || 'anonymous',
            date: $scope.date
        };


        //Запит POST надсилає об'єкт
        $http.post('http://localhost:8000/chating', obj)
            .then(function successCallback(response) {
                console.log("Success!");
                $scope.quest = '';
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        //Повторно робимо запит на всі рядки (для оновлення інформації)
        $http.get('http://localhost:8000/chating')
            .then(function successCallback(response) {
                $scope.questionArr = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });

    };
    
    $http.get('http://localhost:8000/chating')
        .then(function successCallback(response) {
            $scope.questionArr = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });

});
