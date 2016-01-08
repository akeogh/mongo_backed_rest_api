module.exports = exports = function(app) {
  app.directive('editMorderorDirective', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: '/templates/edit_morderor_template.html',
      transclude: true,
      scope: {
        morderor: "=",
        update: "&"
      }
    }
  })
}
