import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldiTableComponent } from './saldi-table.component';

describe('SaldiTableComponent', () => {
  let component: SaldiTableComponent;
  let fixture: ComponentFixture<SaldiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
