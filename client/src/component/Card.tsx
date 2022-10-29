import { FC } from "react";
import styled from "styled-components";

import { DetailAnime } from "types";
import Button from "@mui/material/Button";
import { CardButtonType } from "../types";
import { ActionName, useAppDispatch } from "../business/reducer";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  background: white;
  color: black;
  min-width: 800px;
  width: 800px;
  height: 550px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CardItem = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 35% 64%;
`;

const Table = styled.div`
  display: grid;
  height: 200px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; ;
`;

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
  gap: 10px;
`;

const StyledRowItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const StyledTitle = styled.span`
  font-weight: bold;
`;

const DescriptionWrapper = styled.div`
  height: 200px;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    position: fixed;
    border-radius: 4px;
    position: fixed;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background: rgb(186, 183, 183);
    border: 3px solid transparent;
    background-clip: content-box; /* THIS IS IMPORTANT */
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
  padding-right: 5px;
`;

const DetailAnimeText = {
  status: "Status",
  scores: "Scores",
  studio: "Studio",
  genre: "Genre",
  country: "Country",
  episode: "Episode",
  duration: "Duration",
  dateAired: "Date aired",
  animeName: "Anime name",
  otherNames: "Other names",
  dateRelease: "Date release",
};

export type DetailAnimeTextType = keyof typeof DetailAnimeText;

export const Card: FC<{ data: DetailAnime; buttonType: CardButtonType }> = ({
  data,
  buttonType,
}) => {
  const { pictureUrl, animeName, description, ...detailTable } = data;
  const dispatch = useAppDispatch();

  const detailList = Object.entries(detailTable);

  const getListValue = (list: Array<string>) => {
    return list.map((item, index) => {
      const isNotLastElem = index !== list.length - 1;

      if (isNotLastElem) {
        return <span>{`${item},`}</span>;
      } else {
        return <span>{`${item}`}</span>;
      }
    });
  };

  const getKeyValue = (key: string) => {
    return (
      <StyledTitle>{`${
        DetailAnimeText[key as DetailAnimeTextType]
      }: `}</StyledTitle>
    );
  };

  const getDetailTable = () => {
    return detailList.map((item, index) => {
      const [key, value] = item;
      const isValueArray = Array.isArray(value);

      return (
        <StyledRow key={index}>
          {getKeyValue(key)}
          {isValueArray ? (
            <StyledRowItem> {getListValue(value)}</StyledRowItem>
          ) : (
            <StyledRowItem>
              <div>{value}</div>
            </StyledRowItem>
          )}
        </StyledRow>
      );
    });
  };

  const buttonText = buttonType === "add" ? "add" : "delete";

  //TODO: исправить assertion
  const handleButtonClick = () => {
    if (buttonType === "add") {
      dispatch({ type: ActionName.startedAddAnime, payload: data });
    } else if (buttonType === "delete") {
      const animeName = data.animeName as string;
      dispatch({ type: ActionName.startedDeleteAnime, payload: animeName });
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
