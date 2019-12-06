import {NgModule} from '@angular/core';
import {AccountRoutingModule} from 'src/app/features/account.module/account-routing';
import {CommonsModule} from 'src/app/commons.module/commons.module';
import {AuthenticationInterceptor} from 'src/app/features/account.module/interceptors/authentication.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from 'src/app/features/account.module/components/login/login.component';
import {LogoutComponent} from 'src/app/features/account.module/components/logout/logout.component';
import {RegisterComponent} from 'src/app/features/account.module/components/register/register.component';

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
