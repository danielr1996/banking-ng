import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankingConfiguration} from 'src/app/configuration.module/bankingConfiguration';
import {environment} from 'src/environments/environment';


export const CONFIG_PROVIDER_TOKEN: InjectionToken<BankingConfiguration> = new InjectionToken<BankingConfiguration>('CONFIG_PROVIDER_TOKEN');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: CONFIG_PROVIDER_TOKEN, useValue: environment.config},
  ],
})
export class ConfigurationModule { }
