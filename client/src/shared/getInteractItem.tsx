import styled from "styled-components";
import Button from "@mui/material/Button";
import { PreviewItemType } from "../types";

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
`;

const StyledMark = styled.div`
  width: 100%;
  height: 50px;
`;

export const getInteractItem = ({
  previewItemType,
  handleClick,
  buttonText,
}: {
  previewItemType: PreviewItemType;
  handleClick: () => void;
  buttonText: string;
}) => {
  switch (previewItemType) {
    case "button": {
      return (
        <StyledButton
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {buttonText}
        </StyledButton>
      );
    }
    case "markAdded": {
      return <StyledMark>{"add"}</StyledMark>;
    }
    default: {
      return null;
    }
  }
};
