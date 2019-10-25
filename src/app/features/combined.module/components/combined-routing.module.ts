import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CombinedComponent} from './combined/combined.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', component: CombinedComponent
    }])
  ],
  exports: [
    RouterModule
  ],
})
export class CombinedRoutingModule {
}
