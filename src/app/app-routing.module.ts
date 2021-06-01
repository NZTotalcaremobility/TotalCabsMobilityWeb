import { SearchCabComponent } from './search-cab/search-cab.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RiderLoginComponent } from './rider-login/rider-login.component';
import { LoginMobileComponent } from './login-mobile/login-mobile.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './login-mobile/layout/layout.component'
import { SearchComponent } from './search/search.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CustomerMapComponent } from './customer-map/customer-map.component';
// import { SearchboxComponent } from './component/searchbox/searchbox.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { ConfirmtaxiComponent } from './confirmtaxi/confirmtaxi.component';
import { SignupCompnayComponent } from './signup/signup-compnay/signup-compnay.component';
import { ReciptComponent } from './recipt/recipt.component';
import { TripboxComponent } from './component/tripbox/tripbox.component';
import { MytripComponent } from './mytrip/mytrip.component';
import { UpcomingTripsComponent } from './upcoming-trips/upcoming-trips.component';
import { ConfirmRideComponent } from './confirm-ride/confirm-ride.component';
import { CancelRideComponent } from './cancel-ride/cancel-ride.component';
import { ChatComponent } from './chat/chat.component';
import { RatingComponent } from './rating/rating.component';
import { PolicyComponent } from './policy/policy.component';

import { ServicesPageComponent } from './services-page/services-page.component';
import { CalculateFareComponent } from './calculate-fare/calculate-fare.component';
import { CareerComponent } from './career/career.component';
import { RentalComponent } from './rental/rental.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { BookingEnquiryComponent } from './booking-enquiry/booking-enquiry.component';
import { RiderComponent } from './rider/rider/rider.component';
import { CalculationComponent } from './calculation/calculation.component';
import { SearchcabMapComponent } from './searchcab-map/searchcab-map.component';

const routes: Routes = [
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'login-phone',
    component: LoginMobileComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'services',
    component: ServicesPageComponent
  },
  {
    path: 'calculateFare',
    component: CalculateFareComponent
  },
  {
    path: 'booking-enquiry',
    component: BookingEnquiryComponent
  },
  {
    path: 'career',
    component: CareerComponent
  },
  {
    path: 'rental',
    component: RentalComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'signup-company',
    component: SignupCompnayComponent
  },
  { path: 'accountverification/:token', component: AccountVerificationComponent },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent
  },
  {
    path: '',
    component: HomeComponent,
    // redirectTo:'/user/page/profile',
    // pathMatch:'full'
  },
  {
    path: 'login',
    component: RiderLoginComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },

  {
    path: 'auth/reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'customer-map',
    component: CustomerMapComponent
  },

  {
    path: 'user',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchComponent,
        children: [
          {
            path: '',
            component: SearchboxComponent
          },
          {
            path: 'edit/:id',
            component: SearchboxComponent
          },
          {
            path: 'confirm',
            component: ConfirmtaxiComponent
          },
          {
            path: 'accept',
            component: ConfirmRideComponent
          },
          {
            path: 'cancel',
            component: CancelRideComponent
          },
          {
            path: 'rating',
            component: RatingComponent
          },
          {
            path: 'rider/:id',
            component: RiderComponent
          },
          {
            path: 'rider',
            component: RiderComponent
          }
        ]
      },
      {
        path: 'page',
        component: UserlayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DashboardComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'my-trip',
            component: MytripComponent
          },
          {
            path: 'upcoming-trips',
            component: UpcomingTripsComponent
          },
          {
            path: 'recipt/:id',
            component: ReciptComponent
          },
          {
            path: 'trip-box',
            component: TripboxComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          },
          {
            path: 'edit-profile',
            component: EditProfileComponent
          },
          {
            path: 'recipt',
            component: ReciptComponent
          },
          {
            path: 'rating',
            component: RatingComponent
          },
          {
            path: 'chat',
            component: ChatComponent
          }
        ]
      }
    ]
  },
  {
    path: 'calculate',
    component: CalculationComponent
  },
  {
    path: 'ride',
    children: [
      {
        path: '',
        component: RiderComponent
      },
      {
        path: ':id',
        component: RiderComponent
      },
    ]
  },
  {
    path: 'search',
    component: SearchCabComponent,
    children: [
      {
        path: 'cab',
        component: SearchboxComponent
      },
      {
        path: 'cabbook',
        component: SearchcabMapComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
