import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BankingConfiguration} from 'src/app/configuration.module/bankingConfiguration';
import {CONFIG_PROVIDER_TOKEN} from 'src/app/configuration.module/configuration.module';

export function createApollo(httpLink: HttpLink, config: BankingConfiguration): {} {
  return {
    link: httpLink.create({uri: config.graphql.api}),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, CONFIG_PROVIDER_TOKEN],
    },
  ],
})
export class GraphQLModule {
  constructor() {
  }

}
