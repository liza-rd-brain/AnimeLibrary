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
  max-width: 800px;
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

const ImageContainer = styled.div``;
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
  width: 100%;
`;

const StyledTitle = styled.span`
  font-weight: bold;
`;

const Description = styled.span`
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
          <span>{value}</span>
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

        <Table>{getDetailTable()}</Table>
      </CardItem>
      <Description>{description}</Description>
    </CardContainer>
  );
};
