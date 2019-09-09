import {NgModule} from '@angular/core';
import {BuchungenTableComponent} from './components/buchungen-table/buchungen-table.component';
import {CommonsModule} from '../../commons.module/commons.module';
import { BuchungenSmartComponent } from './components/buchungen-smart/buchungen-smart.component';

@NgModule({
  imports: [
    CommonsModule,
  ],
  exports: [
    BuchungenSmartComponent
  ],
  declarations: [BuchungenTableComponent, BuchungenSmartComponent]
})
export class BuchungenModule {
}
