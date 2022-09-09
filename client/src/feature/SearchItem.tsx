import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import logo from "../assets/pikachu_default.png";
import logoAnimated from "../assets/pikachu_preloader.gif";

import { State } from "../types";

const StyledSearchItem = styled.div`
  /* width: 100%; */
  /* height: 100px; */
  display: grid;
  gap: 10px;
  grid-template-columns: /* 100px */ 300px 60px;
`;

const StyledSearchItemInitial = styled.div`
  /* width: 100%; */
  /* height: 80px; */
  display: grid;
  gap: 10px;
  grid-template-rows: 150px 100px;
`;

const StyledTextInput = styled(TextField)`
  width: 300px;
`;

const StyledButton = styled(Button)`
  width: 56px;
  height: 56px;
`;

const Logo = styled.div<{ isAnimated?: boolean }>`
  /* background: url(${logoAnimated}); */
  background: ${({ isAnimated }) => {
    return isAnimated ? `url(${logoAnimated})` : `url(${logo})`;
  }};
  background-repeat: no-repeat;
  background-size: 300px;
  background-position: center;
  transform: scale(-1, 1);
`;

export const SearchItem: FC<{
  refState?: React.MutableRefObject<{
    value: string | null;
  }>;
}> = ({ refState }) => {
  // const state = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const [phase] = useSelector((state: State) => [state.phase]);

  const textInput = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    if (textInput.current?.value) {
      if (refState) {
        refState.current.value = textInput.current?.value;
      }

      dispatch({
        type: "startedAnimeScraping",
        payload: textInput.current?.value,
      });
    }
  };

  const getSearchItem = () => {
    switch (phase) {
      case "waiting": {
        return <InitialSearchItem />;
      }
      case "dataScraping": {
        return <InitialSearchItem isAnimated={true} />;
      }
      case "idle": {
        return <DefaultSearchItem />;
      }
      default: {
        return <></>;
      }
    }
  };

  const InitialSearchItem: FC<{ isAnimated?: boolean }> = ({ isAnimated }) => {
    return (
      <StyledSearchItemInitial>
        <Logo isAnimated={isAnimated} />
        <div>
          <StyledTextInput
            inputRef={textInput}
            defaultValue={refState?.current.value}
          />
          <StyledButton
            variant="outlined"
            onClick={() => {
              handleAddClick();
            }}
          >
            add
          </StyledButton>
        </div>
      </StyledSearchItemInitial>
    );
  };

  const DefaultSearchItem = () => {
    return (
      <StyledSearchItem>
        {/* <Logo /> */}
        <div>
          <StyledTextInput
            inputRef={textInput}
            defaultValue={refState?.current.value}
          />
        </div>
        <StyledButton
          variant="outlined"
          onClick={() => {
            handleAddClick();
          }}
        >
          add
        </StyledButton>
      </StyledSearchItem>
    );
  };

  return getSearchItem();
};
