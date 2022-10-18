import React, { FC } from "react";
import styled from "styled-components";

import logo from "../assets/pikachu_64.png";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;

  background: #ece3e4;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
`;

const Logo = styled.div`
  background: url(${logo});
  background-repeat: no-repeat;
  background-size: 40px;
  transform: scale(-1, 1);
  height: 40px;
  width: 40px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
};
