module.exports = exports = function(app) {
  app.directive('headerDirective', function(){
    return {
      restrict: 'AEC',
      replace: 'true',
      templateUrl: '/templates/header_template.html'
    }
  });
};
