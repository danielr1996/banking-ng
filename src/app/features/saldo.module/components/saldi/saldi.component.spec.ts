import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldiComponent } from './saldi.component';

describe('SaldiComponent', () => {
  let component: SaldiComponent;
  let fixture: ComponentFixture<SaldiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
