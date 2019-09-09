import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedTableComponent } from './combined-table.component';

describe('BuchungenTableComponent', () => {
  let component: CombinedTableComponent;
  let fixture: ComponentFixture<CombinedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
