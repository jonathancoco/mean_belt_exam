var mongoose       = require('mongoose'),
    Schema         = mongoose.Schema,
    appointmentSchema = new Schema({
                                          _user: {type: Schema.Types.ObjectId, ref: 'User', required:true},
                                          complaint: {
                                            type: String,
                                            required: true,
                                            trim: true
                                          },
                                          appointment_date: {
                                            type:Date,
                                            required: true
                                          }
                                      },

                                      { timestamps: true }
                                    );


mongoose.model('Appointment', appointmentSchema);
