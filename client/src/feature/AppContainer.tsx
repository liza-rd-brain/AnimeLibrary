import React from "react";
import styled from "styled-components";
import { useScrapeData } from "../effect";
import { SearchItem } from "./SearchItem";

const StyledContainer = styled.div`
  margin: 20px auto 0;
  min-width: 320px;
  max-width: 1200px;
  width: 100%;
  border: 1px solid red;
  min-height: 600px;
`;

export const AppContainer = () => {
  useScrapeData();

  return (
    <StyledContainer>
      <SearchItem />
    </StyledContainer>
  );
};
