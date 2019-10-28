import {NgModule} from '@angular/core';
import {CommonsModule} from '../../commons.module/commons.module';
import {KontoSelectionComponent} from './components/konto-selection/konto-selection.component';

@NgModule({
  declarations: [KontoSelectionComponent],
  imports: [
    CommonsModule,
  ],
  exports: [
    KontoSelectionComponent
  ]
})
export class KontoModule {
}
