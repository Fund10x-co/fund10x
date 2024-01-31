import React, { useEffect, useState } from "react";

type PaginationBlockProps = {
  handlePrev: () => void;
  handleNext: () => void;
  handleFetchByPage: (value: number) => void;
  page: number;
  totalPages: number;
  nextPage: number | null;
};
const PaginationBlock = ({
  handlePrev,
  handleNext,
  page,
  totalPages,
  handleFetchByPage,
  nextPage,
}: PaginationBlockProps) => {
  const [displablePrev, setdisplablePrev] = useState(false);
  const [displableNext, setdisplableNext] = useState(false);
  // const [currentPage, setcurrentPage] = useState(1);
  const [totalDisplayPages, setTotalDisplayPages] = useState<any[]>([]);

  const previous = () => {
    if (displablePrev) {
      return;
    }

    handlePrev();
  };

  const next = () => {
    if (displableNext) {
      return;
    }

    handleNext();
  };

  const fetchByPage = (newPage: number) => {
    if (page === newPage) {
      return;
    }
    // console.log(newPage);

    handleFetchByPage(newPage);
  };

  useEffect(() => {
    if (page === totalPages) {
      setdisplableNext(true);
    } else {
      setdisplableNext(false);
    }
    if (page === 1) {
      setdisplablePrev(true);
    } else {
      setdisplablePrev(false);
    }

    let newPages = [];

    for (let index = 0; index < totalPages; index++) {
      newPages.push(index);
    }

    setTotalDisplayPages(newPages);
    // setcurrentPage(page);
  }, [page, totalPages]);

  return (
    <div className="d-flex justify-content-between align-items-center ">
      <p className="mb-0">
        Page {page} of {totalPages}{" "}
      </p>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item  ${displablePrev ? "disabled" : ""}`}
            onClick={() => previous()}
          >
            <a
              className="page-link"
              href="true"
              onClick={(e) => e.preventDefault()}
            >
              Previous
            </a>
          </li>
          {page < 8 ? (
            totalDisplayPages &&
            totalDisplayPages?.slice(0, 8)?.map((newPage, index) => (
              <li
                key={index}
                className={`page-item smallPagi ${
                  page === index + 1 ? "active" : ""
                }   `}
                onClick={() => fetchByPage(index + 1)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  {index + 1}
                  {/* {newPage} */}
                </a>
              </li>
            ))
          ) : (
            <>
              <li
                className={`page-item smallPagi  `}
                onClick={() => fetchByPage(1)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  1
                </a>
              </li>
              <li
                className={`page-item smallPagi  `}
                onClick={() => fetchByPage(2)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  2
                </a>
              </li>
              <li
                className={`page-item smallPagi  `}
                onClick={() => fetchByPage(3)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  3
                </a>
              </li>
              <li
                className={`page-item smallPagi  `}
                onClick={() => fetchByPage(page - 1)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  --
                </a>
              </li>
            </>
          )}

          {page >= 8 &&
            totalDisplayPages &&
            totalDisplayPages?.slice(0, 1)?.map((newPage, index) => (
              <li
                key={index}
                className={`page-item smallPagi active  `}
                onClick={() => fetchByPage(page)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  {page}
                  {/* {newPage} */}
                </a>
              </li>
            ))}
          {page >= 8 &&
            page < totalDisplayPages?.length &&
            totalDisplayPages &&
            totalDisplayPages?.slice(0, 1)?.map((newPage, index) => (
              <li
                key={index}
                className={`page-item smallPagi  `}
                onClick={() => fetchByPage(page + 1)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  {page + 1}
                  {/* {newPage} */}
                </a>
              </li>
            ))}

          <li
            className={`page-item  ${displableNext ? "disabled" : ""}`}
            onClick={() => next()}
          >
            <a
              className="page-link"
              href="true"
              onClick={(e) => e.preventDefault()}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBlock;
