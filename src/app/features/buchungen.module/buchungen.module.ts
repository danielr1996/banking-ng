import {NgModule} from '@angular/core';
import {BuchungenTableComponent} from './components/buchungen-table/buchungen-table.component';
import {CommonsModule} from '../../commons.module/commons.module';
import {BuchungenSmartComponent} from './components/buchungen-smart/buchungen-smart.component';
import {BuchungenChartComponent} from './components/buchungen-chart/buchungen-chart.component';
import {ChartistModule} from 'ng-chartist';
import { BuchungenComponent } from './components/buchungen/buchungen.component';
import {BuchungenRoutingModule} from './buchungen-routing.module';

@NgModule({
  imports: [
    CommonsModule, ChartistModule, BuchungenRoutingModule
  ],
  exports: [
    // BuchungenComponent
  ],
  declarations: [BuchungenTableComponent, BuchungenSmartComponent, BuchungenChartComponent, BuchungenComponent]
})
export class BuchungenModule {
}
