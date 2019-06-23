import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from '../graphql.module/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {BuchungenModule} from '../buchungen.module/buchungen.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    BuchungenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
