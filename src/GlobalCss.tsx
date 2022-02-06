/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

export const CenterInScreen = styled.div`
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BackgroundDrop = styled.div`background-color: #000;
    background: rgba(0,0,0,.5);
    height: 100%;
    width: 100%;
    left: 0;
    position: fixed;
    top: 0;
    z-index: 10;
    color: white;`;

export const Middle = styled.div`
    background-color: #fff;
    margin: 27px auto;
    padding: 0 0 10px;
    position: relative;
    border-radius: 5px 5px 5px 5px;
    width: 980px;
    @media (min-width: 1441px) {
        width: 1200px;
    }
    @media (max-width: 1023px) {
        width: 90%;
        margin: 27px 5% 0;
    }    
`

export const ContentWrap = styled.div`
    margin: 0 20px;
    position: relative;
    overflow: hidden;
`;