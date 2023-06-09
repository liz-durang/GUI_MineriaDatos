import styled from "styled-components";

export const NavSide = styled.nav`
    width: 22%;
    height: 80vh;
    border-right: solid #e9ecef;
    position: sticky;
    top: 6vh;
    background-color: white;

    @media (max-width: 930px) {
        display: ${({click}) => (click ? "none" : "block")};
        position: fixed;
        width: 100%;
        z-index: 1;
        height: 100%;
          
    }
`

export const HambugerButton = styled.div`
    display: none;

    @media (max-width: 930px) {
        display: ${({click}) => (click ? "none" : "block")};
        position: fixed;
        top: 2vh;
        right: 3vw;
        z-index: 6;
    }
    

`

