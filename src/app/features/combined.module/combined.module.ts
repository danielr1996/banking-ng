import {NgModule} from '@angular/core';
import {CombinedTableComponent} from './components/combined-table/combined-table.component';
import {CommonsModule} from '../../commons.module/commons.module';
import {CombinedSmartComponent} from './components/combined-smart/combined-smart.component';
import {CombinedChartComponent} from './components/combined-chart/combined-chart.component';
import {ChartistModule} from 'ng-chartist';
import {CombinedComponent} from './components/combined/combined.component';
import {CombinedRoutingModule} from './components/combined-routing.module';

@NgModule({
  declarations: [
    CombinedTableComponent,
    CombinedSmartComponent,
    CombinedChartComponent,
    CombinedComponent
  ],
  imports: [
    CommonsModule,
    ChartistModule,
    CombinedRoutingModule
  ],
  exports: [
    CombinedSmartComponent
  ],
})
export class CombinedModule {
}
