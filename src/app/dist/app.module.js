"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ng_block_ui_1 = require("ng-block-ui");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var ngx_toastr_1 = require("ngx-toastr");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var rider_login_component_1 = require("./rider-login/rider-login.component");
var login_mobile_component_1 = require("./login-mobile/login-mobile.component");
var otp_verification_component_1 = require("./otp-verification/otp-verification.component");
var reset_password_component_1 = require("./reset-password/reset-password.component");
var signup_component_1 = require("./signup/signup.component");
var http_1 = require("@angular/common/http");
var http_interceptor_service_1 = require("./services/http-interceptor.service");
var user_service_1 = require("./services/user.service");
var account_verification_component_1 = require("./account-verification/account-verification.component");
var home_component_1 = require("./home/home.component");
var accordion_1 = require("primeng/accordion");
var api_1 = require("primeng/api");
var dialog_1 = require("primeng/dialog");
var rating_1 = require("ngx-bootstrap/rating");
// import {Ng2TelInputModule} from 'ng2-tel-input'
var confirmdialog_1 = require("primeng/confirmdialog");
var signup_compnay_component_1 = require("./signup/signup-compnay/signup-compnay.component");
var signup_individual_component_1 = require("./signup/signup-individual/signup-individual.component");
var layout_component_1 = require("./layout/layout.component");
var search_component_1 = require("./search/search.component");
var header_component_1 = require("./component/header/header.component");
var searchbox_component_1 = require("./searchbox/searchbox.component");
var sidebar_component_1 = require("./component/sidebar/sidebar.component");
var userlayout_component_1 = require("./userlayout/userlayout.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var account_component_1 = require("./account/account.component");
var profile_component_1 = require("./profile/profile.component");
var change_password_component_1 = require("./change-password/change-password.component");
var edit_profile_component_1 = require("./edit-profile/edit-profile.component");
var taxilisting_component_1 = require("./component/taxilisting/taxilisting.component");
var confirmtaxi_component_1 = require("./confirmtaxi/confirmtaxi.component");
var recipt_component_1 = require("./recipt/recipt.component");
var mytrip_component_1 = require("./mytrip/mytrip.component");
var tripbox_component_1 = require("./component/tripbox/tripbox.component");
var common_service_1 = require("./services/common.service");
var confirm_ride_component_1 = require("./confirm-ride/confirm-ride.component");
var cancel_ride_component_1 = require("./cancel-ride/cancel-ride.component");
var chat_component_1 = require("./chat/chat.component");
var rating_component_1 = require("./rating/rating.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                rider_login_component_1.RiderLoginComponent,
                login_mobile_component_1.LoginMobileComponent,
                otp_verification_component_1.OtpVerificationComponent,
                reset_password_component_1.ResetPasswordComponent,
                signup_component_1.SignupComponent,
                account_verification_component_1.AccountVerificationComponent,
                home_component_1.HomeComponent,
                signup_compnay_component_1.SignupCompnayComponent,
                signup_individual_component_1.SignupIndividualComponent,
                layout_component_1.LayoutComponent,
                search_component_1.SearchComponent,
                header_component_1.HeaderComponent,
                searchbox_component_1.SearchboxComponent,
                sidebar_component_1.SidebarComponent,
                userlayout_component_1.UserlayoutComponent,
                dashboard_component_1.DashboardComponent,
                account_component_1.AccountComponent,
                profile_component_1.ProfileComponent,
                change_password_component_1.ChangePasswordComponent,
                edit_profile_component_1.EditProfileComponent,
                taxilisting_component_1.TaxilistingComponent,
                confirmtaxi_component_1.ConfirmtaxiComponent,
                recipt_component_1.ReciptComponent,
                mytrip_component_1.MytripComponent,
                tripbox_component_1.TripboxComponent,
                confirm_ride_component_1.ConfirmRideComponent,
                cancel_ride_component_1.CancelRideComponent,
                chat_component_1.ChatComponent,
                rating_component_1.RatingComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                dialog_1.DialogModule,
                accordion_1.AccordionModule,
                confirmdialog_1.ConfirmDialogModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                // Ng2TelInputModule,
                app_routing_module_1.AppRoutingModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                animations_1.BrowserAnimationsModule,
                ng_block_ui_1.BlockUIModule.forRoot(),
                dropdown_1.BsDropdownModule.forRoot(),
                rating_1.RatingModule.forRoot()
            ],
            providers: [common_service_1.CommonService, user_service_1.UserService, api_1.ConfirmationService, { provide: http_1.HTTP_INTERCEPTORS, useClass: http_interceptor_service_1.HttpInterceptorService, multi: true }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
