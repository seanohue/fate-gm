'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];

      $scope.$on('$destroy', () => socket.unsyncUpdates('character'));
    }

    $onInit() {
      this.$http.get('/api/characters')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('character', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/characters', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(character) {
      this.$http.delete('/api/characters/' + character._id);
    }
  }

  angular.module('fateGmApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
