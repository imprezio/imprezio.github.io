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
  const updateContent = ({ Title, CoverURL, ImageURL, Content }) => {
    const cover = CoverURL ? (
      <img src={CoverURL} style={{ width: "10rem", height: "auto" }} />
    ) : null;
    const image = ImageURL ? (
      <img src={ImageURL} style={{ width: "10rem", height: "auto" }} />
    ) : null;
    const htmlContent = Content ? (
      <div dangerouslySetInnerHTML={{ __html: Content }} />
    ) : null;
    setContent(
      <>
        <h1>{Title}</h1>
        {cover}
        {image}
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
