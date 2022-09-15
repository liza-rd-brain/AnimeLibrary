import React, { FC } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";

import { CardButtonType, DetailAnime } from "../types";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0px 1px 20px lightgrey; */
  background: white;
  color: black;
  max-width: 800px;
  /* grid-template-columns: 300px 400px; */
`;

const CardItem = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 280px 400px;
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
  height: 56px;
`;

// const StyledImage = styled.div<{ pictureUrl?: string }>`
//   height: 100%;
//   background-position: center;
//   background-size: 250px;
//   border-radius: 5px;
//   background-image: ${(props) => {
//     return `url(${props.pictureUrl})`;
//   }};
// `;

const StyledImage = styled.img`
  border-radius: 5px;
  width: 280px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  font-weight: bold;
`;

const StyledRow = styled.div`
  width: 100%;
  /* display: grid;
  gap: 15px; */
  /* grid-template-columns: 150px 150px; */
`;

const StyledTitle = styled.span`
  font-weight: bold;
`;

const Description = styled.span`
  /* height: 60px;
  width: 500px;
  text-overflow: ellipsis; */
  /* width: 300px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* -webkit-line-clamp: 3; */
  overflow: hidden;
`;

// const RowItem: FC;

export const Card: FC<{ data: DetailAnime; buttonType: CardButtonType }> = ({
  data,
  buttonType,
}) => {
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

  const buttonText = buttonType === "add" ? "add" : "delete";

  // const actionType = buttonType === "add" ? "startedAddAnime" : "startedDeleteAnime";

  const handleButtonClick = () => {
    if (buttonType === "add") {
      dispatch({ type: "startedAddAnime", payload: data });
    } else if (buttonType === "delete") {
      const animeName = data.animeName;
      dispatch({ type: "startedDeleteAnime", payload: animeName });
    }
  };

  return (
    <CardContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <StyledHeader>{animeName}</StyledHeader>
      <CardItem>
        <ImageContainer>
          <StyledImage src={pictureUrl} alt="" />
          <StyledButton variant="outlined" onClick={handleButtonClick}>
            {buttonText}
          </StyledButton>
        </ImageContainer>

        <Table>{getDetailTable()}</Table>
      </CardItem>
      <Description>{description}</Description>
    </CardContainer>
  );
};
