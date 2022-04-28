import React, { useEffect, useState } from "react";
import Volumes from "./Volumes";
import api from "../api";

const JournalPage = ({ journalID }) => {
  const { data, loading, error } = api.GetJournal(journalID);
  const [content, setContent] = useState(<></>);
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    //
  }, [content, activeItem]);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  const { Title } = data.paginatedReadJournals.edges[0].node;
  const updateContent = (item) => {
    setActiveItem(item);
    const {
      Title,
      CoverURL,
      ImageURL,
      Content,
      DOI,
      Number,
      Year,
      ArticleType,
      FileURL,
      Authors,
    } = item;
    const cover = CoverURL ? <img src={CoverURL} alt={Title} /> : null;
    const image = ImageURL ? <img src={ImageURL} alt={Title} /> : null;
    const htmlContent = Content ? (
      <div dangerouslySetInnerHTML={{ __html: Content }} />
    ) : null;
    const doi = DOI ? <p>{DOI}</p> : null;
    const number = Number ? <p>Number: {Number}</p> : null;
    const year = Year ? <p>Year: {Year}</p> : null;
    const type = ArticleType ? <p>Type: {ArticleType}</p> : null;
    const file = FileURL ? (
      <p>
        File:{" "}
        <a href={FileURL} target="_blank" rel="noreferrer">
          {FileURL}
        </a>
      </p>
    ) : null;
    const authors = Authors?.length ? (
      <div>
        Authors:
        <ul>
          {Authors.map(({ ID, FirstName, Surname }) => {
            return (
              <li key={ID}>
                {Surname}, {FirstName}
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;
    const images =
      cover || image ? (
        <div className="journal-reader__content_images">
          {cover} {image}
        </div>
      ) : null;
    setContent(
      <>
        <h1 className="journal-reader__content_title">{Title}</h1>
        {images}
        {doi}
        {number}
        {year}
        {file}
        {type}
        {authors}
        {htmlContent}
      </>
    );
  };
  return (
    <>
      <h1 className="journal-reader__header">{Title}</h1>
      <div className="journal-reader__container">
        <div className="journal-reader__navigation">
          <Volumes
            journalID={journalID}
            updateContent={updateContent}
            activeItem={activeItem}
          />
        </div>
        <div className="journal-reader__content">{content}</div>
      </div>
    </>
  );
};

export default JournalPage;
