import {NgModule} from '@angular/core';
import {BuchungenComponent} from './components/buchungen/buchungen.component';
import {RouterModule} from '@angular/router';
import {IsLoggedInGuard} from '../../authorization/is-logged-in-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', children: [
        {path: '', component: BuchungenComponent}
      ],
      canActivate: [IsLoggedInGuard]
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class BuchungenRoutingModule {
}
