import styled from "styled-components";

export const Button = styled.button`
  border: 0;
  background-color: var(--theme-orange-light);
  color: white;
  font-weight: bold;
  width: 100%;
  margin-top: var(--theme-gutter-top);
  padding: 8px;
  height: 45px;
  font-size: 1rem;
  font-family: var(--theme-primary-font);
  cursor: pointer;
  border-radius: var(--theme-border-rounded);
  &:focus {
    outline: none;
    box-shadow: var(--theme-blue) 0px 0px 2px 2px;
  }
  &:hover {
    background-color: var(--theme-orange);
  }
`;