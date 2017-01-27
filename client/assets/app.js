(function() {

angular.module('app', ['ngRoute', 'httpPostFix', 'ngCookies', 'app.filters']);

angular.module('app').config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);


/* configuration for angular route */
angular.module('app').config(function($routeProvider) {

  console.log('Route Provider');

  $routeProvider
    .when('/', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    })
    .when('/new_appointment', {
      templateUrl: '/partials/new_appointment.html',
      controller: 'appointmentController'
    })
    .otherwise({
      redirectTo: '/'
    });
});



angular.module("app.filters", []).filter("datespan", function() {

  return function(date) {

    console.log("the date input is");
    console.log(date);
    return moment(date).fromNow();
  };
});

}) ();
