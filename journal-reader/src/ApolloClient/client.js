import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const element = document.getElementById("journal-reader");
const url = element.getAttribute("graphql-url");

const httpLink = new HttpLink({
  uri: element.getAttribute("graphql-url"),
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
