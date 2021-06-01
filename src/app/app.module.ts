import { PolicyComponent } from './policy/policy.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RiderLoginComponent } from './rider-login/rider-login.component';
import { LoginMobileComponent } from './login-mobile/login-mobile.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { UserService } from './services/user.service';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { HomeComponent } from './home/home.component';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

// import {Ng2TelInputModule} from 'ng2-tel-input'
import { AgmCoreModule } from '@agm/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SignupCompnayComponent } from './signup/signup-compnay/signup-compnay.component';
import { SignupIndividualComponent } from './signup/signup-individual/signup-individual.component';
// import { LayoutComponent } from '../app/login-mobile/layout/layout.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './component/header/header.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TaxilistingComponent } from './component/taxilisting/taxilisting.component';
import { CustomerMapComponent } from './customer-map/customer-map.component';
import { ConfirmtaxiComponent } from './confirmtaxi/confirmtaxi.component';
import { ReciptComponent } from './recipt/recipt.component';
import { MytripComponent } from './mytrip/mytrip.component';
import { TripboxComponent } from './component/tripbox/tripbox.component';
import { CommonService } from './services/common.service';
import { LayoutComponent } from './login-mobile/layout/layout.component';
import { AgmDirectionModule } from 'agm-direction';
import { UpcomingTripsComponent } from './upcoming-trips/upcoming-trips.component';
import { ConfirmRideComponent } from './confirm-ride/confirm-ride.component';
import { CancelRideComponent } from './cancel-ride/cancel-ride.component';
import { ChatComponent } from './chat/chat.component';
import { RatingComponent } from './rating/rating.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ServicesPageComponent } from './services-page/services-page.component';
import { CalculateFareComponent } from './calculate-fare/calculate-fare.component';
import { CareerComponent } from './career/career.component';
import { RentalComponent } from './rental/rental.component';
import { SecondMenuComponent } from './second-menu/second-menu.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { BookingEnquiryComponent } from './booking-enquiry/booking-enquiry.component';
import { FooterComponent } from './footer/footer.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { RiderComponent } from './rider/rider/rider.component';
import { SearchCabComponent } from './search-cab/search-cab.component';
import { CalculationComponent } from './calculation/calculation.component';
import { SearchcabMapComponent } from './searchcab-map/searchcab-map.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    RiderLoginComponent,
    LoginMobileComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    SignupComponent,
    AccountVerificationComponent,
    HomeComponent,
    SignupCompnayComponent,
    SignupIndividualComponent,
    LayoutComponent,
    SearchComponent,
    HeaderComponent,
    SearchboxComponent,
    SidebarComponent,
    UserlayoutComponent,
    DashboardComponent,
    AccountComponent,
    ProfileComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    TaxilistingComponent,
    CustomerMapComponent,
    ConfirmtaxiComponent,
    ReciptComponent,
    MytripComponent,
    TripboxComponent,
    UpcomingTripsComponent,
    ConfirmRideComponent,
    CancelRideComponent,
    ChatComponent,
    RatingComponent,
    PolicyComponent,
    ServicesPageComponent,
    CalculateFareComponent,
    CareerComponent,
    RentalComponent,
    SecondMenuComponent,
    AboutUsComponent,
    ContactComponent,
    BookingEnquiryComponent,
    FooterComponent,
    TopHeaderComponent,
    RiderComponent,
    SearchCabComponent,
    CalculationComponent,
    SearchcabMapComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    DialogModule,
    AccordionModule,
    ConfirmDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAPtxJJdDVQUUW_PKvnIHaPuH6YOgGnjGA',
      libraries: ['places', "geometry"]
    }),
    AgmDirectionModule,
    // Ng2TelInputModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BlockUIModule.forRoot(),
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    CarouselModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgSelectModule,
    NgOptionHighlightModule
  ],
  providers: [CommonService, UserService, ConfirmationService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
