import React from "react";
import ReactDOM from "react-dom/client";
import { useQuery, gql } from "@apollo/client";

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
    </div>
  );
};

export default JournalPage;
