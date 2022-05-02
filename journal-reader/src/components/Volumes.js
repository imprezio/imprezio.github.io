import React, { useEffect, useState } from "react";
import api from "../api";
import Issues from "./Issues";
import Pagination from "./Pagination";

const Volumes = ({ journalID, updateContent, activeItem }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = api.GetVolumes(journalID, limit, offset);
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
  const { paginatedReadVolumes } = data;
  const { edges } = paginatedReadVolumes;
  const total = paginatedReadVolumes.pageInfo.totalCount;
  return (
    <>
      <ul>
        {edges.map(({ node: volume }, index) => {
          return (
            <li key={volume.ID}>
              <Issues
                volume={volume}
                issueID={volume.ID}
                updateContent={updateContent}
                activeItem={activeItem}
                toggleOnStart={!index}
              />
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

export default Volumes;
