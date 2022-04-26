import React, { useEffect, useState } from "react";
import api from "../api";

const Volumes = ({ journalID }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = api.GetVolumes(journalID, limit, offset);
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
  const { paginatedReadVolumes } = data;
  const { edges } = paginatedReadVolumes;
  const total = paginatedReadVolumes.pageInfo.totalCount;
  const prevButton =
    offset > 0 ? (
      <button
        onClick={() => {
          setOffset(offset - limit);
        }}>
        Prev
      </button>
    ) : null;
  console.log("start");
  console.log(offset + limit);
  console.log(total - 1);
  const nextButton =
    offset + limit < total && total > limit ? (
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
