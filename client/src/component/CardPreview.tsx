import React, { FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";

import { CardButtonType, DetailAnime } from "../types";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 20px lightgrey;
  width: 300px;
  cursor: pointer;

  /* &:hover {
    box-shadow: 0px 1px 20px gray;
  } */

  /* grid-template-columns: 300px 400px; */
`;

const CardItem = styled.div`
  display: grid;
  gap: 15px;
  /* grid-template-columns: 280px 400px; */
`;

const Table = styled.div`
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

const StyledRow = styled.div`
  width: 100%;
`;

const StyledTitle = styled.span`
  font-weight: bold;
`;

const Description = styled.span`
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

// const RowItem: FC;

export const CardPreview: FC<{
  data: DetailAnime;
  buttonType: CardButtonType;
}> = ({ data, buttonType }) => {
  const { pictureUrl, animeName, description, ...detailTable } = data;

  const dispatch = useDispatch();

  const detailList = Object.entries(detailTable);

  const getDetailTable = () => {
    return detailList.map((item, index) => {
      const [key, value] = item;
      return (
        <StyledRow key={index}>
          <StyledTitle>{`${key}: `}</StyledTitle>
          <span>{value}</span>
        </StyledRow>
      );
    });
  };

  return (
    <CardContainer
      onClick={() => {
        dispatch({ type: "cardOpened", payload: data });
      }}
    >
      <CardItem>
        <ImageContainer>
          {/* <StyledImage pictureUrl={pictureUrl} /> */}
          <StyledImage src={pictureUrl} alt="" />
        </ImageContainer>

        {/* <Table>{getDetailTable()}</Table> */}
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
        ></StyledButton>
      ) : null}
      {/* <Description>{description}</Description> */}
    </CardContainer>
  );
};
