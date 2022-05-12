import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isOn = false;
  clicked() { this.isOn = !this.isOn; }
  get message() { return `The Drone is ${this.isOn ? 'On' : 'Off'}`; }
  constructor() { }

  ngOnInit(): void {
  }

}
