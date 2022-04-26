import React from "react";
import "./App.css";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import JournalPage from "./Pages/JournalPage";

function App({ element }) {
  const graphqlURL = element.getAttribute("data-graphql-url");
  const journalID = element.getAttribute("data-journal-id");
  return (
    <div className="App">
      <ApolloProvider client={client(graphqlURL)}>
        <div className="App">
          <JournalPage journalID={journalID} />
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
