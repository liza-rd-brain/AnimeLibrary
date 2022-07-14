import React from "react";
import styled from "styled-components";
import { Header } from "./Header";

const StyledContainer = styled.div`
  margin: 0 auto;
  min-width: 320px;
  max-width: 1200px;
  width: 100%;
  border: 1px solid red;
  min-height: 600px;
`;

export const AppContainer = () => {
  return (
    <StyledContainer>
      <Header />
    </StyledContainer>
  );
};
