import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldiChartComponent } from './saldi-chart.component';

describe('SaldiChartComponent', () => {
  let component: SaldiChartComponent;
  let fixture: ComponentFixture<SaldiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
