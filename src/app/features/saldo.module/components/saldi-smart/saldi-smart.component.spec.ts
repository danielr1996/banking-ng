import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldiSmartComponent } from './saldi-smart.component';

describe('SaldiSmartComponent', () => {
  let component: SaldiSmartComponent;
  let fixture: ComponentFixture<SaldiSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldiSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldiSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
