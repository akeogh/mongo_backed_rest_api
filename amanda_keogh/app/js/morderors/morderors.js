module.exports = function(app) {
  require('./controllers/morderors_controller')(app);
  require('./directives/directives')(app);
};
