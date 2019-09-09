import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaldoComponent} from './components/saldo/saldo.component';
import {SaldiSmartComponent} from './components/saldi-smart/saldi-smart.component';
import {ChartistModule} from 'ng-chartist';
import { SaldiChartComponent } from './components/saldi-chart/saldi-chart.component';

@NgModule({
  declarations: [SaldoComponent, SaldiSmartComponent, SaldiChartComponent],
  exports: [
    SaldoComponent, SaldiSmartComponent
  ],
  imports: [
    CommonModule, ChartistModule
  ]
})
export class SaldoModule {
}
