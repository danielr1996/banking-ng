import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {GraphQLModule} from '../graphql.module/graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RefreshModule} from '../features/refresh/refresh.module';
import {SaldoModule} from '../features/saldo.module/saldo.module';
import {KontoModule} from '../features/konto.module/konto.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    RefreshModule,
    SaldoModule,
    KontoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
