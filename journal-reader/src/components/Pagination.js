const Pagination = ({ offset, setOffset, limit, total }) => {
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
  return <>{buttons}</>;
};

export default Pagination;
