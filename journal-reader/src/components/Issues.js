import React, { useEffect, useState } from "react";
import api from "../api";
import Articles from "./Articles";
import Pagination from "./Pagination";

const Issues = ({ volume: { ID, Title } }) => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(false);
  const { data, loading, error } = api.GetIssues(ID, limit, offset);
  const edges = data && active ? data.paginatedReadIssues.edges : [];
  const total =
    data && active ? data.paginatedReadIssues.pageInfo.totalCount : 0;
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
      <button
        onClick={() => {
          setActive(!active);
        }}>
        {Title}
      </button>
      <ul>
        {edges.map(({ node: issue }) => {
          return (
            <li key={issue.ID}>
              <Articles issue={issue} />
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
