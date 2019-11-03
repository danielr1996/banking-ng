import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AccountRoutingModule} from 'src/app/features/account.module/account-routing';
import {CommonsModule} from 'src/app/commons.module/commons.module';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  exports: [
    LogoutComponent
  ],
  imports: [
    CommonsModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
