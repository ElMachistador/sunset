import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnaroundComponent } from './turnaround.component';

describe('TurnaroundComponent', () => {
  let component: TurnaroundComponent;
  let fixture: ComponentFixture<TurnaroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnaroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnaroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
