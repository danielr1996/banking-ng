import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoSelectionComponentDumb } from './konto-selection-component.component';

describe('KontoSelectionComponent', () => {
  let component: KontoSelectionComponentDumb;
  let fixture: ComponentFixture<KontoSelectionComponentDumb>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoSelectionComponentDumb ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoSelectionComponentDumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
