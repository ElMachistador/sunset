import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyflightsComponent } from './myflights.component';

describe('MyflightsComponent', () => {
  let component: MyflightsComponent;
  let fixture: ComponentFixture<MyflightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyflightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
