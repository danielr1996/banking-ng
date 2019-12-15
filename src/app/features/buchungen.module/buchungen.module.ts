import {NgModule} from '@angular/core';
import {CommonsModule} from 'src/app/commons.module/commons.module';
import {BuchungenRoutingModule} from 'src/app/features/buchungen.module/buchungen-routing.module';
import {BuchungenTableComponent} from 'src/app/features/buchungen.module/components/buchungen-table/buchungen-table.component';
import {BuchungenSmartComponent} from 'src/app/features/buchungen.module/components/buchungen-smart/buchungen-smart.component';
import {BuchungenChartComponent} from 'src/app/features/buchungen.module/components/buchungen-chart/buchungen-chart.component';
import {BuchungenComponent} from 'src/app/features/buchungen.module/components/buchungen/buchungen.component';

@NgModule({
  imports: [
    CommonsModule, BuchungenRoutingModule
  ],
  exports: [
    // BuchungenComponent
  ],
  declarations: [BuchungenTableComponent, BuchungenSmartComponent, BuchungenChartComponent, BuchungenComponent]
})
export class BuchungenModule {
}
