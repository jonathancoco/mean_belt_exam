(function() {

/*
    Our controllers: Modularize these into a folder called:
    'controllers' within 'client' (you can further organize all these if you desire: e.g. client/assets/js/controllers)
  */
  angular.module('app').controller('appointmentController', ['$scope', 'appointmentFactory', '$location', '$cookies', '$routeParams', function($scope, appointmentFactory, $location, $cookies, $routeParams) {

    var index = function(){
                appointmentFactory.index(function(returnedData){
                  $scope.appointments = returnedData;
                  });
             };


     var validate = function(){
       bValid = true;

       $scope.newAppointment.client_date_validation = "";
       $scope.newAppointment.client_time_validation = "";
       $scope.newAppointment.errors = "";

       var apptDate =  new Date(
                     $scope.newAppointment.date.getFullYear(),
                     $scope.newAppointment.date.getMonth(),
                     $scope.newAppointment.date.getDate()
                     );
       var today = new Date();

       if (apptDate <= today)
       {
          $scope.newAppointment.client_date_validation = "Please specify a date in the future";
         bValid = false;
       }

       var hour = $scope.newAppointment.time.getHours();
       var minute = $scope.newAppointment.time.getMinutes();

       if (((hour == 17) && (minute > 0))  || (hour < 8) || (hour > 17))
       {
         $scope.newAppointment.client_time_validation = "Please specify a time between 8am - 5pm";
        bValid = false;
       }


       return bValid;
     };

     var validateCancel = function(appointment){
       bValid = true;

       var tempDate = new Date(appointment.appointment_date);

       var apptDate =  new Date(
                     tempDate.getFullYear(),
                     tempDate.getMonth(),
                     tempDate.getDate(),
                     tempDate.getHours(),
                     tempDate.getMinutes(),
                     tempDate.getSeconds(),
                     tempDate.getMilliseconds()
                     );
       var today = new Date();

       //Get 1 day in milliseconds
       var one_day=1000*60*60*24;

       // Convert both dates to milliseconds
       var date1_ms = apptDate.getTime();
       var date2_ms = today.getTime();

       // Calculate the difference in milliseconds
       var difference_ms = (date2_ms - date1_ms);

       if ((Math.round(difference_ms/one_day) *-1) <= 1)
       {
        $scope.appointment_cancel_validation  = "You cannot cancel within 24 hours of appointment";
         bValid = false;
       }


       return bValid;
     };



     $scope.appointments  = [];
     $scope.newAppointment = {};
     $scope.sort_type = "appointment_date";
     $scope.user_id = $cookies.get('user_id');
     $scope.appointment_cancel_validation = "";

     console.log("the $scope.user_id = " + $scope.user_id);

     $scope.create = function(){

            if (validate())
            {
              $scope.newAppointment.user = $cookies.get('user_id');

              console.log($scope.newAppointment);

               appointmentFactory.create($scope.newAppointment,
                                  function callback(result) {
                                         $scope.appointments.push(result);
                                         $scope.newAppointment = {};
                                         console.log("getting ureaady to call location.url");
                                         $location.url('/');
                                  },
                                  function callback_error(errors){
                                     $scope.newAppointment.errors = errors.data;
                                  })
            }

        };

      $scope.resetAppointment = function(){

            $scope.newAppointment = {category:'', topic:'', description:''}
         };




     $scope.remove = function(appointment){


          if (validateCancel(appointment))
          {
            appointmentFactory.delete(appointment._id, function(){

              posAppointment = -1;

              for (var i=0; i<$scope.appointments.length; i++)
              {
                if ($scope.appointments[i] == appointment)
                {
                  posAppointment  = i;
                }
              }

              console.log(posAppointment);

              if (posAppointment >= 0)
              {
                $scope.appointments.splice(posAppointment, 1);
              }

              $scope.appointment_cancel_validation = "";

              $location.url('/');
         });
       }
       else {
         alert($scope.appointment_cancel_validation);
       }
     }

     index();

  }]);

}) ();
