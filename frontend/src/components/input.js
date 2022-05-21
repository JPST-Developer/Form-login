import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  color: var(--theme-grey);
  background-color: var(--theme-blue-light);
  border: 0;
  margin-top: var(--theme-gutter-top);
  padding: 15px 10px 15px 42px;
  box-sizing: border-box;
  border-radius: var(--theme-border-rounded);
  &:focus {
    outline: none;
    box-shadow: var(--theme-blue) 0px 0px 2px 2px;
  }
  &:focus:invalid {
    outline: none;
    box-shadow: var(--theme-error) 0px 0px 2px 2px;
  }
`;