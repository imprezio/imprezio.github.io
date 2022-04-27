import React, { useEffect, useState } from "react";
import Volumes from "./Volumes";
import api from "../api";

const JournalPage = ({ journalID }) => {
  const { data, loading, error } = api.GetJournal(journalID);
  const [content, setContent] = useState(<></>);
  useEffect(() => {
    //
  }, [content]);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  const { Title } = data.paginatedReadJournals.edges[0].node;
  const updateContent = ({
    Title,
    CoverURL,
    ImageURL,
    Content,
    DOI,
    Number,
    Year,
    FileURL,
  }) => {
    const cover = CoverURL ? (
      <img src={CoverURL} style={{ width: "10rem", height: "auto" }} />
    ) : null;
    const image = ImageURL ? (
      <img src={ImageURL} style={{ width: "10rem", height: "auto" }} />
    ) : null;
    const htmlContent = Content ? (
      <div dangerouslySetInnerHTML={{ __html: Content }} />
    ) : null;
    const doi = DOI ? <p>{DOI}</p> : null;
    const number = Number ? <p>Number: {Number}</p> : null;
    const year = Year ? <p>Year: {Year}</p> : null;
    const file = FileURL ? (
      <p>
        File:{" "}
        <a href={FileURL} target="_blank">
          {FileURL}
        </a>
      </p>
    ) : null;
    setContent(
      <>
        <h1>{Title}</h1>
        {cover}
        {image}
        {doi}
        {number}
        {year}
        {file}
        {htmlContent}
      </>
    );
  };
  return (
    <>
      <h1>{Title}</h1>
      <Volumes journalID={journalID} updateContent={updateContent} />
      {content}
    </>
  );
};

export default JournalPage;
