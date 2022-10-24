import { FC } from "react";
import styled from "styled-components";

import { DetailAnime } from "types";
import Button from "@mui/material/Button";
import { CardButtonType } from "../types";
import { useAppDispatch } from "../business/reducer";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  background: white;
  color: black;
  width: 800px;
  height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CardItem = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 280px 500px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* column-count: 2; */
  /* gap: 10px; */
  height: 200px;
`;

const ImageContainer = styled.div``;
const TextWrapper = styled.div``;
const StyledButton = styled(Button)`
  width: 100%;
  height: 56px;
`;

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
  display: flex;

  width: 200px;
`;

const StyledTitle = styled.span`
  font-weight: bold;
`;

const DescriptionWrapper = styled.div`
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    position: fixed;
    /* background-color: #d6d6d6; */
    border-radius: 4px;
    position: fixed;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #77abdf;
    border-radius: 4px;
  }
`;

const Description = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Card: FC<{ data: DetailAnime; buttonType: CardButtonType }> = ({
  data,
  buttonType,
}) => {
  const { pictureUrl, animeName, description, ...detailTable } = data;
  const dispatch = useAppDispatch();

  const detailList = Object.entries(detailTable);

  const getDetailTable = () => {
    return detailList.map((item, index) => {
      const [key, value] = item;
      return (
        <StyledRow key={index}>
          <StyledTitle>{`${key}: `}</StyledTitle>
          <div>{value}</div>
        </StyledRow>
      );
    });
  };

  const buttonText = buttonType === "add" ? "add" : "delete";

  //TODO: исправить assertion
  const handleButtonClick = () => {
    if (buttonType === "add") {
      dispatch({ type: "startedAddAnime", payload: data });
    } else if (buttonType === "delete") {
      const animeName = data.animeName as string;
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
        <TextWrapper>
          <Table>{getDetailTable()}</Table>
          <DescriptionWrapper>
            <Description>{description}</Description>
          </DescriptionWrapper>
        </TextWrapper>
      </CardItem>
    </CardContainer>
  );
};
