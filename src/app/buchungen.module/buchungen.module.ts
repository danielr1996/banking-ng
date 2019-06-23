import {NgModule} from '@angular/core';
import { BuchungenComponent } from './buchungen/buchungen.component';
import {Apollo} from 'apollo-angular';

@NgModule({
  exports: [
    BuchungenComponent
  ],
  declarations: [BuchungenComponent]
})
export class BuchungenModule {
}
