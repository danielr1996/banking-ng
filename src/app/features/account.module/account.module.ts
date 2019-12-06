import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AccountRoutingModule} from 'src/app/features/account.module/account-routing';
import {CommonsModule} from 'src/app/commons.module/commons.module';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthenticationInterceptor} from 'src/app/features/account.module/interceptors/authentication.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  exports: [
    LogoutComponent
  ],
  imports: [
    CommonsModule,
    AccountRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
  ]
})
export class AccountModule {
}
