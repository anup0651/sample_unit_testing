import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 error: string = '';
 successMsg: string = '';
 title: string = 'Login';
  loginForm: FormGroup;
  loginResponse: string | Error = 'test';
  submitted = false;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder,) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    
    
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      if(this.loginForm.value.username == '' && this.loginForm.value.password == '') {
        this.error = 'username and password are empty';
      } else if (this.loginForm.value.username == '') {
        this.error = 'username is empty';
      } else if (this.loginForm.value.password == '') {
        this.error = 'password is empty';
      }
      return;
    }
    this.error = '';
    if (this.loginForm.valid) {
        this.loginResponse = this.loginService.login(this.loginForm.value.username, this.loginForm.value.password);
        this.successMsg = 'Login successfullly';
      
    }
  }

}
