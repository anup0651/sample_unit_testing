import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  // login() {
  //   console.log('entered');
  //   return 'success';
  // }

  getValue() {
    return 'hi'
  }
}
