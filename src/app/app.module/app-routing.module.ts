import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

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
        path: '', component: DashboardComponent,
      },
      {
        path: '**', component: DashboardComponent,
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
