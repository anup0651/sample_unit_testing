import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { LoginService } from './login.service';


const validUser = {
  username: 'system',
  password: 'admin'
}

const inValidUser = {
  username: 'system',
  password: 'admin1'
}

const blankUser = {
  username: '',
  password: ''
}

// Component class testing
describe('Login Component Isolated Test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  function updateForm(username: string, password: string) {
    fixture.componentInstance.loginForm.controls['username'].setValue(username);
    fixture.componentInstance.loginForm.controls['password'].setValue(password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.error).toBeDefined();
    expect(component.error).toBe('');
    expect(component.title).toBeDefined();
    expect(component.title).toBe('Login');
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('When submit with blank data', () => {
    updateForm(blankUser.username, blankUser.password);
    component.submit();
    expect(component.error).toBe('username and password are empty')
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('Form value should update with valid mock data - success', (() => {
    updateForm(validUser.username, validUser.password);
    component.submit();
    expect(component.error).toBe('');
    expect(component.successMsg).toBe('Login successfullly')
  }));  

});


// Component DOM testing 
describe('Login Component Shallow Test', () => {

  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(username: string, password: string) {
    fixture.componentInstance.loginForm.controls['username'].setValue(username);
    fixture.componentInstance.loginForm.controls['password'].setValue(password);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('username is empty');
  });

  it('Display Password Error Msg when Password is blank', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('password is empty');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const errMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');

    expect(errMsg).toBeDefined();
    expect(errMsg.innerHTML).toContain('username and password are empty');
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameInput = fixture.debugElement.nativeElement.querySelector('#username-text');
    // const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('is-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('is-invalid');
  });

});


describe('Login Component Integrated Test', () => {

  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(username: string, password: string) {
    fixture.componentInstance.loginForm.controls['username'].setValue(username);
    fixture.componentInstance.loginForm.controls['password'].setValue(password);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });


  it('LoginService login() should success', () => {

    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const loginResponse = fixture.debugElement.nativeElement.querySelector('#login-response');    
    expect(loginResponse).toBeDefined();
    
    expect(loginResponse.innerHTML).toContain('login success');
  });

  it('LoginService login() should success', () => {

    updateForm(inValidUser.username, inValidUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const loginResponse = fixture.debugElement.nativeElement.querySelector('#login-response');    
    expect(loginResponse).toBeDefined();
    
    expect(loginResponse.innerHTML).toContain('login failure');
  });

});
