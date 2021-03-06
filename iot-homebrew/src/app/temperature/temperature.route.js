(function() {
  'use strict';

  /**
   * Specify run block for iot.demo module.
   *
   * @namespace Routes
   */
  angular
    .module('iot.temperature')
    .run(moduleRun)
  ;

  /**
   * @desc      Run block for iot.demo module.
   * @namespace Demo
   * @memberOf  Routes
   * @ngInject
   *
   * @param {Providers.RouterHelper}  routerHelper
   */
  function moduleRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  /**
   * @name      getStates
   * @desc      Getter method for iot.demo module route definitions.
   * @memberOf  Routes.Demo
   *
   * @returns {*[]}
   */
  function getStates() {
    return [
      {
        state: 'temperature',
        config: {
          url: '/',
          parent: 'iot',
          title: 'Temperature',
          containerClass: 'temperature-container',
          views: {
            'content@': {
              templateUrl: '/iot/temperature/temperature.html',
              controller: 'TemperatureController',
              controllerAs: 'vm',
              resolve: {
                _temperatures: _temperatures,
                _latest: _latest,
                _power: _power,
                _currentStep: _currentStep,
                _program: _program
              }
            }
          }
        }
      }
    ];
  }

  /**
   * @name      _messages
   * @desc      '_messages' resolve function.
   * @memberOf  Routes.Demo
   * @ngInject
   *
   * @param   {AngularFireArrayService} $firebaseArray
   * @param   {Factories.Dataservice}   dataservice
   * @returns {ng.IPromise<TResult>}
   * @private
   */
  function _temperatures($firebaseArray, dataservice) {
    return $firebaseArray(dataservice.getReference('Temperatures'));
  }

  /**
   * @ngInject
   *
   * @param   {AngularFireArrayService} $firebaseArray
   * @param   {Factories.Dataservice}   dataservice
   * @returns {ng.IPromise<TResult>}
   * @private
   */
  function _latest($firebaseArray, dataservice) {
    var ref = dataservice.getReference('Temperatures');

    // create a query for the most recent 1 messages on the server
    var query = ref.limitToLast(1);
    // the $firebaseArray service properly handles database queries as well
    return  $firebaseArray(query);
  }

  /**
   * @ngInject
   *
   * @param   {AngularFireArrayService} $firebaseArray
   * @param   {Factories.Dataservice}   dataservice
   * @returns {ng.IPromise<TResult>}
   * @private
   */
    function _program($firebaseObject, dataservice) {
        var ref = dataservice.getReference('Programs');

        // create a query for the most recent 1 messages on the server
        //var query = ref.limitToLast(1);
        // the $firebaseArray service properly handles database queries as well
        return  $firebaseObject(ref);
    }

  /**
   * @ngInject
   *
   * @param   {AngularFireArrayService} $firebaseArray
   * @param   {Factories.Dataservice}   dataservice
   * @returns {ng.IPromise<TResult>}
   * @private
   */
  function _power($firebaseArray, dataservice) {
    var ref = dataservice.getReference('Power');

    // create a query for the most recent 25 messages on the server
    var query = ref.limitToLast(1);
    // the $firebaseArray service properly handles database queries as well
    return  $firebaseArray(query);
  }

  /**
   * @ngInject
   *
   * @param   {AngularFireArrayService} $firebaseArray
   * @param   {Factories.Dataservice}   dataservice
   * @returns {ng.IPromise<TResult>}
   * @private
   */
  function _currentStep($firebaseObject, dataservice) {
    return $firebaseObject(dataservice.getReference('CurrentStep'))
  }
})();
