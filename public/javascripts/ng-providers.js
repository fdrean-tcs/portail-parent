/* global angular */

angular.module('providers').provider('portailService', function portailService() {
    this.$get = function($http) {
        return {
            getUser: function() {
                return $http.get('/portail/user/get');
            },
            getNavigation: function() {
                return $http.get('/portail/navigation.json');
            }
        };
    }
});

angular.module('providers').provider('accueilService', function resultatsService() {
    this.$get = function($http) {
        return {
            getMessages: function() {
                return $http.get('/accueil/messages/get');
            }
        };
    }
});

angular.module('providers').provider('resultatsService', function resultatsService() {
    this.$get = function($http) {
        return {
            getReleves: function() {
                return $http.get('/resultats/releves/get');
            }
        };
    }
});

angular.module('providers').provider('contactService', function contactService() {
    this.$get = function($http) {
        return {
            send: function(contact) {
                return $http.post('/contact/send', {"contact": contact});
            }
        };
    }
});