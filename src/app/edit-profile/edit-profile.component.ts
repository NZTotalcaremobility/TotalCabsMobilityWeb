import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import {environment }from '../../environments/environment';

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isSubmited: Boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  errorflag: Boolean = true;
  editForm: FormGroup
  id:any;
  loader: boolean;
  customerdata: any;
  email:any;
  name:any;
  imageUrl: any;
  croppedImage: any;
  imageChangedEvent: any;
  imageSelected: boolean;
  imageInpt: any;

  environment = environment;
  image : any = null;
 
  constructor(private router:Router,private formBuilder:FormBuilder,
    private sanitizer: DomSanitizer,private userservice:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email:  ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{3}\d{3}\d{4}$/)
    ]],
      filename:null,
    });

    let data =  JSON.parse( localStorage.getItem('user_login'));

    console.log("uerdata--",data);
    this.id= data.userId;
   
  this.getProfile();
  
}
getProfile(){
  this.loader = true;
  if(this.id){
    console.log("id---",this.id)
    this.userservice.getcustomerByid({_id: this.id}).subscribe((res: any) => {
      this.loader = false;
      console.log("img-->",res.data)
      this.customerdata = res.data;
      this.image =`${environment.imageurl}${res.data.imagefile}`;
      this.editForm.patchValue({
        name: res.data.name,
        email: res.data.email,
        phonenumber:res.data.phonenumber
      })
    })
  }
}

  private prepareSave(): any {
    let inputData = new FormData();
    inputData.append('_id', this.id);
    inputData.append('name', this.editForm.get('name').value);
    inputData.append('email', this.editForm.get('email').value);
    inputData.append('phonenumber', this.editForm.get('phonenumber').value);
    inputData.append('filename', this.editForm.get('filename').value)
    return inputData;
  }
  update() {
    // console.log("this.addUserForm.valid", this.addAttendeesForm.valid)
    // console.log("this.addUserForm", this.addAttendeesForm)
    if (this.editForm.valid) {
      let formModel = this.prepareSave();
      
      
      this.userservice.updatecustomerData(formModel).subscribe((res: any) => {
        if (res && res.code ==200) {
          this.toastr.success(res.message);
         // this.routers.navigate(['pages/faq']);
        } else {
          console.log("Add Faq Error")
          this.toastr.error(res.message);
        }
      })
    }
  }
    
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode, 'charCode++++')
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onSelectFile(event) {
    
    console.log(event,'error')
    if (event && event.target && event.target.files[0].size > 5072000) {
      // this.toastr.error("File Size should be less then 5 MB");
      this.imageInpt.nativeElement.value = "";
    }
    else {
      let file = event.target.files[0];
      let re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
      if (!re.exec(file.name)) {
        this.toastr.error("File type not supported!");
        return;
      }
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) =>{
        this.imageUrl = (<FileReader>event.target).result;
        this.image = this.imageUrl;
      }

      reader.onloadend = (event: ProgressEvent) => {
      }
      reader.readAsDataURL(event.target.files[0]);

      this.editForm.get('filename').setValue(file);
    }
  }
  onSelectImage(){
    this.imageUrl = this.croppedImage;
    let file = this.base64ToFile(this.croppedImage,this.imageChangedEvent.target.files[0].name)
    console.log(file,"filetorestuz");
    this.editForm.get('filename').setValue(file);
    this.imageChangedEvent='';
    this.imageSelected = false;
    this.croppedImage = false;
  }
  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
  
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
}
