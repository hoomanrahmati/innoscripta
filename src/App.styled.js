import styled from "styled-components";

export const Container = styled.div`
  & {
    padding: 1rem 2rem;
    @media (max-width: 800px) {
      padding: 0.5rem 1rem;
    }
    @media (max-width: 800px) {
      padding: 0.5rem;
    }
  }
`;

export const CardWrapper = styled.div`
  & {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0 1rem;
    /* margin: 1rem; */
    @media (max-width: 1260px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const Card = styled.div`
  & {
    margin-bottom: 1rem;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.25rem;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    padding: 1rem;
    padding-bottom: 3rem;
    position: relative;
  }
`;

export const Image = styled.img`
  & {
    margin-bottom: 1rem;
    margin-left: -1rem;
    width: calc(100% + 2rem);
  }
`;

export const DateWrapper = styled.p`
  & {
    margin: 0 0 0.5rem;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const Title = styled.h2`
  & {
    margin: 0.5rem 0;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.334;
    letter-spacing: 0;
  }
`;

export const Text = styled.div`
  & {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    color: rgba(0, 0, 0, 0.6);
    letter-spacing: 0;
  }
`;

export const Bottom = styled.p`
  & {
    font-size: 0.875rem;
    position: absolute;
    bottom: 1rem;
    width: 85%;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }
`;
