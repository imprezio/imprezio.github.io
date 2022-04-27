const Pagination = ({ offset, setOffset, limit, total }) => {
  const prevButton = (
    <button
      disabled={!(offset > 0)}
      onClick={() => {
        setOffset(offset - limit);
      }}>
      Prev
    </button>
  );
  const nextButton = (
    <button
      disabled={!(offset + limit < total && total > limit)}
      onClick={() => {
        setOffset(offset + limit);
      }}>
      Next
    </button>
  );
  return (
    <>
      <li>{prevButton}</li>
      <li>{nextButton}</li>
    </>
  );
};

export default Pagination;
