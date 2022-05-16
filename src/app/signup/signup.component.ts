import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  roleList: any = [
    {value: 'superAdmin', viewValue: 'Super Admin'},
    {value: 'admin', viewValue: 'Admin'},
    {value: 'user', viewValue: 'User'},
  ];
  signupForm: FormGroup;
  title: string = "Sign up";
  error: string = '';
  successMsg: string = '';
  submitted: boolean = false;
  constructor() { 
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get mobile() {
    return this.signupForm.get('mobile');
  }

  get role() {
    return this.signupForm.get('role');
  }

  submit(){
    this.submitted = true;
    console.log(this.signupForm.value);
    
  }

}
