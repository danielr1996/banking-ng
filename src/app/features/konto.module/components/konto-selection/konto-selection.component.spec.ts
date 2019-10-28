import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoSelectionComponent } from './konto-selection.component';

describe('KontoSelectionComponent', () => {
  let component: KontoSelectionComponent;
  let fixture: ComponentFixture<KontoSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
