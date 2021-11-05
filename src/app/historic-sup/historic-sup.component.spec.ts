import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricSupComponent } from './historic-sup.component';

describe('HistoricSupComponent', () => {
  let component: HistoricSupComponent;
  let fixture: ComponentFixture<HistoricSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricSupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
