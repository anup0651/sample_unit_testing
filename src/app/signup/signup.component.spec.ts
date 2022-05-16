import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { SignupComponent } from './signup.component';

const validUser = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@gmail.com',
  mobile: '3453535345',
  role: 'system'
}

const inValidUser = {
  username: 'system',
  password: 'admin1'
}

const blankUser = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  role: ''
}

describe('Signup Component Isolated Test', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;


  function updateForm(firstName: string, lastName: string, email: string, mobile: string, role: string) {
    fixture.componentInstance.signupForm.controls['firstName'].setValue(firstName);
    fixture.componentInstance.signupForm.controls['lastName'].setValue(lastName);
    fixture.componentInstance.signupForm.controls['email'].setValue(email);
    fixture.componentInstance.signupForm.controls['mobiles'].setValue([{number: mobile}]);
    fixture.componentInstance.signupForm.controls['role'].setValue(role);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.error).toBeDefined();
    expect(component.error).toBe('');
    expect(component.title).toBeDefined();
    expect(component.title).toBe('Sign up');
    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('When submit with blank data', () => {
    updateForm(blankUser.firstName, blankUser.lastName, blankUser.email, blankUser.mobile, blankUser.role);
    component.submit();
    expect(component.error).toBe('Details can not empty')
    expect(component.signupForm.invalid).toBeTruthy();
  });

  it('Form value should update with valid mock data', (() => {
    updateForm(validUser.firstName, validUser.lastName, validUser.email, validUser.mobile, validUser.role);
    component.submit();
    expect(component.error).toBe('');
    expect(component.successMsg).toBe('Details are valid')
  }));  
});

// Component DOM Testing
describe('Signup Component Isolated Test', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  function updateForm(firstName: string, lastName: string, email: string, mobile: string, role: string) {
    fixture.componentInstance.signupForm.controls['firstName'].setValue(firstName);
    fixture.componentInstance.signupForm.controls['lastName'].setValue(lastName);
    fixture.componentInstance.signupForm.controls['email'].setValue(email);
    fixture.componentInstance.signupForm.controls['mobiles'].setValue([{number: mobile}]);
    fixture.componentInstance.signupForm.controls['role'].setValue(role);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Check Signup form details', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const firstnameContainer = fixture.debugElement.nativeElement.querySelector('#firstName-text');
    const lastnameContainer = fixture.debugElement.nativeElement.querySelector('#lastName-text');
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email-text');
    expect(firstnameContainer).toBeDefined();
    expect(lastnameContainer).toBeDefined();
    expect(emailContainer).toBeDefined();
  });

  it('Display Error Msg when details are blank', () => {
    updateForm(blankUser.firstName, blankUser.lastName, blankUser.email, blankUser.mobile, blankUser.role);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    button.click();
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.nativeElement.querySelector('#error-msg');
    expect(errorMsg).toBeDefined();
    expect(errorMsg.innerHTML).toContain('Details can not empty');
  });

  it('Display Success Msg when mock details used', () => {
    updateForm(validUser.firstName, validUser.lastName, validUser.email, validUser.mobile, validUser.role);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    button.click();
    fixture.detectChanges();

    const successMsg = fixture.debugElement.nativeElement.querySelector('#successMsg');
    expect(successMsg).toBeDefined();
    expect(successMsg.innerHTML).toContain('Details are valid');
  });


});