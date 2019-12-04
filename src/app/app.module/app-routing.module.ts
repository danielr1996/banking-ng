import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {IsLoggedInGuard} from '../features/account.module/guards/is-logged-in.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'buchungen',
        loadChildren: () => import('../features/buchungen.module/buchungen.module').then(m => m.BuchungenModule)
      },
      {
        path: 'saldi',
        loadChildren: () => import('../features/saldo.module/saldo.module').then(m => m.SaldoModule)
      },
      {
        path: 'combined',
        loadChildren: () => import('../features/combined.module/combined.module').then(m => m.CombinedModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../features/account.module/account.module').then(m => m.AccountModule)
      },
      {
        path: '', children: [
          {
            path: '', component: DashboardComponent,
          },
          {
            path: '**', component: DashboardComponent,
          },
        ], canActivate: [IsLoggedInGuard]
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}