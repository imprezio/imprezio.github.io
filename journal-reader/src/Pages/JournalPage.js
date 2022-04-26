import React from "react";
import { useQuery, gql } from "@apollo/client";

const journalID = document
  .getElementById("journal-reader")
  .getAttribute("journal-id");

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

// const VOLUMES = gql`
// query Volumes {
//   paginatedReadVolumes(limit: 25, offset: 0, JournalID: 1) {
//     edges {
//       node {
//         ID
// 				Title
// 				URLSegment
// 				CoverURL
// 				ImageURL
// 				JournalID
//       }
//     }
//     pageInfo {
//       hasNextPage
//       hasPreviousPage
//       totalCount
//     }
//   }
// }`;

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
