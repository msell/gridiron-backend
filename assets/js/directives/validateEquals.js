'use strict';

angular.module('gridiron')
  .directive('validateEquals', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        function validateEqual(value) {
          var valid = (value === scope.$eval(attrs.validateEquals));
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value : undefined;
        }

        // register the validator w/ the parsers and formatters pipeline (angular middleware?) need to study this
        ngModelCtrl.$parsers.push(validateEqual);
        ngModelCtrl.$formatters.push(validateEqual);

        // in order to trigger the formatter we need to setup a callback using watch:
        scope.$watch(attrs.validateEquals , function(){
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        })
      }
    };
  });
