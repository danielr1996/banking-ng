import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {GraphQLModule} from '../graphql.module/graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RefreshModule} from '../features/refresh/refresh.module';
import {SaldoModule} from '../features/saldo.module/saldo.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
