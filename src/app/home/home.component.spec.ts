import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  it('Intital Drone Isoff', () => {
    const comp = new HomeComponent();

    // Class Test
    expect(comp.isOn)
      .withContext('off at first')
      .toBe(false);
    
  });

  it('(clicked) Verify Drone #Ison', () => {
    const comp = new HomeComponent();
    comp.clicked();
    expect(comp.isOn)
      .withContext('on after click')
      .toBe(true);
  });

  it('Verify Drone Message when #Is off', () => {
    const comp = new HomeComponent();

    expect(comp.message)
      .withContext('off after second click')
      .toBe('The Drone is Off');
  });

  it('(clicked) Verify Drone #Is on', () => {
    const comp = new HomeComponent();
    comp.clicked();
    expect(comp.isOn)
      .withContext('on after click')
      .toBe(true);
  });

  // it('Verify Drone Message when #Is On', () => {
  //   const comp = new HomeComponent();

  //   expect(comp.message)
  //     .withContext('On after second click')
  //     .toBe('The Drone is On');
  // });

});
