/* global angular */

angular.module('controllers').controller('PortailController', function($scope, $location, portailService) {
    $scope.user = {};
    
    $scope.navigation = {
         home: {},
         entries: {},
         page: {}
    };
    
    $scope.setPage = function(entry) {
        $scope.navigation.page = entry;
        
        if (entry.key) {
            $location.path(entry.key).replace();
        }
    };
    
    $scope.isActive = function(entry) {
        return $scope.navigation.home == entry || $scope.navigation.page == entry || (entry.children && entry.children.indexOf($scope.navigation.page) != -1);
    };
    
    $scope.isLink = function(entry) {
        return entry.type == 'link';
    };
    
    $scope.isDropdown = function(entry) {
        return entry.type == 'menu';
    };
    
    $scope.isSeparator = function(entry) {
        return entry.type == 'separator';
    };
    
    var retrieveEntryByKey = function(key, entries) {
        var i = 0;
        var entry;
        
        while (!entry && entries[i]) {
            if (entries[i].key == key) {
                entry = entries[i];
            } else if (entries[i].children) {
                entry = retrieveEntryByKey(key, entries[i].children);
            }
            
            i++;
        }
        
        return entry;
    }
    
    var getPageForLocation= function() {
        if ($scope.user && $scope.navigation.entries) {
            var navKey = $location.path().replace(/^\//,"");
            
            if (navKey != "") {
                var entries = $scope.navigation.entries.left.concat($scope.navigation.entries.right);
                var entry = retrieveEntryByKey(navKey, entries);
                return entry ? entry : {url:"404.html"};
            }
        }
    }
    
    portailService.getUser().success(function(data) {
        if (data) {
            $scope.user = data;
        }
    });
    
    portailService.getNavigation().success(function(data) {
        if (data) {
            $scope.navigation.home = data.home;
            $scope.navigation.entries = data.entries;
            $scope.setPage(getPageForLocation() || $scope.navigation.home);
        }
    });
});

angular.module('controllers').controller('MessagesController', function($scope, accueilService) {
    $scope.messages = {};
    
    accueilService.getMessages().success(function(data) {
        $scope.messages = data;
    });
});

angular.module('controllers').controller('RelevesController', function($scope, resultatsService) {
    $scope.releves = [];
    
    resultatsService.getReleves().success(function(data) {
        $scope.releves = data;
    });
});

angular.module('controllers').controller('ContactController', function($scope, contactService) {
    $scope.contact = {};
    
    $scope.init = function(user) {
        $scope.contact.email = user.email;
    }
    
    $scope.isEmpty = function() {
        return !$scope.contact.subject && !$scope.contact.body;
    }
    
    $scope.getDate = function() {
        return Date.now();
    }
    
    $scope.send = function(user) {
        contactService.send($scope.contact);
        
        if (user)  {
            $scope.contact = {
                email: user.email
            };
        } else {
            $scope.contact = {};
        }
        $scope.contactForm.$setPristine(true);
    }
});