import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(username: string, password: string) {

    if (username === 'system' && password === 'admin') {
      return 'login success';
    } else {
      return new Error('login failure');
    }
  }
}
