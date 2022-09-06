import React, { FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";

import { DetailAnime } from "../types";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 20px lightgrey;
  width: 300px;
  cursor: pointer;

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
  width: 56px;
  height: 40px;
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
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
`;
const Title = styled.div`
  line-height: 31px;
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
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

// const RowItem: FC;

export const CardPreview: FC<{ data: DetailAnime }> = ({ data }) => {
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
      //   const [key, value] = item;
      //   return (
      //     <>
      //     <div>key<div/>
      //     <div>value<div/>
      //     </>)
      //   )
      // });
    });
  };

  return (
    <CardContainer
      onClick={() => {
        console.log("click card");
        dispatch({ type: "cardOpened", payload: data });
      }}
    >
      <Header>
        <Title>{animeName}</Title>
        <StyledButton
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            console.log("add");
          }}
        >
          add
        </StyledButton>
      </Header>
      <CardItem>
        <ImageContainer>
          {/* <StyledImage pictureUrl={pictureUrl} /> */}
          <StyledImage src={pictureUrl} alt="" />
        </ImageContainer>

        {/* <Table>{getDetailTable()}</Table> */}
      </CardItem>
      <Description>{description}</Description>
    </CardContainer>
  );
};
