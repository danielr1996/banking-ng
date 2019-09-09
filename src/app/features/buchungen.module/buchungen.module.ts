import {NgModule} from '@angular/core';
import {BuchungenTableComponent} from './components/buchungen-table/buchungen-table.component';
import {CommonsModule} from '../../commons.module/commons.module';
import {BuchungenSmartComponent} from './components/buchungen-smart/buchungen-smart.component';
import {BuchungenChartComponent} from './components/buchungen-chart/buchungen-chart.component';
import {ChartistModule} from "ng-chartist";

@NgModule({
  imports: [
    CommonsModule, ChartistModule
  ],
  exports: [
    BuchungenSmartComponent
  ],
  declarations: [BuchungenTableComponent, BuchungenSmartComponent, BuchungenChartComponent]
})
export class BuchungenModule {
}
