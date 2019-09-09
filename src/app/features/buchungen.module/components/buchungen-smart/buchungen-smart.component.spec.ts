import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungenSmartComponent } from './buchungen-smart.component';

describe('BuchungenSmartComponent', () => {
  let component: BuchungenSmartComponent;
  let fixture: ComponentFixture<BuchungenSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuchungenSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuchungenSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
