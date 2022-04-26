import { useQuery, gql } from "@apollo/client";

const api = {
  GetJournal: (journalID) => {
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
    return useQuery(JOURNALS);
  },
  GetVolumes: (journalID, limit, offset) => {
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
    return useQuery(VOLUMES);
  },
};

export default api;