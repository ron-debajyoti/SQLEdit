import styled from "styled-components/macro";

interface DivProps {
  flexDirection?: string;
  flexGrow?: number;
  width?: string;
}

export const Button = styled.button`
  background: "white";
  color: "palevioletred";
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Div = styled.div<DivProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => props.flexDirection};
  flex-grow: ${props => props.flexGrow};
  width: ${props => props.width};
  margin: 1.5em 1em
  padding: 1em
`;