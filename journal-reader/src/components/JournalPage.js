import React from "react";
import { useQuery, gql } from "@apollo/client";
import Volumes from "./Volumes";

const JournalPage = ({ journalID }) => {
  const JOURNALS = gql`
    query Journals {
      paginatedReadJournals(limit: 1, offset: 0, ID: ${journalID}) {
        edges {
          node {
            ID
            Title
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          totalCount
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(JOURNALS);
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
