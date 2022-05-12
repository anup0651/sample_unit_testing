import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  submit() {
    this.error = '';
    if (this.loginForm.valid) {
      if(this.loginForm.value.username == '' && this.loginForm.value.password == ''){
        this.error = 'username and password are empty';
      } else if (this.loginForm.value.username == '') {
        this.error = 'username is empty';
      } else if (this.loginForm.value.password == '') {
        this.error = 'password is empty';
      } else {
        this.successMsg = 'Login successfullly';
      }

      
    }
  }

}
