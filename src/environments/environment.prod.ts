export const environment: any = {
  production: true,
  config: {
    graphql: {
      api: '${GRAPHQL_API}'
    }
  }
};

export interface Configuration {
  graphql: {
    api: string
  };
}
