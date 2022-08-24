import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import logo from "../assets/pikachu_64.png";

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

export const SearchItem = () => {
  // const state = useSelector((state: State) => state);
  const dispatch = useDispatch();

  // console.log(state);

  const textInput = useRef<HTMLInputElement>(null);

  // async function makeRequest() {
  //   const config = {
  //     method: "get",
  //     url: "http://localhost:3000/findName",
  //   };

  //   const res = await axios(config).then((res: ResponseType) => {
  //     // записать данные/ куда?
  //     console.log(res.data);
  //     return res;
  //   });
  // }

  const handleAddClick = () => {
    if (textInput.current?.value) {
      dispatch({
        type: "startedAnimeScraping",
        payload: textInput.current?.value,
      });
    }
  };

  return (
    <StyledHeader>
      <Logo />
      <div>
        <StyledTextInput inputRef={textInput} />
      </div>
      <StyledButton
        variant="outlined"
        onClick={() => {
          handleAddClick();
        }}
      >
        add
      </StyledButton>
    </StyledHeader>
  );
};
