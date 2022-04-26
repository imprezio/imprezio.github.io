import React from "react";
import Volumes from "./Volumes";
import api from "../api";

const JournalPage = ({ journalID }) => {
  const { data, loading, error } = api.GetJournal(journalID);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  const { Title } = data.paginatedReadJournals.edges[0].node;
  return (
    <div>
      <h1>{Title}</h1>
      <Volumes journalID={journalID} />
    </div>
  );
};

export default JournalPage;
