import React from "react";
import { useQuery, gql } from "@apollo/client";

const Volumes = ({ journalID }) => {
  const limit = 2;
  let offset = 0;
  const VOLUMES = gql`
    query Volumes {
      paginatedReadVolumes(limit: ${limit}, offset: ${offset}, JournalID: ${journalID}) {
        edges {
          node {
            ID
            Title
            URLSegment
            CoverURL
            ImageURL
            JournalID
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
  const { data, loading, error } = useQuery(VOLUMES);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  const {
    paginatedReadVolumes: { edges },
  } = data;
  return (
    <div>
      {edges.map(({ node: { ID, Title } }) => {
        return <div key={ID}>{Title}</div>;
      })}
    </div>
  );
};

export default Volumes;
