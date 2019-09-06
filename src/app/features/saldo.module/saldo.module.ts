import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaldoComponent} from './components/saldo/saldo.component';
import {SaldiComponent} from './components/saldi/saldi.component';
import {ChartistModule} from 'ng-chartist';

@NgModule({
  declarations: [SaldoComponent, SaldiComponent],
  exports: [
    SaldoComponent, SaldiComponent
  ],
  imports: [
    CommonModule, ChartistModule
  ]
})
export class SaldoModule {
}
