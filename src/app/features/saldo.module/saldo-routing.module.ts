import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaldoComponent} from './components/saldo/saldo.component';
import {SaldiSmartComponent} from './components/saldi-smart/saldi-smart.component';
import {ChartistModule} from 'ng-chartist';
import {SaldiChartComponent} from './components/saldi-chart/saldi-chart.component';
import {SaldiTableComponent} from './components/saldi-table/saldi-table.component';
import {SaldiComponent} from './components/saldi/saldi.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', component: SaldiComponent
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class SaldoRoutingModule {
}
