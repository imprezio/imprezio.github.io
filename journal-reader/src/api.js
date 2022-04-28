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
              Content
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
  GetIssues: (volumeID, limit, offset, skip) => {
    const ISSUES = gql`
    query Issues {
        paginatedReadIssues(limit: ${limit}, offset: ${offset}, VolumeID: ${volumeID}) {
          edges {
            node {
              ID
                Title
                URLSegment
                DOI
                Number
                Year
                FileURL
                CoverURL
                VolumeID
                Content
                Authors {
                    ID
                    FirstName
                    Surname
                }
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
    return useQuery(ISSUES, { skip: skip });
  },
  GetArticles: (issueID, limit, offset, skip) => {
    const ISSUES = gql`
    query Articles {
        paginatedReadArticles(limit: ${limit}, offset: ${offset}, IssueID: ${issueID}) {
          edges {
            node {
              ID
                Title
                URLSegment
                DOI
                Content
                ArticleType
                FileURL
                IssueID
                Authors {
                    ID
                    FirstName
                    Surname
                }
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
    return useQuery(ISSUES, { skip: skip });
  },
};

export default api;
