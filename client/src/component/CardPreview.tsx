import { FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { DetailAnime } from "types";
import { PreviewItemType } from "../types";
import Button from "@mui/material/Button";
import { ActionName } from "../business/reducer";
import { getInteractItem } from "../shared/getInteractItem";

const CardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 20px;
  outline: 1px solid #efefef;
  border-radius: 10px;
  /* box-shadow: 0px 1px 10px lightgray; */

  width: 300px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 1px 20px 5px lightgray;
  }
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

export const CardPreview: FC<{
  data: DetailAnime;
  previewItemType: PreviewItemType;
}> = ({ data, previewItemType }) => {
  const { pictureUrl, animeName } = data;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: ActionName.startedAddAnime, payload: data });
  };

  return (
    <CardContainer
      onClick={() => {
        dispatch({ type: ActionName.cardOpened, payload: data });
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
      {/* {getPreviewItem(previewItemType)} */}
      {getInteractItem({ previewItemType, handleClick, buttonText: "add" })}

      {/* <Description>{description}</Description> */}
    </CardContainer>
  );
};
