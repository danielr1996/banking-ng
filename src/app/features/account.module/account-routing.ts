import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from 'src/app/features/account.module/components/login/login.component';
import {RegisterComponent} from 'src/app/features/account.module/components/register/register.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login'},
  ])],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
