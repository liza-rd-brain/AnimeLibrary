import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import logo from "../assets/pikachu_64.png";

const axios = require("axios");

const StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  display: grid;
  gap: 10px;
  grid-template-columns: 50px 300px 60px;
`;

const StyledTextInput = styled(TextField)`
  width: 300px;
`;

const StyledButton = styled(Button)`
  width: 56px;
  height: 56px;
`;

const Logo = styled.div`
  background: url(${logo});
  background-repeat: no-repeat;
  background-size: 46px;
`;

export const Header = () => {
  async function makeRequest() {
    const config = {
      method: "get",
      url: "http://localhost:3000/findName",
    };

    let res = await axios(config);

    console.log(res.data);
  }

  const findElem = () => {
    makeRequest();
  };

  return (
    <StyledHeader>
      <Logo />
      <div>
        <StyledTextInput />
      </div>
      <StyledButton variant="outlined" onClick={findElem}>
        add
      </StyledButton>
    </StyledHeader>
  );
};
