import React, { useEffect, useState } from "react";
import api from "../api";
import Pagination from "./Pagination";

const Articles = ({ issue, updateContent, activeItem }) => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const { data, loading, error } = api.GetArticles(
    issue.ID,
    limit,
    offset,
    !active
  );
  const edges = data && active ? data.paginatedReadArticles.edges : [];
  const total =
    data && active ? data.paginatedReadArticles.pageInfo.totalCount : 0;
  const pagination = active ? (
    <Pagination
      offset={offset}
      setOffset={setOffset}
      limit={limit}
      total={total}
    />
  ) : null;
  useEffect(() => {
    //
  }, [loading, offset]);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  return (
    <>
      <button
        onClick={() => {
          updateContent(issue);
          setActive(!active);
          setActiveArticle(null);
        }}
        className={`${active ? "open" : ""} ${
          activeItem === issue ? "active" : ""
        }`}>
        {issue.Title}
      </button>
      <ul>
        {edges.map(({ node: article }) => {
          return (
            <li key={article.ID}>
              <button
                onClick={() => {
                  updateContent(article);
                  setActiveArticle(article);
                }}
                className={`${activeArticle === article ? "active" : ""}`}>
                {article.Title}
              </button>
            </li>
          );
        })}
        {pagination}
      </ul>
    </>
  );
};

export default Articles;
