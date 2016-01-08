module.exports = exports = function(app) {
  app.directive('morderorDirective', function(){
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/templates/morderor_template.html',
      transclude: true,
      scope: {
        morderor: '='
      }
    }
  });
};
