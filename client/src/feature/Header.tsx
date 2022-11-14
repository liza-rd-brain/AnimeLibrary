import styled from "styled-components";
import logo from "../assets/pikachu_64.png";

const LOGO_TEXT = "Anime Library";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  margin-bottom: 10px;
  gap: 5px;
`;

const Logo = styled.div`
  background: url(${logo});
  background-repeat: no-repeat;
  background-size: 40px;
  transform: scale(-1, 1);
  height: 40px;
  width: 40px;
`;

const LogoText = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-transform: uppercase;
  padding-top: 10px;
  color: #576166;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <LogoText>{LOGO_TEXT}</LogoText>
    </StyledHeader>
  );
};
