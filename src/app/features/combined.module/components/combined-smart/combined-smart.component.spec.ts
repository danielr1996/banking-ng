import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedSmartComponent } from './combined-smart.component';

describe('BuchungenSmartComponent', () => {
  let component: CombinedSmartComponent;
  let fixture: ComponentFixture<CombinedSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinedSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
