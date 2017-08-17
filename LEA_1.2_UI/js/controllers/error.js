GLET.controller('EXController', function ($scope, $exceptionHandler) {
    throw { message: 'error message' };
    $scope.message = exception.message;
   
})