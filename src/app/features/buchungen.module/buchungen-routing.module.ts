import {NgModule} from '@angular/core';
import {BuchungenComponent} from './components/buchungen/buchungen.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', component: BuchungenComponent
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class BuchungenRoutingModule {
}
