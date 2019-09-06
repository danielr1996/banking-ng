import {NgModule} from '@angular/core';
import {BuchungenComponent} from './components/buchungen/buchungen.component';
import {CommonsModule} from '../../commons.module/commons.module';

@NgModule({
  imports: [
    CommonsModule,
  ],
  exports: [
    BuchungenComponent
  ],
  declarations: [BuchungenComponent]
})
export class BuchungenModule {
}
