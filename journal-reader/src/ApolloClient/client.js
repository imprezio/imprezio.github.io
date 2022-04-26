import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

export const client = (url) => {
  const httpLink = new HttpLink({
    uri: url,
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink]),
  });
};
