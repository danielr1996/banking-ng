import {NgModule} from '@angular/core';
import {CombinedSmartComponent} from 'src/app/features/combined.module/components/combined-smart/combined-smart.component';
import {CombinedTableComponent} from 'src/app/features/combined.module/components/combined-table/combined-table.component';
import {CombinedChartComponent} from 'src/app/features/combined.module/components/combined-chart/combined-chart.component';
import {CombinedComponent} from 'src/app/features/combined.module/components/combined/combined.component';
import {CommonsModule} from 'src/app/commons.module/commons.module';
import {CombinedRoutingModule} from 'src/app/features/combined.module/components/combined-routing.module';

@NgModule({
  declarations: [
    CombinedTableComponent,
    CombinedSmartComponent,
    CombinedChartComponent,
    CombinedComponent
  ],
  imports: [
    CommonsModule,
    CombinedRoutingModule
  ],
  exports: [
    CombinedSmartComponent
  ],
})
export class CombinedModule {
}
