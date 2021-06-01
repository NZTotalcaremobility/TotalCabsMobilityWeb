"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var rider_login_component_1 = require("./rider-login/rider-login.component");
var login_mobile_component_1 = require("./login-mobile/login-mobile.component");
var otp_verification_component_1 = require("./otp-verification/otp-verification.component");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var signup_component_1 = require("./signup/signup.component");
var account_verification_component_1 = require("./account-verification/account-verification.component");
var home_component_1 = require("./home/home.component");
var auth_guard_1 = require("./auth.guard");
var layout_component_1 = require("./layout/layout.component");
var search_component_1 = require("./search/search.component");
var userlayout_component_1 = require("./userlayout/userlayout.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var profile_component_1 = require("./profile/profile.component");
var change_password_component_1 = require("./change-password/change-password.component");
var edit_profile_component_1 = require("./edit-profile/edit-profile.component");
var searchbox_component_1 = require("./searchbox/searchbox.component");
var confirmtaxi_component_1 = require("./confirmtaxi/confirmtaxi.component");
var recipt_component_1 = require("./recipt/recipt.component");
var mytrip_component_1 = require("./mytrip/mytrip.component");
var confirm_ride_component_1 = require("./confirm-ride/confirm-ride.component");
var cancel_ride_component_1 = require("./cancel-ride/cancel-ride.component");
var chat_component_1 = require("./chat/chat.component");
var rating_component_1 = require("./rating/rating.component");
var routes = [
    {
        path: 'forgotpassword',
        component: forgot_password_component_1.ForgotPasswordComponent
    },
    {
        path: 'register',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'login-phone',
        component: login_mobile_component_1.LoginMobileComponent
    },
    { path: 'accountverification/:token', component: account_verification_component_1.AccountVerificationComponent },
    {
        path: 'otp-verification',
        component: otp_verification_component_1.OtpVerificationComponent
    },
    {
        path: '',
        component: home_component_1.HomeComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'login',
        component: rider_login_component_1.RiderLoginComponent
    },
    {
        path: 'auth/reset-password/:token',
        component: reset_password_component_1.ResetPasswordComponent
    },
    {
        path: 'user',
        component: layout_component_1.LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'search',
                pathMatch: 'full'
            },
            {
                path: 'search',
                component: search_component_1.SearchComponent,
                children: [
                    {
                        path: '',
                        component: searchbox_component_1.SearchboxComponent
                    },
                    {
                        path: 'confirm',
                        component: confirmtaxi_component_1.ConfirmtaxiComponent
                    },
                    {
                        path: 'accept',
                        component: confirm_ride_component_1.ConfirmRideComponent
                    },
                    {
                        path: 'cancel',
                        component: cancel_ride_component_1.CancelRideComponent
                    },
                    {
                        path: 'rating',
                        component: rating_component_1.RatingComponent
                    }
                ]
            },
            {
                path: 'page',
                component: userlayout_component_1.UserlayoutComponent,
                children: [
                    {
                        path: '',
                        component: dashboard_component_1.DashboardComponent
                    },
                    {
                        path: 'profile',
                        component: profile_component_1.ProfileComponent
                    },
                    {
                        path: 'change-password',
                        component: change_password_component_1.ChangePasswordComponent
                    },
                    {
                        path: 'edit-profile',
                        component: edit_profile_component_1.EditProfileComponent
                    },
                    {
                        path: 'my-trip',
                        component: mytrip_component_1.MytripComponent
                    },
                    {
                        path: 'recipt',
                        component: recipt_component_1.ReciptComponent
                    },
                    {
                        path: 'chat',
                        component: chat_component_1.ChatComponent
                    }
                ]
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
