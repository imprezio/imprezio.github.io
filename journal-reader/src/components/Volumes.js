import React, { useEffect, useState } from "react";
import api from "../api";

const Volumes = ({ journalID }) => {
  const limit = 2;
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = api.GetVolumes(journalID, limit, offset);
  useEffect(() => {
    console.log("useEffect");
    console.log(data);
  }, [loading, offset]);
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
  const prevButton =
    offset > 0 ? (
      <button
        onClick={() => {
          setOffset(offset - limit);
        }}>
        Prev
      </button>
    ) : null;
  const nextButton =
    offset <= limit ? (
      <button
        onClick={() => {
          setOffset(offset + limit);
        }}>
        Next
      </button>
    ) : null;
  return (
    <div>
      <ul>
        {edges.map(({ node: { ID, Title } }) => {
          return <li key={ID}>{Title}</li>;
        })}
      </ul>
      {prevButton}
      {nextButton}
    </div>
  );
};

export default Volumes;
