'use strict';

angular.module('fateGmApp.auth', ['fateGmApp.constants', 'fateGmApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
