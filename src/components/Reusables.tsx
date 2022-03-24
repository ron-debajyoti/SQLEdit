import styled from 'styled-components/macro';

interface DivProps {
  flexDirection?: string;
  flexGrow?: number;
  width?: string;
}

interface ButtonProps {
  margin?: string;
  padding?: string;
}

export const Button = styled.button<ButtonProps>`
  background: 'white';
  color: 'palevioletred';
  font-size: 1em;
  margin: ${(props) => (props.margin ? props.margin : `1em`)};
  padding: ${(props) => (props.margin ? props.padding : ` 0.25em 1em`)};
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Div = styled.div<DivProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => props.flexDirection};
  flex-grow: ${(props) => props.flexGrow};
  width: ${(props) => props.width};
  margin: 2px 4px;
  padding: 2px;
`;

export const Section = styled.div`
  width: 100%;
  border: 0.5rem outset #282c34;
`;

export const H3 = styled.h3`
  margin: 3rem 2.5rem;
`;
