import React from "react";
import styled from "styled-components";
import LinearProgress from "@mui/material/LinearProgress";

import logo from "../assets/pikachu_preloader.gif";

const StyledImage = styled.img`
  transform: scale(-1, 1);
`;

const StyledProgress = styled(LinearProgress)`
  transform: scale(-1, 1);
`;
export const Preloader = () => {
  return (
    <div>
      <StyledImage src={logo} alt="" />
      <StyledProgress />
    </div>
  );
};
