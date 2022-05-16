import { TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  const mockedLoginService = jasmine.createSpyObj('LoginService', ['login']);
  const loginService = new LoginService()

  it('login() should called', () => {
    const stubValue = 'stub value';
    mockedLoginService.login.and.returnValue(stubValue);

    // expect(valueServiceSpy.getValue.calls.count()).withContext('spy method was called once').toBe(1);

    console.log(loginService.login('system', 'admin'));
    
    expect(loginService.login('system', 'admin')).toBe('login success');

    expect(mockedLoginService.login.called).toBe(undefined);

    expect(mockedLoginService.login()).toBe(stubValue);
  });

});
