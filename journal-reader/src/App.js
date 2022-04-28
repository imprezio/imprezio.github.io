import React from "react";
import "./App.css";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import JournalPage from "./components/JournalPage";

function App({ element }) {
  const graphqlURL = element.getAttribute("data-graphql-url");
  const journalID = element.getAttribute("data-journal-id");
  return (
    <div className="journal-reader">
      <ApolloProvider client={client(graphqlURL)}>
        <JournalPage journalID={journalID} />
      </ApolloProvider>
    </div>
  );
}

export default App;
