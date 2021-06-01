"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RatingComponent = void 0;
var core_1 = require("@angular/core");
var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
        this.communication_rate = 0;
        this.timing_rate = 0;
        this.professional_rate = 0;
        this.safety_rate = 0;
        this.quality_rate = 0;
        this.max = 5;
        this.overall_rate = 0;
    }
    RatingComponent.prototype.ngOnInit = function () {
    };
    RatingComponent.prototype.hoveringOver = function (value) {
        this.overStar = value;
        this.percent = (value / this.max) * 100;
    };
    RatingComponent = __decorate([
        core_1.Component({
            selector: 'app-rating',
            templateUrl: './rating.component.html',
            styleUrls: ['./rating.component.scss']
        })
    ], RatingComponent);
    return RatingComponent;
}());
exports.RatingComponent = RatingComponent;
