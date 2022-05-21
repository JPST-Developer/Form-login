import { Link } from "react-router-dom";
import styled from "styled-components";


export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: var(--theme-grey);
    font-size: 18px;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }

`