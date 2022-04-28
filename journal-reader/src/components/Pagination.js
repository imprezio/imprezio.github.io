const Pagination = ({ offset, setOffset, limit, total }) => {
  const prevButtonDisabled = !(offset > 0);
  const nextButtonDisabled = !(offset + limit < total && total > limit);
  const prevButton = (
    <button
      disabled={prevButtonDisabled}
      onClick={() => {
        setOffset(offset - limit);
      }}>
      Prev
    </button>
  );
  const nextButton = (
    <button
      disabled={nextButtonDisabled}
      onClick={() => {
        setOffset(offset + limit);
      }}>
      Next
    </button>
  );
  if (prevButtonDisabled && nextButtonDisabled) {
    return <></>;
  }
  return (
    <>
      <li>{prevButton}</li>
      <li>{nextButton}</li>
    </>
  );
};

export default Pagination;
