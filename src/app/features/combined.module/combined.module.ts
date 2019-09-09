import {NgModule} from '@angular/core';
import {CombinedTableComponent} from './components/combined-table/combined-table.component';
import {CommonsModule} from '../../commons.module/commons.module';
import {CombinedSmartComponent} from './components/combined-smart/combined-smart.component';
import {CombinedChartComponent} from './components/combined-chart/combined-chart.component';
import {ChartistModule} from "ng-chartist";

@NgModule({
  imports: [
    CommonsModule, ChartistModule
  ],
  exports: [
    CombinedSmartComponent
  ],
  declarations: [CombinedTableComponent, CombinedSmartComponent, CombinedChartComponent]
})
export class CombinedModule {
}
