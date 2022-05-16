import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

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
  mobiles!: FormArray;
  constructor(private fb:FormBuilder) { 
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobiles: this.fb.array([this.createMobilGroup()]),
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

  get mobilesList() {
    return this.signupForm.get('mobiles') as FormArray;
  }

  get role() {
    return this.signupForm.get('role');
  }

  submit(){
    this.error = '';
    if (this.signupForm.invalid) {
      if(this.signupForm.value.firstName == '' && this.signupForm.value.lastName == '' && this.signupForm.value.email == '' && this.signupForm.value.mobiles[0].number === '' && this.signupForm.value.role == '') {
        this.error = 'Details can not empty';
      } else if (this.signupForm.value.firstName == '') {
        this.error = 'firstName is empty';
      } else if (this.signupForm.value.lastName == '') {
        this.error = 'lastName is empty';
      } else if (this.signupForm.value.email == '') {
        this.error = 'email is empty';
      } else if (this.signupForm.value.mobiles[0].number === '') {
        this.error = 'Altlease one number is required';
      } else if (this.signupForm.value.role == '') {
        this.error = 'role is empty';
      }
      return;
    }
    this.submitted = true;
    this.successMsg = 'Details are valid';
    
    
  }

  private createMobilGroup() {
    return new FormGroup({
      number: new FormControl('', [Validators.required])
    })
  }

  public removeOrClearEmail(i: number) {
    const emails = this.signupForm.get('mobiles') as FormArray
    if (emails.length > 1) {
      emails.removeAt(i)
    } else {
      emails.reset()
    }
  }

  addMobile() {
    this.mobiles = this.signupForm.get('mobiles') as FormArray;
      this.mobiles.push(this.createMobilGroup());
  }
}
