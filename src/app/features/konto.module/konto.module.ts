import {NgModule} from '@angular/core';
import {CommonsModule} from '../../commons.module/commons.module';
import {KontoSelectionComponent} from './components/konto-selection/konto-selection.component';
import { SelectionPipe } from './pipes/selection.pipe';

@NgModule({
  declarations: [KontoSelectionComponent, SelectionPipe],
  imports: [
    CommonsModule,
  ],
  exports: [
    KontoSelectionComponent
  ]
})
export class KontoModule {
}
