import React, { useEffect, useState } from "react";
import api from "../api";
import Articles from "./Articles";
import Pagination from "./Pagination";

const Issues = ({ volume, updateContent, activeItem, toggleOnStart }) => {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(false);
  const { data, loading, error } = api.GetIssues(
    volume.ID,
    limit,
    offset,
    !active
  );
  const edges = data && active ? data.paginatedReadIssues.edges : [];
  const total =
    data && active ? data.paginatedReadIssues.pageInfo.totalCount : 0;
  const pagination = active ? (
    <Pagination
      offset={offset}
      setOffset={setOffset}
      limit={limit}
      total={total}
    />
  ) : null;
  const toggleVolume = () => {
    if (!active) updateContent(volume);
    setActive(!active);
  };
  useEffect(() => {
    if (!activeItem && toggleOnStart) {
      toggleVolume();
    }
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
        onClick={() => toggleVolume()}
        className={`${active ? "open" : ""} ${
          activeItem === volume ? "active" : ""
        }`}>
        {volume.Title}
      </button>
      <ul>
        {edges.map(({ node: issue }) => {
          return (
            <li key={issue.ID}>
              <Articles
                issue={issue}
                updateContent={updateContent}
                activeItem={activeItem}
              />
            </li>
          );
        })}
        {pagination}
      </ul>
    </>
  );
};

export default Issues;
