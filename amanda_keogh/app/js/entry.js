require('angular/angular');
var angular = window.angular;

var morderMens = angular.module('morderMens', []);
require('./directives/header_directive')(morderMens);
require('./morderors/morderors')(morderMens);

