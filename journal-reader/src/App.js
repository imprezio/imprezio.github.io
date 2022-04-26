import React from "react";
import "./App.css";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import JournalPage from "./Pages/JournalPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <JournalPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
