import React, { useEffect, useState } from "react";
import api from "../api";
import Pagination from "./Pagination";

const Issues = ({ volume: { ID, Title } }) => {
  const limit = 25;
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = api.GetIssues(ID, limit, offset);
  const edges = data ? data.paginatedReadIssues.edges : [];
  const total = data ? data.paginatedReadIssues.pageInfo.totalCount : 0;
  useEffect(() => {
    //
  }, [loading, offset]);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  return (
    <>
      <button>{Title}</button>
      <ul>
        {edges.map(({ node: issue }) => {
          return (
            <li key={issue.ID}>
              <button>{issue.Title}</button>
            </li>
          );
        })}
        <Pagination
          offset={offset}
          setOffset={setOffset}
          limit={limit}
          total={total}
        />
      </ul>
    </>
  );
};

export default Issues;
