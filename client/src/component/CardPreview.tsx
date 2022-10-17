import { FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { DetailAnime } from "types";
import { CardButtonType } from "../types";

import Button from "@mui/material/Button";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 20px lightgrey;
  width: 300px;
  cursor: pointer;
`;

const CardItem = styled.div`
  display: grid;
  gap: 15px;
`;

const ImageContainer = styled.div`
  /* display: block; */
`;

const StyledButton = styled(Button)`
  width: 100%;

  height: 50px;
`;

const StyledImage = styled.img`
  border-radius: 5px;
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  gap: 10px;
  font-size: 23px;
  font-weight: bold;
  height: 60px;
`;
const Title = styled.div`
  /* line-height: 31px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

// const RowItem: FC;

export const CardPreview: FC<{
  data: DetailAnime;
  buttonType: CardButtonType;
}> = ({ data, buttonType }) => {
  const { pictureUrl, animeName } = data;

  const dispatch = useDispatch();

  return (
    <CardContainer
      onClick={() => {
        dispatch({ type: "cardOpened", payload: data });
      }}
    >
      <CardItem>
        <ImageContainer>
          <StyledImage src={pictureUrl} alt="" />
        </ImageContainer>
      </CardItem>

      <Header>
        <Title>{animeName}</Title>
      </Header>
      {buttonType === "add" ? (
        <StyledButton
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "startedAddAnime", payload: data });
          }}
        >
          add
        </StyledButton>
      ) : null}
      {/* <Description>{description}</Description> */}
    </CardContainer>
  );
};
