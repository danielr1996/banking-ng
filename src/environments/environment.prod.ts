import {BankingConfiguration} from 'src/app/configuration.module/bankingConfiguration';

export const environment: { production: boolean, config: BankingConfiguration } = {
  production: true,
  config: {
    graphql: {
      api: '${GRAPHQL_API}'
    }
  }
};

