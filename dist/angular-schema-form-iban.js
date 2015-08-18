angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/iban/iban.html","<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label><div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\"><span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span> <input aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\" class=\"form-control {{form.fieldHtmlClass}}\" format=\"form.format\" iban=\"\" id=\"{{form.key.slice(-1)[0]}}\" name=\"{{form.key.slice(-1)[0]}}\" ng-disabled=\"form.readonly\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-show=\"form.key\" placeholder=\"{{form.placeholder}}\" schema-validate=\"form\" sf-changed=\"form\" style=\"background-color: white\" type=\"text\"> <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span></div><span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\" aria-hidden=\"true\"></span> <span ng-if=\"hasError() || hasSuccess()\" id=\"{{form.key.slice(-1)[0] + \'Status\'}}\" class=\"sr-only\">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span> <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span></div>");}]);
(function() {
  angular.module('schemaForm').config(["schemaFormProvider", "schemaFormDecoratorsProvider", "sfPathProvider", function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
    var iban;
    iban = function(name, schema, options) {
      var f;
      if ((schema.type === 'iban') || (schema.type === 'string' && schema.format === 'iban')) {
        f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'iban';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };
    schemaFormProvider.defaults.string.unshift(iban);
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'iban', 'directives/decorators/bootstrap/iban/iban.html');
    schemaFormDecoratorsProvider.createDirective('iban', 'directives/decorators/bootstrap/iban/iban.html');
  }]);

  angular.module('schemaForm').directive('iban', function() {
    var iban, validateIban;
    validateIban = function(value) {};
    iban = {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ctrl) {
        ctrl.$parsers.unshift(function(value) {
          var valid;
          valid = IBAN.isValid(value);
          ctrl.$setValidity('iban', valid);
          if (valid) {
            value = IBAN.electronicFormat(value);
            scope.$broadcast('schemaFormValidate');
          }
          if (valid) {
            return value;
          } else {
            return void 0;
          }
        });
        ctrl.$formatters.unshift(function(value) {
          var valid;
          valid = IBAN.isValid(value);
          ctrl.$setValidity('iban', valid);
          if (valid) {
            value = IBAN.printFormat(value);
            scope.$broadcast('schemaFormValidate');
          }
          return value;
        });
      }
    };
    return iban;
  });

}).call(this);
