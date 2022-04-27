import React, { useEffect, useState } from "react";
import api from "../api";

const Issues = ({ volume: { ID, Title } }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(false);
  const [issues, setIssues] = useState([]);
  const { data, loading, error } = api.GetIssues(ID, limit, offset);
  let issueData = null;
  if (data) {
    const { paginatedReadIssues } = data;
    issueData = paginatedReadIssues.edges;
    const total = paginatedReadIssues.pageInfo.totalCount;
  }
  useEffect(() => {
    if (active && issueData) {
      setIssues(issueData);
    } else {
      setIssues([]);
    }
  }, [active]);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  const issueElements = issues.map(({ node: issue }) => {
    return (
      <li key={issue.ID}>
        <button>{issue.Title}</button>
      </li>
    );
  });
  return (
    <>
      <button
        onClick={() => {
          setActive(!active);
        }}>
        {Title}
      </button>
      <ul>{issueElements}</ul>
    </>
  );
};

export default Issues;
