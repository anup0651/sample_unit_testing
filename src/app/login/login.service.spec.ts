import { TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  const mockedLoginService = jasmine.createSpyObj('LoginService', ['getValue']);
  const loginService = new LoginService()

  it('login() should called', () => {
    const stubValue = 'stub value';
    mockedLoginService.getValue.and.returnValue(stubValue);

    // expect(valueServiceSpy.getValue.calls.count()).withContext('spy method was called once').toBe(1);
    expect(loginService.getValue()).toBe('hi');

    expect(mockedLoginService.getValue.called).toBe(undefined);

    expect(mockedLoginService.getValue()).toBe(stubValue);
  });

});
