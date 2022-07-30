import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

import logo from "../assets/pikachu_64.png";

const StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: 50px 1fr;
`;

const Logo = styled.div`
  background: url(${logo});
  background-repeat: no-repeat;
  background-size: 46px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <TextField />
    </StyledHeader>
  );
};
