import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BuchungenComponent} from 'src/app/features/buchungen.module/components/buchungen/buchungen.component';
import {IsLoggedInGuard} from 'src/app/features/account.module/guards/is-logged-in.guard';

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
