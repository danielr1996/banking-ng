import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartistModule} from 'ng-chartist';
import {SaldiSmartComponent} from 'src/app/features/saldo.module/components/saldi-smart/saldi-smart.component';
import {SaldoComponent} from 'src/app/features/saldo.module/components/saldo/saldo.component';
import {SaldiChartComponent} from 'src/app/features/saldo.module/components/saldi-chart/saldi-chart.component';
import {SaldiTableComponent} from 'src/app/features/saldo.module/components/saldi-table/saldi-table.component';
import {SaldiComponent} from 'src/app/features/saldo.module/components/saldi/saldi.component';
import {SaldoRoutingModule} from 'src/app/features/saldo.module/saldo-routing.module';
import { SaldoPipe } from './pipes/saldo.pipe';

@NgModule({
  declarations: [
    SaldoComponent,
    SaldiSmartComponent,
    SaldiChartComponent,
    SaldiTableComponent,
    SaldiComponent,
    SaldoPipe],
  imports: [
    CommonModule,
    ChartistModule,
    SaldoRoutingModule
  ],
  exports: [
    SaldoComponent,
  ],

})
export class SaldoModule {
}
