/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

export const GiftDescriptionContainer = styled.div`
   display: flex;
   align-items: center;
   @media (max-width: 1023px) {
       flex-direction: column;
    }   
`;

export const GiftDescriptionText = styled.div`
    text-align: justify; 
    margin-left: 20px; 
    flex: 75%;
    @media (max-width: 1023px) {
        margin-left: 0;
        margin-top: 20px;
    }
`;

export const Ahref = styled.a`
    text-decoration: underline;
    color: blue;
`;