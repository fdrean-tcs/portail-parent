/* global angular */

angular.module('directives').directive('btnAutoCollapse', function() {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {
            if (attrs.isdropdown == "false") {
                element.on('click', function(event) { 
                   $(".navbar-collapse.in").collapse('hide');
                });
            }
        }
    };
});

angular.module("directives").directive('headerPortail', function(){
    return {
        restrict: 'E',
        templateUrl: '/directives/header.html'
    };
});

angular.module("directives").directive('menuNavigation', function(){
    return {
        restrict: 'E',
        templateUrl: '/directives/navigation.html'
    };
});

angular.module("directives").directive('footerPortail', function(){
    return {
        restrict: 'E',
        templateUrl: '/directives/footer.html'
    };
});

angular.module("directives").directive('homeMessages', function(){
    return {
        restrict: 'E',
        templateUrl: '/directives/messages.html'
    };
});