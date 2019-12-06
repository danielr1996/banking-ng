import {NgModule} from '@angular/core';
import {SelectionPipe} from 'src/app/features/konto.module/pipes/selection.pipe';
import {
  OuterKontoSelectionComponent,
  InnerKontoSelectionComponent
} from 'src/app/features/konto.module/components/konto-selection/konto-selection-component.component';
import {CommonsModule} from 'src/app/commons.module/commons.module';

@NgModule({
  declarations: [SelectionPipe, InnerKontoSelectionComponent, OuterKontoSelectionComponent],
  imports: [
    CommonsModule,
  ],
  exports: [
    OuterKontoSelectionComponent
  ]
})
export class KontoModule {
}
