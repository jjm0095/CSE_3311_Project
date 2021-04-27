"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
var rxjs_1 = require("rxjs");
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    BaseService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        console.log(error);
        // either applicationError in header or model error in body
        if (applicationError) {
            return rxjs_1.Observable.throw(applicationError);
        }
        var modelStateErrors = '';
        var serverError = error.json();
        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return rxjs_1.Observable.throw(modelStateErrors || 'Server error');
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map