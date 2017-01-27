var mongoose = require('mongoose');
var users = require('./../controllers/users.js');
var appointments = require('./../controllers/appointments.js');


//************RESTful routes for users************

module.exports = function(app){

  app.get('/users', function(req, res) {
    users.index(req, res);
  });

  app.post('/users', function(req, res) {
    users.create(req, res);
  });

  app.post('/users/login', function(req, res) {
    users.login(req, res);
  });

  app.put('/users/:id', function(req, res) {
    users.update(req, res);
  });

  app.delete('/users/:id', function(req, res) {
    users.delete(req, res);
  });

  app.get('/appointments', function(req, res) {
    appointments.index(req, res);
  });

  app.post('/appointments', function(req, res) {
    appointments.create(req, res);
  });

  app.delete('/appointments/:id', function(req, res) {
    appointments.delete(req, res);
  });

}
