import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SaldiComponent} from 'src/app/features/saldo.module/components/saldi/saldi.component';
import {IsLoggedInGuard} from 'src/app/features/account.module/guards/is-logged-in.guard';
import {KontenComponent} from 'src/app/features/konto.module/components/konten/konten.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', children: [
        {path: '', component: KontenComponent}
      ],
      canActivate: [IsLoggedInGuard]
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class KontoRoutingModule {
}
