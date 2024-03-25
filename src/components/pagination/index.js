import React from "react";
import { StyledPagination } from "./index.styled";

function Pagination({ currentPage, prevPage, nextPage, totalPage }) {
  return (
    <StyledPagination>
      {currentPage !== 0 && <label onClick={prevPage}>{"<"}</label>}
      page <b>{currentPage + 1}</b> from <b>{totalPage}</b>{" "}
      {currentPage + 1 < totalPage && <label onClick={nextPage}>{">"}</label>}
    </StyledPagination>
  );
}

export default Pagination;
