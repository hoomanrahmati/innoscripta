import styled from "styled-components";

export const Controller = styled.div`
  & {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    & label {
      margin-bottom: 0.5rem;
      font-weight: 400;
    }
    & input,
    & select {
      outline: none;
      border: 2px solid rgba(100, 100, 100, 0.5);
      padding: 0.5rem;
      border-radius: 0.2rem;
      font-size: 1rem;
      color: #888;
    }
  }
`;

export const SubmitButton = styled.button`
  & {
    padding: 0.5rem 1rem;
    background: maroon;
    color: white;
    font-weight: 500;
    border-radius: 0.25rem;
    outline: none;
    box-shadow: none;
    border: none;
    cursor: pointer;
  }
`;

export const ResetButton = styled(SubmitButton)`
  & {
    padding: 0.5rem 1rem;
    background: white;
    color: maroon;
    outline: 2px solid rgba(128, 0, 0, 0.25);
    margin-left: 1rem;
  }
`;

export const ErrorWrapper = styled.p`
  & {
    color: maroon;
  }
`;

export const Col2 = styled.div`
  & {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 1rem;
    @media (max-width: 400px) {
      display: block;
    }
  }
`;
