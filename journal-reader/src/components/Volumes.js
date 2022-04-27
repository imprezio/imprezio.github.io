import React, { useEffect, useState } from "react";
import api from "../api";
import Issues from "./Issues";

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
  const nextButton =
    offset + limit < total && total > limit ? (
      <button
        onClick={() => {
          setOffset(offset + limit);
        }}>
        Next
      </button>
    ) : null;
  const buttons =
    prevButton || nextButton ? (
      <li>
        {prevButton}
        {nextButton}
      </li>
    ) : null;
  return (
    <ul>
      {edges.map(({ node: volume }) => {
        return (
          <li key={volume.ID}>
            <Issues volume={volume} issueID={volume.ID} />
          </li>
        );
      })}
      {buttons}
    </ul>
  );
};

export default Volumes;
