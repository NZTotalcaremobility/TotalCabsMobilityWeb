import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
//import { SignupIndividualComponent } from './signup-individual/signup-individual.component';
//import { SignupCompnayComponent } from './signup-compnay/signup-compnay.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupAs: String = 'individual'
  ngOnInit(): void {
    console.log("ok signup");
    
  }

  public switchSignUpAs(data){
    this.signupAs = data;
  }

}
