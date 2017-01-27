var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');



module.exports = {

  index:function(req, res) {

    Appointment.find({}, null, {sort: {appointment_date: 1}})
         .populate('_user')
         .exec (function(err, appointments) {
                                         if(err) {
                                           console.log('something went wrong in index');
                                         } else {
                                           res.json(appointments);
                                         }
                                      })
  },


  create: function(req, res) {

    queryDate  = new Date(req.body.appointment_date);

    console.log("queryDate = " + queryDate);


    Appointment.find( {"appointment_date": {"$gte": new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()), "$lt": new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()+1)}})
      .exec  (function(err, appointments){

            if (err)
            {
              console.log('failure on searching for records by date')
            }
            else {
              if (appointments.length < 3)
              {
                console.log("length of appointment is " + appointments.length);
                console.log('We are  in create for appointments');
                console.log("******");
                console.log(req.body);
                console.log("*******");

                var appointment = new Appointment({_user: req.body.user, complaint: req.body.complaint, appointment_date: req.body.appointment_date });

                appointment.save(function(err, appt) {
                  if (err) {
                    // An Example of error handling


                    res.status(500).json(err.errors);

                  } else { // else console.log that we did well and then redirect to the root route

                    var bHasAppointment = false;

                    Appointment.find( {"_user":req.body.user, "appointment_date": {"$gte": new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()), "$lt": new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()+1)}})
                      .exec  (function(error1, appointments1){

                            if (error1)
                            {
                              console.log('failure on searching for records by date')
                              console.log(error1);
                            }
                            else {

                                if (appointments1.length > 0)
                                {
                                  bHasAppointment = true;
                                }

                            }

                      })

                      if (bHasAppointment)
                      {
                          res.send(appt);
                      }
                      else {
                        res.status(500).json({number_appointments:{message:'Patient is already scheduled  on this day!'}});
                      }


                  }
                })

              }
              else {
                console.log("we have  an error condition");
                res.status(500).json({number_appointments:{message:'Too many appointments scheduled on this day. Please select another day!'}});
              }
            }

      })
  },

  hasAppointment: function(user, queryDate)
  {
    console.log("made it past valid");

    var bHasAppointment = false;

    Appointment.find( {"_user":user, "appointment_date": {"$gte": new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()), "$lt": new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()+1)}})
      .exec  (function(error1, appointments1){

            if (error1)
            {
              console.log('failure on searching for records by date')
              console.log(error1);
            }
            else {

                if (appointments1.length > 0)
                {
                  bHasAppointment = true;
                }

            }

      })


    return bHasAppointment;
  },

  delete:function(req, res) {
    Appointment.remove({_id:req.params.id}, function(err, result) {
      if(err) {
        console.log('something went wrong in destroy');
      } else {
          res.send(result);
      }
    })
  }
}
