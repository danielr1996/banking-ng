import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CombinedComponent} from './combined/combined.component';
import {IsLoggedInGuard} from '../../account.module/guards/is-logged-in.guard';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', children: [
        {path: '', component: CombinedComponent}
      ], canActivate: [IsLoggedInGuard]
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class CombinedRoutingModule {
}
