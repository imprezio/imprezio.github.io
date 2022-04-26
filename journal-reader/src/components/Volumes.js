import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import api from "../api";

const Volumes = ({ journalID }) => {
  const limit = 2;
  const offset = 0;
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log("useEffect");
  }, [page]);
  const { data, loading, error } = api.GetVolumes(journalID, limit, offset);
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
  return (
    <div>
      <ul>
        {edges.map(({ node: { ID, Title } }) => {
          return <li key={ID}>{Title}</li>;
        })}
      </ul>
      <button
        onClick={() => {
          setPage(page - 1);
        }}>
        Prev
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}>
        Next
      </button>
    </div>
  );
};

export default Volumes;
