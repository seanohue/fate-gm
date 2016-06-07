'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.characters = [];

      $scope.$on('$destroy', () => socket.unsyncUpdates('character'));
    }

    $onInit() {
      this.$http.get('/api/characters')
        .then(response => {
          this.characters = response.data;
          this.socket.syncUpdates('character', this.awesomeThings);
        });
    }

    addCharacter() {
      if (this.newCharacter) {
        this.$http.post('/api/characters', {
          name: this.newCharacter
        });
        this.newCharacter = '';
      }
    }

    deleteCharacter(character) {
      this.$http.delete('/api/characters/' + character._id);
    }
  }

  angular.module('fateGmApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
