import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagniesComponent } from './compagnies.component';

describe('CompagniesComponent', () => {
  let component: CompagniesComponent;
  let fixture: ComponentFixture<CompagniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
