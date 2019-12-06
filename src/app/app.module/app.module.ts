import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {environment} from 'src/environments/environment';
import {AppRoutingModule} from 'src/app/app.module/app-routing.module';
import {AppComponent} from 'src/app/app.module/app/app.component';
import {DashboardComponent} from 'src/app/app.module/dashboard/dashboard.component';
import {ErrorComponent} from 'src/app/app.module/error/error.component';
import {GraphQLModule} from 'src/app/graphql.module/graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {RefreshModule} from 'src/app/features/refresh/refresh.module';
import {SaldoModule} from 'src/app/features/saldo.module/saldo.module';
import {KontoModule} from 'src/app/features/konto.module/konto.module';
import {AccountModule} from 'src/app/features/account.module/account.module';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';

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
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
