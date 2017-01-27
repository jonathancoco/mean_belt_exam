
angular.module('app').factory('appointmentFactory', ['$http', function($http) {
  // constructor for our factory


  function appointmentFactory()
  {

    var _this = this;

    this.create = function(newAppointment, callback, callback_errors){


      $http.post('/appointments', newAppointment).then(function(returned_data){

        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      }, function(response){
          callback_errors(response);
      });
    };

    this.index = function(callback){

      //call this method if you want to update or set the friends variable
      $http.get('/appointments').then(function(returned_data){

        callback(returned_data.data);
      });
    }

    this.create = function(newAppointment, callback, callback_errors){


      //we must concatonate  the appointment date  and time into a single object and then stringify it...

      var combined =  new Date(
                    newAppointment.date.getFullYear(),
                    newAppointment.date.getMonth(),
                    newAppointment.date.getDate(),
                    newAppointment.time.getHours(),
                    newAppointment.time.getMinutes(),
                    newAppointment.time.getSeconds(),
                    newAppointment.time.getMilliseconds()
                    );
      console.log("********************* Factory:");
      console.log(newAppointment.date);
      console.log(newAppointment.time);
      console.log(combined);

      newAppointment.appointment_date = combined.toISOString();



      $http.post('/appointments', newAppointment).then(function(returned_data){

        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      }, function(response){
          console.log(response);
          callback_errors(response);
      });
    };

    this.delete = function(id, callback){

      $http.delete('/appointments/'+id).then(function(){
        callback();
      });
    }
  }

  return new appointmentFactory();

}]);
