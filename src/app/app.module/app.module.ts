import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from 'src/app/app.module/app-routing.module';
import {AppComponent} from 'src/app/app.module/components/app/app.component';
import {DashboardComponent} from 'src/app/app.module/components/dashboard/dashboard.component';
import {ErrorComponent} from 'src/app/app.module/components/error/error.component';
import {GraphQLModule} from 'src/app/graphql.module/graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {RefreshModule} from 'src/app/features/refresh/refresh.module';
import {SaldoModule} from 'src/app/features/saldo.module/saldo.module';
import {KontoModule} from 'src/app/features/konto.module/konto.module';
import {AccountModule} from 'src/app/features/account.module/account.module';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from 'src/environments/environment';
import {ConfigurationModule} from 'src/app/configuration.module/configuration.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    RefreshModule,
    SaldoModule,
    KontoModule,
    AccountModule,
    ConfigurationModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
