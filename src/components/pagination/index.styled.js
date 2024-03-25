import styled from "styled-components";
import { Bottom } from "../../App.styled";

export const StyledPagination = styled(Bottom)`
  & {
    user-select: none;
    & label {
      font-weight: bold;
      cursor: pointer;
      margin: 0.5rem;
      &:hover {
        color: maroon;
      }
    }
  }
`;
