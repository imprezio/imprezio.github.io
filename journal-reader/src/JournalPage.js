import React from "react";
import { useQuery, gql } from "@apollo/client";

const JOURNALS = gql`
  query Journals {
    paginatedReadJournals(limit: 1, offset: 0) {
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

const JournalPage = () => {
  const { data, loading, error } = useQuery(JOURNALS);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  const { Title } = data.paginatedReadJournals.edges[0].node;
  return (
    <div>
      <h1>{Title}</h1>
    </div>
  );
};

export default JournalPage;
