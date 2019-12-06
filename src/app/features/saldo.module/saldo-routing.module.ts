import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SaldiComponent} from 'src/app/features/saldo.module/components/saldi/saldi.component';
import {IsLoggedInGuard} from 'src/app/features/account.module/guards/is-logged-in.guard';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', children: [
        {path: '', component: SaldiComponent}
      ],
      canActivate: [IsLoggedInGuard]
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class SaldoRoutingModule {
}
