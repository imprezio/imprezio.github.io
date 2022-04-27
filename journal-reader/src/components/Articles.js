import React, { useEffect, useState } from "react";
import api from "../api";
import Pagination from "./Pagination";

const Articles = ({ issue: { ID, Title } }) => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(false);
  const { data, loading, error } = api.GetArticles(ID, limit, offset);
  const edges = data && active ? data.paginatedReadArticles.edges : [];
  const total =
    data && active ? data.paginatedReadArticles.pageInfo.totalCount : 0;
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
        {edges.map(({ node: { ID, Title } }) => {
          return (
            <li key={ID}>
              <button>{Title}</button>
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

export default Articles;
