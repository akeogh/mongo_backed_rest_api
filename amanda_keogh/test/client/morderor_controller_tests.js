require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('morderors controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('morderMens'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  // test that test harness is up and running properly, and that mocked angular
  // environment is set up with morderor controller
  it('should create a controller', function() {
    var controller = $ControllerConstructor('IntroController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.morderors)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('IntroController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add to the morderors array with GETall', function() {
      $httpBackend.expectGET('/api/morderors').respond(200, [{_id: 1, name: 'getall test', verb: 'testaction'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.morderors[0].name).toBe('getall test');
    });

    it('should post a new morderor', function() {
      $httpBackend.expectPOST('/api/morderors', {name: 'testthing', verb: 'testaction'}).respond(200, {name: 'post test'});
      expect($scope.morderors.length).toBe(0);
      $scope.create({name: 'testthing', verb:'testaction'});
      $httpBackend.flush();
      expect($scope.morderors[0].name).toBe('post test');
      expect($scope.newMorderor.name).toBe(undefined);
    });

    it('should edit a morderor', function() {
      // test that "editing" property is changed
      $httpBackend.expectPUT('/api/morderors/test', {_id: 'test', name: 'a test?', verb: 'no really', editing: false}).respond(200, {name: 'put test'});
      $scope.update({_id: 'test', name: 'a test?', verb: 'no really'});
      $httpBackend.flush();
    });
  });

  //tests which require a dummy morderer in list
  describe('delete, refresh', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('IntroController', {$scope: $scope});
      $scope.morderors = [{_id: 'test', name: 'test name', verb: 'test verb'}];
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should delete a morderor', function() {
      $httpBackend.expectDELETE('/api/morderors/test').respond(200);
      $scope.remove({_id: 'test'});
      $httpBackend.flush();
      expect($scope.morderors[0]).toBe(undefined);
    });

    it('should refresh the current list with new information', function() {
      $httpBackend.expectGET('/api/morderors/test').respond(200, [{_id: 'test', name: 'super diff'}]);
      $scope.refresh($scope.morderors[0]);
      $httpBackend.flush();
      expect($scope.morderors[0].name).toBe('super diff');
    });

  });


})
