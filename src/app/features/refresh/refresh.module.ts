import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefreshComponent} from 'src/app/features/refresh/components/refresh/refresh.component';

@NgModule({
  declarations: [
    RefreshComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RefreshComponent
  ],
})
export class RefreshModule {
}
