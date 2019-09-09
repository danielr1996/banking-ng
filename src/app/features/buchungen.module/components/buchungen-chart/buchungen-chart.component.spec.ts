import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungenChartComponent } from './buchungen-chart.component';

describe('BuchungenChartComponent', () => {
  let component: BuchungenChartComponent;
  let fixture: ComponentFixture<BuchungenChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuchungenChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuchungenChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
